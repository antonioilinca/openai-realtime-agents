"use client";

import { useEffect, useState } from "react";
import { Inbox, Loader2, UploadCloud, Link as LinkIcon } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { AnalysisResult, analyzeDocument } from "@/lib/gemini";
import { addEvent } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseServices, firebaseEnabled, uploadBytes, ref, getDownloadURL } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function InboxPage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const uploadToStorage = async () => {
    if (!file || !firebaseEnabled || !user) return null;
    const { storage } = getFirebaseServices();
    const storageRef = ref(storage, `inbox/${user.uid}/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const analyze = async () => {
    if (!file) {
      toast.error("Ajoutez d’abord un document à analyser.");
      return;
    }
    setLoading(true);
    try {
      const content = await file.text();
      const result = await analyzeDocument(content || `Nom du fichier : ${file.name}`);
      setAnalysis(result);
      const storageUrl = await uploadToStorage();
      if (result.date && user) {
        await addEvent(user.uid, {
          title: result.titre,
          date: result.date,
          priority: result.urgence === "élevée" ? "haute" : result.urgence === "moyenne" ? "normale" : "basse",
          relatedDocId: storageUrl || undefined,
        });
      }
      toast.success("Analyse IA terminée et synchronisée.");
    } catch {
      toast.error("Analyse impossible. Vérifiez la clé Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7">
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Inbox className="h-5 w-5 text-[#d4af37]" />
            <div>
              <p className="text-xs uppercase text-slate-500">Inbox sécurisée</p>
              <h3 className="text-lg font-semibold text-[#003366]">Importer, scanner, analyser</h3>
            </div>
          </div>
          <label
            className="border-2 border-dashed border-[#d4af37]/40 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-white/70"
          >
            <UploadCloud className="h-8 w-8 text-[#d4af37]" />
            <p className="text-sm font-semibold text-[#003366]">Déposez un PDF/image ou cliquez pour importer</p>
            <input type="file" accept="application/pdf,image/*" className="hidden" onChange={handleFileChange} />
          </label>
          {file && (
            <div className="mt-4 rounded-2xl bg-white/80 p-3 shadow-inner">
              <p className="text-sm font-semibold text-[#003366]">{file.name}</p>
              <p className="text-xs text-slate-500">{Math.round(file.size / 1024)} Ko</p>
              {preview && (
                <div className="mt-3">
                  <iframe src={preview} className="w-full h-64 rounded-2xl border border-white/50" title="preview" />
                </div>
              )}
            </div>
          )}
          <div className="mt-4 flex gap-3">
            <PrimaryButton onClick={analyze} disabled={loading} icon={loading ? Loader2 : Inbox}>
              {loading ? "Analyse en cours..." : "Analyser avec Gemini"}
            </PrimaryButton>
            <a
              href="https://www.service-public.fr/particuliers/vosdroits/N522"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-[#003366]/20 px-4 py-3 text-sm font-semibold text-[#003366] hover:bg-white/60"
            >
              Voir le site officiel
            </a>
          </div>
        </GlassCard>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <GlassCard className="h-full">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase text-slate-500">Résultat IA</p>
              <h3 className="text-xl font-bold text-[#003366]">Lecture intelligente</h3>
            </div>
          </div>
          {analysis ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#003366]/10 px-3 py-1 text-xs font-semibold text-[#003366]">
                  {analysis.organisme}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    analysis.urgence === "élevée"
                      ? "badge-urgency-high"
                      : analysis.urgence === "moyenne"
                        ? "badge-urgency-medium"
                        : "badge-urgency-low"
                  }`}
                >
                  Urgence {analysis.urgence}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#003366]">{analysis.titre}</h4>
              <p className="text-sm text-slate-700">{analysis.resume}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/70 p-3 text-sm shadow-inner">
                  <p className="text-xs uppercase text-slate-500">Montant</p>
                  <p className="text-lg font-bold text-[#003366]">{analysis.montant || "N/A"}</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-sm shadow-inner">
                  <p className="text-xs uppercase text-slate-500">Date clé</p>
                  <p className="text-lg font-bold text-[#003366]">{analysis.date || "Non détectée"}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-3">
                <p className="text-sm font-semibold text-[#003366]">Plan d’action</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                  {analysis.actions.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl bg-red-50 p-3 border border-red-100">
                <p className="text-sm font-semibold text-red-700">Risques si inaction</p>
                <p className="text-sm text-red-600">{analysis.risques}</p>
              </div>
              {analysis.lien && (
                <a
                  href={analysis.lien}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#003366] underline"
                >
                  <LinkIcon className="h-4 w-4" /> Accéder au site officiel
                </a>
              )}
            </div>
          ) : (
              <p className="text-sm text-slate-500">Importez un document pour déclencher l’analyse automatique Gemini.</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
