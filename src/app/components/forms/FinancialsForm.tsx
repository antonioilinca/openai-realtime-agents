"use client";

import type { FinancialInputs } from "@/app/types";

interface FinancialsFormProps {
  data: FinancialInputs;
  onChange: (value: Partial<FinancialInputs>) => void;
}

export default function FinancialsForm({ data, onChange }: FinancialsFormProps) {
  const updateField = (field: keyof FinancialInputs, value: number) => {
    onChange({ [field]: value } as Partial<FinancialInputs>);
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Chiffres express</span>
        <h2 className="section-title">Capacité d’investissement & objectifs</h2>
        <p className="text-sm text-primary-700">
          Quelques chiffres clés pour calibrer le budget, le ROI et la vitesse de croissance.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Budget disponible (EUR)</label>
          <input
            className="input-field"
            type="number"
            value={data.availableBudget}
            onChange={(event) => updateField("availableBudget", Number(event.target.value))}
            placeholder="Ex : 25000"
          />
        </div>
        <div>
          <label className="label">Objectif CA mensuel (EUR)</label>
          <input
            className="input-field"
            type="number"
            value={data.monthlyRevenueTarget}
            onChange={(event) => updateField("monthlyRevenueTarget", Number(event.target.value))}
            placeholder="Ex : 15000"
          />
        </div>
        <div>
          <label className="label">Charges fixes mensuelles (EUR)</label>
          <input
            className="input-field"
            type="number"
            value={data.monthlyFixedCosts}
            onChange={(event) => updateField("monthlyFixedCosts", Number(event.target.value))}
            placeholder="Ex : 8000"
          />
        </div>
        <div>
          <label className="label">CAC cible (EUR)</label>
          <input
            className="input-field"
            type="number"
            value={data.expectedCAC}
            onChange={(event) => updateField("expectedCAC", Number(event.target.value))}
            placeholder="Coût d’acquisition souhaité"
          />
        </div>
        <div>
          <label className="label">Panier moyen (EUR)</label>
          <input
            className="input-field"
            type="number"
            value={data.averageOrderValue}
            onChange={(event) => updateField("averageOrderValue", Number(event.target.value))}
            placeholder="Valeur moyenne par vente"
          />
        </div>
        <div>
          <label className="label">Runway restant (mois)</label>
          <input
            className="input-field"
            type="number"
            value={data.runwayMonths}
            onChange={(event) => updateField("runwayMonths", Number(event.target.value))}
            placeholder="Ex : 6"
          />
        </div>
      </div>
    </div>
  );
}
