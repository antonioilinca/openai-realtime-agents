"use client";

import type { OfferDetails } from "@/app/types";

interface OfferDetailsFormProps {
  data: OfferDetails;
  onChange: (value: Partial<OfferDetails>) => void;
}

export default function OfferDetailsForm({ data, onChange }: OfferDetailsFormProps) {
  const updateField = (field: keyof OfferDetails, value: string) => {
    onChange({ [field]: value } as Partial<OfferDetails>);
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Offre & valeur</span>
        <h2 className="section-title">Produits, pricing, preuves</h2>
        <p className="text-sm text-primary-700">
          Précisez ce que vous vendez, comment vous délivrez la valeur et ce qui rassure vos clients.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Offres / produits</label>
          <textarea
            className="input-field min-h-[110px]"
            value={data.products}
            onChange={(event) => updateField("products", event.target.value)}
            placeholder="Détaillez vos produits, services, packs"
          />
        </div>
        <div>
          <label className="label">Modèle tarifaire</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.pricingModel}
            onChange={(event) => updateField("pricingModel", event.target.value)}
            placeholder="Abonnement, one-shot, freemium, commission…"
          />
        </div>
        <div>
          <label className="label">Proposition de valeur</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.valueProposition}
            onChange={(event) => updateField("valueProposition", event.target.value)}
            placeholder="Résumez votre promesse principale"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Preuves / traction</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.proofPoints}
            onChange={(event) => updateField("proofPoints", event.target.value)}
            placeholder="Clients signés, témoignages, chiffres clés"
          />
        </div>
        <div>
          <label className="label">Livraison / expérience</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.deliveryModel}
            onChange={(event) => updateField("deliveryModel", event.target.value)}
            placeholder="Processus de délivrance, formats, canaux"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Onboarding</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.onboarding}
            onChange={(event) => updateField("onboarding", event.target.value)}
            placeholder="Étapes clés pour accueillir un client"
          />
        </div>
        <div>
          <label className="label">Fidélisation</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.retentionStrategy}
            onChange={(event) => updateField("retentionStrategy", event.target.value)}
            placeholder="Programmes, services, automatisations"
          />
        </div>
      </div>
    </div>
  );
}
