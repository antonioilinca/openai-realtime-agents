import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const getModel = (modelName = "gemini-1.5-pro-latest") => {
  if (!apiKey) {
    throw new Error("Clé API Gemini manquante. Ajoutez NEXT_PUBLIC_GEMINI_API_KEY.");
  }
  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: modelName });
};

export type AnalysisResult = {
  organisme: string;
  titre: string;
  resume: string;
  urgence: "élevée" | "moyenne" | "basse" | string;
  date: string;
  montant: string;
  actions: string[];
  risques: string;
  lien?: string;
};

export const analyzeDocument = async (content: string): Promise<AnalysisResult> => {
  const model = getModel();
  const prompt = `Tu es un expert administratif français. Analyse le document suivant et renvoie STRICTEMENT un JSON respectant cette structure :\n{
  "organisme": "Nom de l'administration ou organisme",\n  "titre": "Intitulé clair du document",\n  "resume": "Résumé synthétique en français",\n  "urgence": "élevée|moyenne|basse",\n  "date": "AAAA-MM-JJ ou vide si inconnue",\n  "montant": "montant en euros si applicable",\n  "actions": ["étape 1", "étape 2"],\n  "risques": "risques si inaction",\n  "lien": "lien officiel si pertinent"\n}\nContenu à analyser :\n${content}`;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const jsonText = jsonStart >= 0 ? text.slice(jsonStart, jsonEnd + 1) : text;
  return JSON.parse(jsonText) as AnalysisResult;
};

export const chatWithGemini = async (messages: { role: "user" | "system" | "model"; content: string }[]) => {
  const model = getModel("gemini-1.5-flash-latest");
  const prompt = messages
    .map((m) => `${m.role === "user" ? "Utilisateur" : m.role === "system" ? "Système" : "Assistant"}: ${m.content}`)
    .join("\n");
  const response = await model.generateContent(
    `Tu es AdminCopilote, expert administratif français. Appuie tes réponses sur les sources officielles (service-public.fr, impots.gouv.fr, ameli.fr). Réponds en français clair, structuré, avec des listes à puces concises.\n\nHistorique :\n${prompt}`,
  );
  return response.response.text();
};
