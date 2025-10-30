"use client";

import React, { useMemo, useState } from "react";
import { InputForm, ProductivityFormState } from "@/app/components/productivity/InputForm";
import { PlanDashboard } from "@/app/components/productivity/PlanDashboard";
import { ProductivityPlan } from "@/app/lib/productivity/types";

const defaultForm: ProductivityFormState = {
  companyName: "",
  industry: "",
  teamSize: "",
  revenue: "",
  challenges: "",
  productivityGoal: "50",
};

/**
 * Root application component that orchestrates form collection, API calls and
 * result rendering. The design is intentionally light and airy to mimic the
 * modern productivity tools referenced in the brief.
 */
export default function App() {
  const [form, setForm] = useState<ProductivityFormState>(defaultForm);
  const [plan, setPlan] = useState<ProductivityPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ProductivityFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isSubmitDisabled = useMemo(() => {
    return (
      !form.companyName ||
      !form.industry ||
      !form.teamSize ||
      !form.revenue ||
      !form.challenges ||
      !form.productivityGoal
    );
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        companyName: form.companyName,
        industry: form.industry,
        teamSize: Number(form.teamSize),
        revenue: Number(form.revenue),
        challenges: form.challenges,
        productivityGoal: Number(form.productivityGoal),
      };

      if (!Number.isFinite(payload.teamSize) || !Number.isFinite(payload.revenue) || !Number.isFinite(payload.productivityGoal)) {
        throw new Error("Merci de saisir des valeurs numériques valides");
      }

      const response = await fetch("/api/productivity/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.message || "Impossible de générer le plan");
      }

      const data = (await response.json()) as ProductivityPlan;
      setPlan(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!plan) return;
    setIsExporting(true);

    try {
      const response = await fetch("/api/productivity/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.message || "Échec de l&apos;export PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `productivity-plan-${plan.companyName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Erreur inattendue lors de l&apos;export");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-500">Productivity Booster AI</p>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Accélérez +50% de productivité grâce à un plan guidé par l&apos;IA
          </h1>
          <p className="max-w-3xl text-base text-slate-500">
            Saisissez les informations clés de votre entreprise. Notre moteur d&apos;analyse autonome combine vos données internes avec un benchmark sectoriel pour générer un plan d&apos;action structuré, prêt à être partagé.
          </p>
        </header>

        <InputForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isSubmitDisabled={isSubmitDisabled}
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <PlanDashboard plan={plan} onExport={handleExport} isExporting={isExporting} />
      </main>
    </div>
  );
}
