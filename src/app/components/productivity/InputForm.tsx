"use client";

import React from "react";

export interface ProductivityFormState {
  companyName: string;
  industry: string;
  teamSize: string;
  revenue: string;
  challenges: string;
  productivityGoal: string;
}

interface InputFormProps {
  form: ProductivityFormState;
  onChange: (field: keyof ProductivityFormState, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
}

/**
 * Collects the core business context required by the analysis engine. The
 * layout mirrors the UX references (Notion / Sintra) with a card look & feel
 * and inline helper text to guide the user.
 */
export function InputForm({ form, onChange, onSubmit, isLoading, isSubmitDisabled }: InputFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Paramètres entreprise</h2>
          <p className="text-sm text-slate-500">
            Décrivez votre organisation pour générer un plan d&apos;action personnalisé.
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading || isSubmitDisabled}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Analyse en cours..." : "Générer le plan"}
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Nom de l&apos;entreprise
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Acme Corp"
            required
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Secteur d&apos;activité
          <select
            value={form.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="">Sélectionnez un secteur</option>
            <option value="SaaS">SaaS</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Services">Services</option>
            <option value="Autre">Autre</option>
          </select>
        </label>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Taille de l&apos;équipe
          <input
            type="number"
            min={1}
            value={form.teamSize}
            onChange={(e) => onChange("teamSize", e.target.value)}
            className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="50"
            required
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Chiffre d&apos;affaires estimé (€)
          <input
            type="number"
            min={0}
            step="1000"
            value={form.revenue}
            onChange={(e) => onChange("revenue", e.target.value)}
            className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="2500000"
            required
          />
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-slate-700 lg:col-span-2">
          Principaux défis actuels
          <textarea
            value={form.challenges}
            onChange={(e) => onChange("challenges", e.target.value)}
            className="mt-2 min-h-[110px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Retards projets, communication inter-équipes, tâches manuelles..."
            required
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Objectif d&apos;amélioration de productivité (%)
          <input
            type="number"
            min={10}
            max={300}
            value={form.productivityGoal}
            onChange={(e) => onChange("productivityGoal", e.target.value)}
            className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="50"
            required
          />
          <span className="mt-1 text-xs text-slate-400">
            La cible recommandée est entre 20% et 80%. Les objectifs ambitieux seront découpés par phases.
          </span>
        </label>
      </div>
    </form>
  );
}
