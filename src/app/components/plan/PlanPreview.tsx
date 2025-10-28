"use client";

import type { ProjectInput } from "@/app/types";

interface PlanPreviewProps {
  data: ProjectInput;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export default function PlanPreview({ data, onGenerate, isGenerating, disabled }: PlanPreviewProps) {
  const readinessScore = computeReadinessScore(data);
  const missingFields = collectMissingFields(data);

  return (
    <aside className="glass-panel flex h-full flex-col justify-between gap-6 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Préparation du dossier</h2>
            <p className="text-sm text-primary-700">
              Score de complétude basé sur les informations fournies.
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-semibold text-[color:var(--accent-primary)]">
              {Math.round(readinessScore * 100)}%
            </span>
            <p className="text-xs text-primary-700">Prêt pour l’IA</p>
          </div>
        </div>

        <div className="grid gap-3">
          <PreviewCard title="Vision" content={data.overview.vision} />
          <PreviewCard title="Clients cibles" content={data.market.targetCustomers} />
          <PreviewCard title="Offre" content={data.offer.valueProposition} />
          <PreviewCard title="Process clés" content={data.operations.processes} />
          <PreviewCard
            title="Budget"
            content={`Budget : ${data.financials.availableBudget.toLocaleString("fr-FR") } € · Charges fixes : ${data.financials.monthlyFixedCosts.toLocaleString("fr-FR")} €`}
          />
        </div>

        {missingFields.length > 0 && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <h3 className="text-sm font-semibold">Champs à compléter</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
              {missingFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={disabled || isGenerating}
        className="w-full rounded-2xl bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_50px_rgba(10,115,225,0.3)] transition hover:bg-[#085ec0] disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isGenerating ? "Calcul en cours…" : "Générer le plan 30/60/90 jours"}
      </button>
    </aside>
  );
}

function PreviewCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-muted)] bg-white/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{title}</p>
      <p className="mt-1 line-clamp text-sm text-primary-900/80">{content || "À compléter"}</p>
    </div>
  );
}

function computeReadinessScore(data: ProjectInput) {
  const fields = [
    data.overview.projectName,
    data.overview.slogan,
    data.overview.vision,
    data.market.targetCustomers,
    data.market.pains,
    data.offer.valueProposition,
    data.operations.processes,
    data.financials.availableBudget,
    data.financials.monthlyFixedCosts,
  ];
  const completed = fields.filter((value) => {
    if (typeof value === "number") {
      return value > 0;
    }
    return value.trim().length > 5;
  }).length;
  return completed / fields.length;
}

function collectMissingFields(data: ProjectInput): string[] {
  const missing: string[] = [];
  if (!data.overview.projectName) missing.push("Nom du projet");
  if (!data.overview.vision) missing.push("Vision");
  if (!data.market.targetCustomers) missing.push("Clients cibles");
  if (!data.offer.valueProposition) missing.push("Proposition de valeur");
  if (!data.operations.processes) missing.push("Processus clés");
  if (!data.financials.availableBudget) missing.push("Budget disponible");
  if (!data.financials.monthlyFixedCosts) missing.push("Charges fixes");
  return missing;
}
