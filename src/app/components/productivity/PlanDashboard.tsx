"use client";

import React from "react";
import { ProductivityPlan } from "@/app/lib/productivity/types";
import { KpiChart } from "./KpiChart";

interface PlanDashboardProps {
  plan: ProductivityPlan | null;
  onExport: () => void;
  isExporting: boolean;
}

/**
 * Renders the full Productivity Booster AI dashboard once a plan has been
 * generated. Content is split into cards and grids to stay scannable for busy
 * executives.
 */
export function PlanDashboard({ plan, onExport, isExporting }: PlanDashboardProps) {
  if (!plan) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center shadow-inner">
        <h3 className="text-lg font-semibold text-slate-700">
          Lancez une analyse pour découvrir vos leviers de productivité.
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Remplissez le formulaire ci-dessus avec vos informations business. L&apos;IA produira un diagnostic complet et un plan d&apos;action exportable en PDF.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-500">Plan d&apos;action généré</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {plan.companyName} • {plan.industry}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Synthèse générée le {new Date(plan.generatedAt).toLocaleString("fr-FR")}
          </p>
        </div>
        <button
          onClick={onExport}
          disabled={isExporting}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isExporting ? "Préparation du PDF..." : "Exporter en PDF"}
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card title="Analyse interne">
            <ListSection title="Forces" items={plan.internalAnalysis.strengths} />
            <ListSection title="Faiblesses" items={plan.internalAnalysis.weaknesses} />
            <ListSection title="Leviers prioritaires" items={plan.internalAnalysis.improvementLevers} />
            {plan.internalAnalysis.riskAlerts.length > 0 && (
              <ListSection title="Alertes risques" items={plan.internalAnalysis.riskAlerts} />
            )}
          </Card>

          <Card title="Recommandations stratégiques">
            <div className="space-y-4">
              {plan.strategicInitiatives.map((initiative, index) => (
                <div key={initiative.title} className="rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-slate-900">
                      {index + 1}. {initiative.title}
                    </h4>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      Impact {initiative.impact} • Effort {initiative.effort}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{initiative.description}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Responsable : {initiative.owner}
                  </p>
                  <p className="text-sm text-slate-500">KPI suivi : {initiative.kpi}</p>
                  <p className="text-sm text-slate-500">Échéance : {initiative.timeline}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Étude de marché">
            <p className="text-sm text-slate-600">{plan.marketAnalysis.summary}</p>
            <div className="mt-4 space-y-4">
              {plan.marketAnalysis.competitorInsights.map((competitor) => (
                <div key={competitor.name} className="rounded-xl bg-blue-50/70 p-4">
                  <h4 className="text-sm font-semibold text-blue-700">{competitor.name}</h4>
                  <p className="text-xs uppercase tracking-wide text-blue-500">{competitor.positioning}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    <strong>Différenciation :</strong> {competitor.differentiator}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Action clé :</strong> {competitor.priorityAction}
                  </p>
                </div>
              ))}
            </div>
            <ListSection title="Opportunités" items={plan.marketAnalysis.opportunitySignals} />
          </Card>

          <KpiChart data={plan.productivityTimeline} />

          <Card title="KPIs projetés">
            <div className="space-y-3">
              {plan.kpiProjections.map((kpi) => (
                <div key={kpi.metric} className="rounded-xl border border-slate-200 bg-white/70 p-3">
                  <p className="text-sm font-semibold text-slate-900">{kpi.metric}</p>
                  <p className="text-xs text-slate-500">
                    Baseline {kpi.baseline} → Projection {kpi.projected}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{kpi.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Card title="Plan d&apos;action 30 jours">
        <div className="grid gap-4 md:grid-cols-3">
          {plan.thirtyDayPlan.map((item) => (
            <div key={item.dayRange} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-blue-500">{item.dayRange}</p>
              <h4 className="mt-2 text-base font-semibold text-slate-900">{item.objective}</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {item.actions.map((action) => (
                  <li key={action} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Conclusion">
        <p className="text-sm text-slate-600">{plan.summary}</p>
      </Card>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => (
  <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <div className="mt-4 space-y-4 text-sm text-slate-600">{children}</div>
  </section>
);

interface ListSectionProps {
  title: string;
  items: string[];
}

const ListSection = ({ title, items }: ListSectionProps) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
    <ul className="mt-2 space-y-2 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
