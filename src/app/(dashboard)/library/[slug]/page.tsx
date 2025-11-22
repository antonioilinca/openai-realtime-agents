"use client";

import { useParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { CheckCircle2, Clock3, FileText, Flame, MapPinned } from "lucide-react";
import Link from "next/link";

const guides: Record<string, any> = {
  "naturalisation": {
    title: "Demande de naturalisation",
    steps: [
      "Créer un compte sur service-public.fr et remplir le formulaire en ligne.",
      "Scanner et ajouter les pièces justificatives exigées.",
      "Payer les timbres fiscaux si nécessaires.",
      "Prendre rendez-vous en préfecture pour l’entretien civique.",
    ],
    documents: [
      "Passeport en cours de validité",
      "Titre de séjour",
      "Justificatif de domicile < 3 mois",
      "Acte de naissance intégral",
    ],
    conditions: [
      "Résidence régulière en France depuis 5 ans",
      "Maîtrise du français (niveau B1)",
      "Absence de condamnation pénale",
    ],
    summary: {
      duree: "6 à 12 mois",
      cout: "55€ de timbre fiscal",
      lien: "https://www.service-public.fr/particuliers/vosdroits/F2213",
    },
  },
};

export default function GuidePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "naturalisation";
  const guide = guides[slug] || guides["naturalisation"];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-4">
        <GlassCard>
          <p className="text-xs uppercase text-slate-500">Fiche pratique</p>
          <h2 className="text-2xl font-bold text-[#003366]">{guide.title}</h2>
          <div className="mt-4 space-y-3">
            {guide.steps.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-inner">
                <div className="mt-1 h-8 w-8 rounded-2xl bg-[#003366]/10 text-[#003366] flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-[#003366]">Documents nécessaires</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {guide.documents.map((doc: string, idx: number) => (
              <div key={idx} className="rounded-2xl bg-white/70 p-3 text-sm text-slate-700 shadow-inner flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                {doc}
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-[#003366]">Erreurs fréquentes</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-red-700">
            <li>Dossier incomplet ou pièces non conformes.</li>
            <li>Absence de traduction officielle pour les actes étrangers.</li>
            <li>Non-respect des délais de dépôt.</li>
          </ul>
        </GlassCard>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <MapPinned className="h-5 w-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#003366]">En bref</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>Durée :</strong> {guide.summary.duree}</p>
            <p><strong>Coût :</strong> {guide.summary.cout}</p>
            <p>
              <strong>Lien officiel :</strong>{" "}
              <a href={guide.summary.lien} target="_blank" rel="noreferrer" className="text-[#003366] underline">
                Consulter la procédure
              </a>
            </p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Clock3 className="h-5 w-5 text-[#003366]" />
            <h3 className="text-lg font-semibold text-[#003366]">Contacts utiles</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>Service Public : 3939 (coût d’un appel local)</li>
            <li>Préfecture : rendez-vous en ligne</li>
            <li>Assistance AdminCopilote : support@admincopilote.fr</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-[#003366]" />
            <h3 className="text-lg font-semibold text-[#003366]">Assistant dédié</h3>
          </div>
          <p className="text-sm text-slate-700 mb-3">Posez vos questions pour cette démarche, l’IA reste contextualisée.</p>
          <Link
            href="/assistant"
            className="inline-flex items-center justify-center rounded-2xl bg-[#003366] px-4 py-2 text-sm font-semibold text-white shadow-lg"
          >
            Ouvrir le chat IA
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
