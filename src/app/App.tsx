"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivitySquare,
  AlertTriangle,
  Brain,
  Camera,
  Download,
  FileAudio,
  FileImage,
  FileText,
  Languages,
  MapPin,
  Mic,
  PhoneCall,
  Play,
  Sparkles,
  Stethoscope,
  Video,
  Volume2,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { geminiService } from "./vitalia/geminiService";
import {
  BodyMetrics,
  InteractionRecord,
  Language,
  MedicalAnalysisResponse,
  OfflineGuide,
} from "./vitalia/types";
import { OFFLINE_GUIDES } from "./vitalia/offlineGuides";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ro", label: "Română" },
];

const urgencyGradient = [
  "from-teal-400 to-teal-600",
  "from-lime-400 to-amber-500",
  "from-amber-500 to-orange-500",
  "from-orange-500 to-red-500",
  "from-red-600 to-red-700",
];

const glass = "bg-white/70 backdrop-blur-xl shadow-xl border border-white/50";

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result.replace(/^data:[^;]+;base64,/, ""));
      } else {
        reject(new Error("Unable to read file"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const AnalysisCard: React.FC<{ response: MedicalAnalysisResponse }> = ({
  response,
}) => {
  return (
    <div
      className={`${glass} rounded-2xl p-6 grid gap-4 animate-fade-in`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="text-teal-600" />
          <h3 className="text-xl font-semibold text-slate-900">Clinical Brain</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Urgency</span>
          <div
            className={`h-3 w-24 rounded-full bg-gradient-to-r ${urgencyGradient[Math.min(response.urgencyLevel - 1, 4)]}`}
          />
          <span className="text-sm font-semibold text-slate-900">
            {response.urgencyLevel}/5
          </span>
        </div>
      </div>
      <p className="text-slate-700 leading-relaxed">{response.clinicalSummary}</p>
      {response.interviewQuestions && response.interviewQuestions.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-amber-800">
          <p className="font-semibold">Interview Mode</p>
          <ul className="list-disc ml-5 text-sm mt-1">
            {response.interviewQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="font-semibold flex items-center gap-2 text-slate-900">
            <Stethoscope className="text-teal-600" size={18} /> Differential Diagnosis
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {response.differentialDiagnosis.map((d) => (
              <li key={d.hypothesis} className="flex justify-between">
                <span>{d.hypothesis}</span>
                <span className="font-semibold">{Math.round(d.probability * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="font-semibold flex items-center gap-2 text-slate-900">
            <AlertTriangle className="text-orange-500" size={18} /> Red Flags
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-700 list-disc ml-4">
            {response.redFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="font-semibold text-slate-900">Action Plan</h4>
          <ol className="list-decimal ml-4 mt-2 space-y-1 text-sm text-slate-700">
            {response.actionPlan.map((plan) => (
              <li key={plan}>{plan}</li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="font-semibold text-slate-900">Medications & Interactions</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-700">
            {response.prePrescription.map((p) => (
              <div key={p.name} className="border border-slate-100 rounded-lg p-2 bg-white">
                <p className="font-semibold text-slate-900">{p.name}</p>
                <p className="text-xs">{p.dosage}</p>
                <p className="text-xs text-slate-600">{p.usage}</p>
                <p className="text-xs text-red-600">{p.warnings}</p>
              </div>
            ))}
            {response.drugInteractions.length > 0 && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-2 text-red-700">
                <p className="font-semibold">Interactions</p>
                <ul className="list-disc ml-4 text-xs">
                  {response.drugInteractions.map((i) => (
                    <li key={i.interaction}>
                      {i.drugs.join(" + ")} → {i.interaction}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {response.geolocatedHospitals.length > 0 && (
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="font-semibold flex items-center gap-2 text-slate-900">
            <MapPin className="text-teal-600" size={18} /> Nearby Hospitals
          </h4>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            {response.geolocatedHospitals.map((hosp) => (
              <div key={hosp.name} className="p-2 border border-slate-100 rounded-lg bg-white text-sm">
                <p className="font-semibold text-slate-900">{hosp.name}</p>
                <p className="text-slate-600 text-xs">{hosp.address}</p>
                <p className="text-xs">ETA: {hosp.distanceMinutes ?? "-"} mins</p>
                {hosp.mapUrl && (
                  <a
                    href={hosp.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-600 text-xs underline"
                  >
                    Open map
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LiveConsultation: React.FC<{
  active: boolean;
  onToggle: () => void;
}> = ({ active, onToggle }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("Idle");
  const [transcript, setTranscript] = useState<string>("");
  const sessionRef = useRef<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!active) return;
    const startMedia = async () => {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      });
      setStream(media);
      if (videoRef.current) {
        videoRef.current.srcObject = media;
        videoRef.current.play();
      }
    };
    startMedia();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [active]);

  const beginLive = async () => {
    setStatus("Connecting to Gemini...");
    sessionRef.current = await geminiService.startLiveConsultation({
      onMessage: (message) => {
        setStatus("Streaming");
        const text = message?.response?.text ?? message?.response?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join(" ");
        if (text) setTranscript((prev) => `${prev}\n${text}`);
      },
      onError: () => setStatus("Error"),
      onClose: () => setStatus("Disconnected"),
    });
  };

  useEffect(() => {
    if (!active || !stream) return;
    beginLive();
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    recorder.ondataavailable = async (event) => {
      if (!sessionRef.current || !event.data.size) return;
      const buffer = await event.data.arrayBuffer();
      sessionRef.current.sendAudioFrame(new Uint8Array(buffer));
    };
    recorder.start(500);
    return () => {
      recorder.stop();
      sessionRef.current?.close();
      setStatus("Idle");
    };
  }, [active, stream]);

  return (
    <div className={`${glass} rounded-2xl p-4 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="text-teal-600" />
          <p className="font-semibold">Live Consultation</p>
        </div>
        <button
          onClick={onToggle}
          className="px-3 py-1 rounded-full text-sm bg-teal-600 text-white hover:bg-teal-700"
        >
          {active ? "Stop" : "Start"}
        </button>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-900">
        <video ref={videoRef} className="w-full object-cover opacity-90" muted playsInline />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full animate-pulse ${active ? "bg-teal-400" : "bg-slate-400"}`} />
          <span className="text-white text-sm">{status}</span>
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 h-28 overflow-y-auto text-sm text-slate-700">
        {transcript || "Awaiting audio..."}
      </div>
      <div className="flex gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1"><Mic size={14} className="text-teal-600" /> Streaming audio</div>
        <div className="flex items-center gap-1"><Camera size={14} className="text-teal-600" /> Selfie video mirrored</div>
        <div className="flex items-center gap-1"><Volume2 size={14} className="text-teal-600" /> Real-time responses</div>
      </div>
    </div>
  );
};

const OfflineAid: React.FC<{ guides: OfflineGuide[] }> = ({ guides }) => (
  <div className={`${glass} rounded-2xl p-4`}>
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="text-orange-500" />
      <p className="font-semibold text-slate-900">Offline First Aid</p>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {guides.map((guide) => (
        <div key={guide.code} className="rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-3">
          <p className="font-semibold text-slate-900">{guide.title}</p>
          <ol className="list-decimal ml-4 mt-2 space-y-1 text-sm text-slate-700">
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [userInput, setUserInput] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetrics>({
    weightKg: 70,
    heightCm: 175,
    age: 30,
    activityLevel: "moderate",
  });
  const [history, setHistory] = useState<InteractionRecord[]>([]);
  const [activeLive, setActiveLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [emergency, setEmergency] = useState(false);

  const latestResponse = useMemo(() => history[0]?.response, [history]);

  const attachFiles = async () => {
    const media = await Promise.all(
      selectedFiles.map(async (file) => ({
        data: await toBase64(file),
        mimeType: file.type,
      })),
    );
    return media;
  };

  const addInteraction = (record: InteractionRecord) => {
    setHistory((prev) => [record, ...prev].slice(0, 20));
  };

  const runAnalysis = async (category: InteractionRecord["category"], opts: {
    text?: string;
    files?: { data: string; mimeType: string }[];
    body?: BodyMetrics;
  }) => {
    setLoading(true);
    try {
      const response = await geminiService.analyzeClinicalData({
        text: opts.text ?? "",
        files: opts.files,
        locale: language,
        bodyMetrics: opts.body,
      });
      addInteraction({
        id: uuidv4(),
        createdAt: Date.now(),
        userText: opts.text,
        attachments:
          selectedFiles.map((f) => ({ name: f.name, type: f.type })) ?? [],
        response,
        category,
      });
      if (response.urgencyLevel >= 5) setEmergency(true);
      setAudioUrl(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const files = await attachFiles();
    await runAnalysis("clinical", { text: userInput, files });
    setUserInput("");
    setSelectedFiles([]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleMedicationScan = async () => {
    const image = selectedFiles.find((f) => f.type.startsWith("image"));
    if (!image) return;
    const base64 = await toBase64(image);
    await runAnalysis("medication", {
      text: "Medication scanner request",
      files: [{ data: base64, mimeType: image.type }],
    });
  };

  const handleVoice = async () => {
    const audio = selectedFiles.find((f) => f.type.startsWith("audio"));
    if (!audio) return;
    const base64 = await toBase64(audio);
    await runAnalysis("voice", {
      text: "Voice biomarker analysis",
      files: [{ data: base64, mimeType: audio.type }],
    });
  };

  const handleVision = async () => {
    const image = selectedFiles.find((f) => f.type.startsWith("image"));
    if (!image) return;
    const base64 = await toBase64(image);
    await runAnalysis("vision", {
      text: "Vision analysis for lesions",
      files: [{ data: base64, mimeType: image.type }],
    });
  };

  const handleBody = async () => {
    const photo = selectedFiles.find((f) => f.type.startsWith("image"));
    const payload = { ...bodyMetrics };
    if (photo) payload.photoDataUrl = await toBase64(photo);
    await runAnalysis("body", { text: "Body metrics analysis", body: payload });
  };

  const exportPdf = () => {
    if (!latestResponse) return;
    geminiService.generatePdfReport(latestResponse);
  };

  const playAudio = async () => {
    if (!latestResponse) return;
    const blob = await geminiService.generateAudioSummary(
      latestResponse.clinicalSummary,
    );
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      {emergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900/40">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-red-500 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-red-600" size={32} />
              <h2 className="text-2xl font-bold text-red-700">Critical Urgency Detected</h2>
            </div>
            <p className="text-red-700 mb-4">Call emergency services immediately.</p>
            <a
              href="tel:112"
              className="bg-red-600 text-white px-4 py-2 rounded-xl text-lg font-semibold flex items-center gap-2"
            >
              <PhoneCall /> Call Emergency
            </a>
            <button
              onClick={() => setEmergency(false)}
              className="mt-4 text-sm text-slate-600 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-teal-600">Next-Gen Multimodal AI</p>
            <h1 className="text-4xl font-bold text-slate-900">Vitalia Medical Assistant</h1>
            <p className="text-slate-600">Smart intake, triage, and live consultation powered by Gemini 2.5 Flash.</p>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="text-teal-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className={`${glass} rounded-3xl p-4`}>
              <div className="flex items-center gap-3 mb-3">
                <Brain className="text-teal-600" />
                <div>
                  <p className="font-semibold">Smart Intake</p>
                  <p className="text-sm text-slate-600">Text, images, audio, or PDF. Vitalia will triage automatically.</p>
                </div>
              </div>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe symptoms, upload labs, or ask a question..."
                className="w-full rounded-2xl border border-slate-200 p-4 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                rows={4}
              />
              <div className="flex flex-wrap gap-2 items-center mt-3">
                <label className="flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-slate-200 bg-white cursor-pointer hover:border-teal-500">
                  <FileImage size={16} />
                  Image/PDF/Audio
                  <input type="file" className="hidden" multiple accept="image/*,application/pdf,audio/*" onChange={handleFileInput} />
                </label>
                {selectedFiles.map((file) => (
                  <span key={file.name} className="px-3 py-1 text-xs rounded-full bg-slate-100 border border-slate-200">
                    {file.name}
                  </span>
                ))}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="ml-auto bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 disabled:opacity-60"
                >
                  {loading ? "Analyzing..." : "Send to Brain"}
                </button>
              </div>
            </div>

            {latestResponse && (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={exportPdf}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
                >
                  <Download size={16} /> Export PDF
                </button>
                <button
                  onClick={playAudio}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
                >
                  <Play size={16} /> Audio Report
                </button>
                {audioUrl && (
                  <audio src={audioUrl} autoPlay controls className="mt-2" />
                )}
              </div>
            )}

            <LiveConsultation
              active={activeLive}
              onToggle={() => setActiveLive((prev) => !prev)}
            />
          </div>

          <div className="space-y-4">
            <div className={`${glass} rounded-2xl p-4 sticky top-6 space-y-3`}>
              <div className="flex items-center gap-2">
                <ActivitySquare className="text-teal-600" />
                <p className="font-semibold">Tools Menu</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleMedicationScan} className="rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-teal-500 flex flex-col items-start gap-1">
                  <FileImage className="text-teal-600" size={18} /> Medication Scanner
                </button>
                <button onClick={handleVoice} className="rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-teal-500 flex flex-col items-start gap-1">
                  <FileAudio className="text-teal-600" size={18} /> Voice Analysis
                </button>
                <button onClick={handleVision} className="rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-teal-500 flex flex-col items-start gap-1">
                  <Camera className="text-teal-600" size={18} /> Vision Check
                </button>
                <button onClick={handleBody} className="rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-teal-500 flex flex-col items-start gap-1">
                  <ActivitySquare className="text-teal-600" size={18} /> Body & Nutrition
                </button>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-sm space-y-2">
                <p className="font-semibold">Body Metrics</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex flex-col gap-1">
                    <span className="text-slate-600">Weight (kg)</span>
                    <input
                      type="number"
                      value={bodyMetrics.weightKg}
                      onChange={(e) => setBodyMetrics({ ...bodyMetrics, weightKg: Number(e.target.value) })}
                      className="rounded-lg border border-slate-200 px-2 py-1"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-slate-600">Height (cm)</span>
                    <input
                      type="number"
                      value={bodyMetrics.heightCm}
                      onChange={(e) => setBodyMetrics({ ...bodyMetrics, heightCm: Number(e.target.value) })}
                      className="rounded-lg border border-slate-200 px-2 py-1"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-slate-600">Age</span>
                    <input
                      type="number"
                      value={bodyMetrics.age}
                      onChange={(e) => setBodyMetrics({ ...bodyMetrics, age: Number(e.target.value) })}
                      className="rounded-lg border border-slate-200 px-2 py-1"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-slate-600">Activity</span>
                    <select
                      value={bodyMetrics.activityLevel}
                      onChange={(e) => setBodyMetrics({ ...bodyMetrics, activityLevel: e.target.value })}
                      className="rounded-lg border border-slate-200 px-2 py-1"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="athlete">Athlete</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {latestResponse ? (
              <AnalysisCard response={latestResponse} />
            ) : (
              <div className={`${glass} rounded-2xl p-6 text-slate-600`}>Awaiting your intake to start analysis.</div>
            )}

            <div className={`${glass} rounded-2xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-teal-600" />
                <p className="font-semibold">Dashboard Feed</p>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-white/80">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                      <span className="uppercase tracking-wide text-teal-600 font-semibold">{item.category}</span>
                    </div>
                    <p className="text-sm text-slate-800 mt-1">{item.userText || "Signal"}</p>
                    {item.response && (
                      <p className="text-xs text-slate-600 mt-1">Urgency: {item.response.urgencyLevel} | {item.response.differentialDiagnosis[0]?.hypothesis}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <OfflineAid guides={OFFLINE_GUIDES} />
          </div>
        </section>
      </div>
    </main>
  );
}
