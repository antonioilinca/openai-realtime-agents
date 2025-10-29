"use client";

import type { OperationsSetup } from "@/app/types";

interface OperationsSetupFormProps {
  data: OperationsSetup;
  onChange: (value: Partial<OperationsSetup>) => void;
}

export default function OperationsSetupForm({ data, onChange }: OperationsSetupFormProps) {
  const updateField = (field: keyof OperationsSetup, value: string) => {
    onChange({ [field]: value } as Partial<OperationsSetup>);
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Machine interne</span>
        <h2 className="section-title">Ressources & automatisations</h2>
        <p className="text-sm text-primary-700">
          Un aperçu rapide de qui exécute, comment vous délivrez et où l’IA doit accélérer.
        </p>
      </header>

      <div className="grid gap-4">
        <div>
          <label className="label">Équipe & ressources clés</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.team}
            onChange={(event) => updateField("team", event.target.value)}
            placeholder="Compétences disponibles, partenaires essentiels, ressources phares"
          />
        </div>
        <div>
          <label className="label">Processus critiques</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.processes}
            onChange={(event) => updateField("processes", event.target.value)}
            placeholder="Production, vente, delivery, expérience client..."
          />
        </div>
        <div>
          <label className="label">Automatisation rêvée / stack idéale</label>
          <textarea
            className="input-field min-h-[80px]"
            value={data.automationWish}
            onChange={(event) => updateField("automationWish", event.target.value)}
            placeholder="Ce que vous voudriez automatiser en priorité"
          />
        </div>
        <div>
          <label className="label">Risques critiques</label>
          <textarea
            className="input-field min-h-[80px]"
            value={data.risks}
            onChange={(event) => updateField("risks", event.target.value)}
            placeholder="Bottlenecks actuels, dépendances, alertes à surveiller"
          />
        </div>
      </div>
    </div>
  );
}
