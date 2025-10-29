"use client";

import type { MarketInsights } from "@/app/types";

interface MarketInsightsFormProps {
  data: MarketInsights;
  onChange: (value: Partial<MarketInsights>) => void;
}

export default function MarketInsightsForm({ data, onChange }: MarketInsightsFormProps) {
  const updateField = (field: keyof MarketInsights, value: string) => {
    onChange({ [field]: value } as Partial<MarketInsights>);
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Terrain de jeu</span>
        <h2 className="section-title">Clients & signaux clés</h2>
        <p className="text-sm text-primary-700">
          Donnez l’essentiel : cible, besoin prioritaire, dynamiques et acteurs majeurs.
        </p>
      </header>

      <div className="grid gap-4">
        <div>
          <label className="label">Clients cibles</label>
          <textarea
            className="input-field min-h-[100px]"
            value={data.targetCustomers}
            onChange={(event) => updateField("targetCustomers", event.target.value)}
            placeholder="Segments, personas, comportements d’achat"
          />
        </div>
        <div>
          <label className="label">Besoin vital / douleur centrale</label>
          <textarea
            className="input-field min-h-[100px]"
            value={data.coreNeed}
            onChange={(event) => updateField("coreNeed", event.target.value)}
            placeholder="Le problème à résoudre absolument pour vos clients"
          />
        </div>
        <div>
          <label className="label">Tendances ou signaux forts</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.keyTrends}
            onChange={(event) => updateField("keyTrends", event.target.value)}
            placeholder="Évolutions marché, usages, innovations, attentes"
          />
        </div>
        <div>
          <label className="label">Top 3 concurrents / alternatives</label>
          <textarea
            className="input-field min-h-[110px]"
            value={data.competitors}
            onChange={(event) => updateField("competitors", event.target.value)}
            placeholder="Nommez les acteurs ou solutions substitutives majeures"
          />
        </div>
      </div>
    </div>
  );
}
