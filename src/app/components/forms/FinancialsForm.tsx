"use client";

import type { FinancialInputs } from "@/app/types";

interface FinancialsFormProps {
  data: FinancialInputs;
  onChange: (value: Partial<FinancialInputs>) => void;
}

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toString() : "";

export default function FinancialsForm({ data, onChange }: FinancialsFormProps) {
  const updateField = (field: keyof FinancialInputs, value: number) => {
    onChange({ [field]: Number.isNaN(value) ? 0 : value } as Partial<FinancialInputs>);
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Budget & chiffres</span>
        <h2 className="section-title">Données financières clés</h2>
        <p className="text-sm text-primary-700">
          Les montants permettent au moteur IA d’estimer la rentabilité et le seuil de rentabilité.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="label">Budget disponible (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.availableBudget)}
            onChange={(event) => updateField("availableBudget", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">Besoin de financement (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.fundingNeeds)}
            onChange={(event) => updateField("fundingNeeds", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">Runway (mois)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.runwayMonths)}
            onChange={(event) => updateField("runwayMonths", Number(event.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="label">Charges fixes mensuelles (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.monthlyFixedCosts)}
            onChange={(event) => updateField("monthlyFixedCosts", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">Coûts variables / COGS (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.cogs)}
            onChange={(event) => updateField("cogs", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">CAC cible (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.expectedCAC)}
            onChange={(event) => updateField("expectedCAC", Number(event.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="label">Panier moyen (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.averageOrderValue)}
            onChange={(event) => updateField("averageOrderValue", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">Taux de conversion (%)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.expectedConversionRate)}
            onChange={(event) => updateField("expectedConversionRate", Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label">LTV moyenne (€)</label>
          <input
            className="input-field"
            type="number"
            value={formatNumber(data.lifetimeValue)}
            onChange={(event) => updateField("lifetimeValue", Number(event.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
