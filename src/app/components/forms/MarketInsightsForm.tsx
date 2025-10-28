"use client";

import type { MarketInsights } from "@/app/types";

const maturityOptions: MarketInsights["maturity"][] = [
  "Émergent",
  "En croissance",
  "Mature",
];

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
        <span className="badge">Analyse de marché</span>
        <h2 className="section-title">Connaissance client & contexte</h2>
        <p className="text-sm text-primary-700">
          Aidez l’IA à comprendre votre terrain de jeu et les signaux à surveiller.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Clients cibles</label>
          <textarea
            className="input-field min-h-[110px]"
            value={data.targetCustomers}
            onChange={(event) => updateField("targetCustomers", event.target.value)}
            placeholder="Segments, personas, comportements d’achat"
          />
        </div>
        <div>
          <label className="label">Douleurs / besoins</label>
          <textarea
            className="input-field min-h-[100px]"
            value={data.pains}
            onChange={(event) => updateField("pains", event.target.value)}
            placeholder="Qu’essaient-ils de résoudre ?"
          />
        </div>
        <div>
          <label className="label">Tendances clés</label>
          <textarea
            className="input-field min-h-[100px]"
            value={data.keyTrends}
            onChange={(event) => updateField("keyTrends", event.target.value)}
            placeholder="Évolution du marché, innovations, attentes"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Concurrents / alternatives</label>
          <textarea
            className="input-field min-h-[120px]"
            value={data.competitors}
            onChange={(event) => updateField("competitors", event.target.value)}
            placeholder="Listez les concurrents directs, indirects, solutions de substitution"
          />
        </div>
        <div>
          <label className="label">Contraintes réglementaires</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.regulations}
            onChange={(event) => updateField("regulations", event.target.value)}
            placeholder="Normes, licences, risques réglementaires"
          />
        </div>
        <div>
          <label className="label">Zones géographiques</label>
          <input
            className="input-field"
            value={data.geographies}
            onChange={(event) => updateField("geographies", event.target.value)}
            placeholder="Pays, villes, canaux digitaux"
          />
        </div>
      </div>

      <div>
        <label className="label">Maturité du marché</label>
        <select
          className="input-field"
          value={data.maturity}
          onChange={(event) => updateField("maturity", event.target.value)}
        >
          {maturityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
