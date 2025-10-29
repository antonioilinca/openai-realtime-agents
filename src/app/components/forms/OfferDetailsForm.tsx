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
        <span className="badge">Offre signature</span>
        <h2 className="section-title">Ce que vous livrez réellement</h2>
        <p className="text-sm text-primary-700">
          Décrivez l’offre phare, la promesse de valeur et comment vous prouvez l’impact.
        </p>
      </header>

      <div className="grid gap-4">
        <div>
          <label className="label">Offre / produit phare</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.signatureOffer}
            onChange={(event) => updateField("signatureOffer", event.target.value)}
            placeholder="Format, contenu, expérience livrée, packages..."
          />
        </div>
        <div>
          <label className="label">Proposition de valeur</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.valueProposition}
            onChange={(event) => updateField("valueProposition", event.target.value)}
            placeholder="Transformation apportée, bénéfice concret, émotion suscitée"
          />
        </div>
        <div>
          <label className="label">Modèle de revenus / tarification</label>
          <input
            className="input-field"
            value={data.pricingModel}
            onChange={(event) => updateField("pricingModel", event.target.value)}
            placeholder="Abonnement, one-shot, licence, panier moyen visé..."
          />
        </div>
        <div>
          <label className="label">Preuves / traction</label>
          <textarea
            className="input-field min-h-[80px]"
            value={data.proofPoints}
            onChange={(event) => updateField("proofPoints", event.target.value)}
            placeholder="Résultats clients, chiffres, éléments différenciants tangibles"
          />
        </div>
      </div>
    </div>
  );
}
