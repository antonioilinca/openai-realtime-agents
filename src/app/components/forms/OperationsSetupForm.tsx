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
        <span className="badge">Organisation & ressources</span>
        <h2 className="section-title">Équipe, process, outils</h2>
        <p className="text-sm text-primary-700">
          Décrivez comment votre équipe opère aujourd’hui et les zones à automatiser.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Équipe & rôles</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.team}
            onChange={(event) => updateField("team", event.target.value)}
            placeholder="Fondateurs, freelances, prestataires"
          />
        </div>
        <div>
          <label className="label">Processus clés</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.processes}
            onChange={(event) => updateField("processes", event.target.value)}
            placeholder="Vente, production, service client, reporting"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Outils & stack</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.tools}
            onChange={(event) => updateField("tools", event.target.value)}
            placeholder="CRM, outils no-code, IA déjà en place"
          />
        </div>
        <div>
          <label className="label">Partenariats</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.partnerships}
            onChange={(event) => updateField("partnerships", event.target.value)}
            placeholder="Partenaires clés, distributeurs, mentors"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Risques opérationnels</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.risks}
            onChange={(event) => updateField("risks", event.target.value)}
            placeholder="Goulets d’étranglement, dépendances critiques"
          />
        </div>
        <div>
          <label className="label">Automatisations souhaitées</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.automationWish}
            onChange={(event) => updateField("automationWish", event.target.value)}
            placeholder="Tâches à déléguer à l’IA, workflows à simplifier"
          />
        </div>
      </div>
    </div>
  );
}
