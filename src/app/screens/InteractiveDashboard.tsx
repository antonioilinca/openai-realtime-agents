"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Stepper from "@/app/components/layout/Stepper";
import ProjectOverviewForm from "@/app/components/forms/ProjectOverviewForm";
import MarketInsightsForm from "@/app/components/forms/MarketInsightsForm";
import OfferDetailsForm from "@/app/components/forms/OfferDetailsForm";
import OperationsSetupForm from "@/app/components/forms/OperationsSetupForm";
import FinancialsForm from "@/app/components/forms/FinancialsForm";
import PlanPreview from "@/app/components/plan/PlanPreview";
import PlanDisplay from "@/app/components/plan/PlanDisplay";
import IterationPanel from "@/app/components/plan/IterationPanel";

import { useAutoSave, restoreAutoSavedState } from "@/app/hooks/useAutoSave";
import { usePlanGenerator } from "@/app/hooks/usePlanGenerator";
import type { Objective, ProjectInput } from "@/app/types";

const STEPS = [
  { id: 1, label: "Projet", description: "Vision, pitch et priorités" },
  { id: 2, label: "Marché & Offre", description: "Clients, besoins, valeur" },
  { id: 3, label: "Opérations & Chiffres", description: "Exécution et budget" },
];

const STORAGE_KEY = "atlas-strategique-state";

const defaultObjectives: Objective[] = [
  { id: uuidv4(), label: "Valider le problème client avec 10 entretiens", horizon: "30j" },
  { id: uuidv4(), label: "Signer 5 clients pilotes", horizon: "60j" },
  { id: uuidv4(), label: "Atteindre 20k€ de MRR", horizon: "90j" },
];

const initialState: ProjectInput = {
  overview: {
    projectName: "",
    elevatorPitch: "",
    sector: "SaaS",
    stage: "Prototype",
    vision: "",
    differentiator: "",
    objectives: defaultObjectives,
  },
  market: {
    targetCustomers: "",
    coreNeed: "",
    keyTrends: "",
    competitors: "",
  },
  offer: {
    signatureOffer: "",
    valueProposition: "",
    pricingModel: "",
    proofPoints: "",
  },
  operations: {
    team: "",
    processes: "",
    automationWish: "",
    risks: "",
  },
  financials: {
    availableBudget: 0,
    monthlyRevenueTarget: 0,
    monthlyFixedCosts: 0,
    expectedCAC: 0,
    averageOrderValue: 0,
    runwayMonths: 6,
  },
  language: "fr",
};

type SectionKey = Exclude<keyof ProjectInput, "language">;

export default function InteractiveDashboard() {
  const restored = useMemo(() => restoreAutoSavedState<ProjectInput>(STORAGE_KEY), []);
  const [formData, setFormData] = useState<ProjectInput>(restored ?? initialState);
  const [activeStep, setActiveStep] = useState(1);

  const { plan, generatePlan, iteratePlan, isLoading, error, version, aiNotes, conversation } =
    usePlanGenerator();

  useAutoSave(STORAGE_KEY, formData);

  useEffect(() => {
    if (!restored) {
      setFormData(initialState);
    }
  }, [restored]);

  const updateSection = <K extends SectionKey>(key: K, value: Partial<ProjectInput[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...value,
      },
    }));
  };

  const handleGenerate = async () => {
    await generatePlan({ input: formData, mode: "generate" });
  };

  const handleIteration = async (message: string) => {
    if (!plan) return;
    await iteratePlan(message, {
      input: formData,
      previousPlan: plan,
      conversation,
      mode: "iterate",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#f6f7fc] to-[#eaf1fb] pb-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 pt-10">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-primary-900">Atlas Stratégique IA</h1>
              <p className="max-w-3xl text-sm text-primary-700">
                Collectez vos données, laissez le cerveau IA analyser votre contexte et obtenez un plan
                opérationnel 30/60/90 jours, un budget prévisionnel et une stratégie d’acquisition
                prête à déployer.
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border-muted)] bg-white px-4 py-2 text-xs text-primary-700">
              Latence IA cible &lt; 500ms · Sauvegarde automatique · Export PDF/Notion/Sheets
            </div>
          </div>
        </header>

        <Stepper steps={STEPS} activeStep={activeStep} onStepChange={setActiveStep} />

        <main className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {activeStep === 1 && (
              <ProjectOverviewForm
                data={formData.overview}
                onChange={(value) => updateSection("overview", value)}
              />
            )}
            {activeStep === 2 && (
              <div className="space-y-6">
                <MarketInsightsForm
                  data={formData.market}
                  onChange={(value) => updateSection("market", value)}
                />
                <OfferDetailsForm
                  data={formData.offer}
                  onChange={(value) => updateSection("offer", value)}
                />
              </div>
            )}
            {activeStep === 3 && (
              <div className="space-y-6">
                <OperationsSetupForm
                  data={formData.operations}
                  onChange={(value) => updateSection("operations", value)}
                />
                <FinancialsForm
                  data={formData.financials}
                  onChange={(value) => updateSection("financials", value)}
                />
              </div>
            )}

            <div className="flex flex-wrap justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveStep((step) => Math.max(1, step - 1))}
                disabled={activeStep === 1}
                className="rounded-full border border-[color:var(--border-muted)] px-4 py-2 text-sm font-semibold text-primary-700 disabled:opacity-40"
              >
                ← Étape précédente
              </button>
              <button
                type="button"
                onClick={() => setActiveStep((step) => Math.min(STEPS.length, step + 1))}
                disabled={activeStep === STEPS.length}
                className="rounded-full border border-[color:var(--accent-primary)]/40 px-4 py-2 text-sm font-semibold text-[color:var(--accent-primary)] disabled:opacity-40"
              >
                Étape suivante →
              </button>
            </div>
          </div>

          <PlanPreview data={formData} onGenerate={handleGenerate} isGenerating={isLoading} disabled={!!error} />
        </main>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {plan && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <PlanDisplay plan={plan} input={formData} version={version} aiNotes={aiNotes} />
            <IterationPanel conversation={conversation} onSend={handleIteration} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
