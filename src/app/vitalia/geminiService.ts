import jsPDF from "jspdf";
import { BodyMetrics, MedicalAnalysisResponse, Language } from "./types";
import { GoogleGenerativeAI, Modality } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI({ apiKey });

const baseSystemInstruction = `You are Vitalia, an AI medical assistant. Always respond with JSON only and never include Markdown. JSON schema:
{
  "urgencyLevel": number 1-5,
  "clinicalSummary": string,
  "differentialDiagnosis": [{"hypothesis": string, "probability": number 0-1}],
  "redFlags": string[],
  "actionPlan": string[],
  "prePrescription": [{"name": string, "dosage": string, "usage": string, "warnings": string}],
  "drugInteractions": [{"drugs": string[], "interaction": string}],
  "geolocatedHospitals": [{"name": string, "address": string, "distanceMinutes": number, "mapUrl": string}],
  "interviewQuestions": string[]
}

Rules:
- Model: gemini-2.5-flash.
- If critical data is missing, populate interviewQuestions with targeted questions and keep other fields conservative.
- Include geolocation hints using Google Maps search queries when possible.
- Keep urgencyLevel high (5) only for life-threatening red flags.
- Keep responses concise, clinical, and patient friendly.`;

const getTextModel = () =>
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: baseSystemInstruction,
  });

const safeParse = (raw: string): MedicalAnalysisResponse => {
  try {
    const parsed = JSON.parse(raw) as MedicalAnalysisResponse;
    return parsed;
  } catch (error) {
    console.warn("Failed to parse JSON response", error);
    return {
      urgencyLevel: 1,
      clinicalSummary: "Unable to parse response.",
      differentialDiagnosis: [],
      redFlags: [],
      actionPlan: ["Please retry."],
      prePrescription: [],
      drugInteractions: [],
      geolocatedHospitals: [],
      interviewQuestions: ["Could you repeat your concern?"]
    };
  }
};

const responseToText = async (result: any): Promise<string> => {
  if (typeof result?.response?.text === "function") {
    return result.response.text();
  }
  if (typeof result?.text === "function") {
    return result.text();
  }
  if (typeof result?.text === "string") {
    return result.text;
  }
  return (
    result?.response?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part.text)
      .join(" ") ?? ""
  );
};

export const geminiService = {
  async analyzeClinicalData({
    text,
    files = [],
    locale = "en" as Language,
    bodyMetrics,
  }: {
    text: string;
    files?: { data: string; mimeType: string }[];
    locale?: Language;
    bodyMetrics?: BodyMetrics;
  }): Promise<MedicalAnalysisResponse> {
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY for Vitalia.");
    }
    const model = getTextModel();
    const parts: any[] = [
      { text: `Language: ${locale}. User input: ${text}` },
    ];

    files.forEach((file) => {
      parts.push({
        inlineData: {
          data: file.data,
          mimeType: file.mimeType,
        },
      });
    });

    if (bodyMetrics) {
      parts.push({
        text: `Body metrics: weight ${bodyMetrics.weightKg}kg, height ${bodyMetrics.heightCm}cm, age ${bodyMetrics.age}, activity ${bodyMetrics.activityLevel ?? ""}. Photo provided: ${bodyMetrics.photoDataUrl ? "yes" : "no"}.`,
      });
      if (bodyMetrics.photoDataUrl) {
        parts.push({
          inlineData: {
            data: bodyMetrics.photoDataUrl.replace(/^data:[^;]+;base64,/, ""),
            mimeType: "image/jpeg",
          },
        });
      }
    }

    const response = await model.generateContent({
      contents: [{ role: "user", parts }],
      responseMimeType: "application/json",
    });

    const raw = await responseToText(response);
    return safeParse(raw);
  },

  async analyzeMedicationImage(imageBase64: string, mimeType: string) {
    return this.analyzeClinicalData({
      text: "Extract medication details (name, dosage, usage, warnings) and focus on interactions.",
      files: [{ data: imageBase64, mimeType }],
    });
  },

  async analyzeVoice(audioBase64: string, mimeType: string) {
    return this.analyzeClinicalData({
      text: "Analyze respiratory audio for cough type, breathing pattern, and vocal stress biomarkers.",
      files: [{ data: audioBase64, mimeType }],
    });
  },

  async analyzeVision(imageBase64: string, mimeType: string) {
    return this.analyzeClinicalData({
      text: "Vision analysis: skin lesion or radiology photo. Provide severity score 1-5 and dermatology differentials.",
      files: [{ data: imageBase64, mimeType }],
    });
  },

  async analyzeBodyMetrics(body: BodyMetrics) {
    return this.analyzeClinicalData({
      text: "Body composition and nutrition plan. Calculate BMI, body fat estimation, TDEE and provide meal plan.",
      bodyMetrics: body,
    });
  },

  async generateAudioSummary(summary: string): Promise<Blob | null> {
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY for TTS.");
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-tts",
    });

    const response: any = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: summary }] }],
      responseModalities: [Modality.AUDIO],
      responseMimeType: "audio/wav",
    });

    const audioPart = response?.response?.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData,
    );
    if (!audioPart?.inlineData?.data) return null;
    const audioBinary = Uint8Array.from(atob(audioPart.inlineData.data), (c) =>
      c.charCodeAt(0),
    );
    return new Blob([audioBinary.buffer], { type: "audio/wav" });
  },

  generatePdfReport(
    report: MedicalAnalysisResponse,
    patientName = "Vitalia Patient",
  ) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Vitalia Medical Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${patientName}`, 14, 30);
    doc.text(`Urgency: ${report.urgencyLevel}/5`, 14, 38);
    doc.text("Clinical Summary", 14, 50);
    doc.text(doc.splitTextToSize(report.clinicalSummary, 180), 14, 58);

    const actionStart = 58 + doc.getTextDimensions(report.clinicalSummary).h + 6;
    doc.text("Action Plan", 14, actionStart);
    doc.text(
      doc.splitTextToSize(report.actionPlan.map((a, i) => `${i + 1}. ${a}`).join("\n"), 180),
      14,
      actionStart + 8,
    );

    const redFlagStart = actionStart + 8 + report.actionPlan.length * 6 + 4;
    doc.text("Red Flags", 14, redFlagStart);
    doc.text(doc.splitTextToSize(report.redFlags.join("; "), 180), 14, redFlagStart + 8);

    doc.text("Differential Diagnosis", 14, redFlagStart + 24);
    const diffLines = report.differentialDiagnosis
      .map((d) => `${d.hypothesis} (${Math.round(d.probability * 100)}%)`)
      .join("\n");
    doc.text(doc.splitTextToSize(diffLines, 180), 14, redFlagStart + 32);

    doc.save(`vitalia-report-${Date.now()}.pdf`);
  },

  async startLiveConsultation(callbacks: {
    onMessage: (data: any) => void;
    onClose?: () => void;
    onError?: (err: Error) => void;
  }) {
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY for live consultation.");
    }
    const session = await genAI.live.connect({
      model: "gemini-2.5-flash-native-audio-preview",
      config: {
        responseModalities: [Modality.AUDIO, Modality.TEXT],
        inputAudioFormat: {
          encoding: "pcm16",
          sampleRateHertz: 16000,
        },
        outputAudioFormat: {
          encoding: "pcm_s16le",
          sampleRateHertz: 24000,
        },
      },
      callbacks: {
        onmessage: (event: any) => callbacks.onMessage(event),
        onclose: () => callbacks.onClose?.(),
        onerror: (e: ErrorEvent) => callbacks.onError?.(e.error ?? new Error("Live error")),
      },
    });

    return {
      sendAudioFrame: (data: Uint8Array) =>
        session.send({ data, mimeType: "audio/pcm;rate=16000" }),
      sendVideoFrame: (jpegData: Uint8Array) =>
        session.send({ data: jpegData, mimeType: "image/jpeg" }),
      close: () => session.close(),
    };
  },
};
