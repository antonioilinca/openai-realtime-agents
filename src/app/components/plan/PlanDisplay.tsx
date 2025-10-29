"use client";

import { useMemo, useState } from "react";
import type { GeneratedPlan, ProjectInput } from "@/app/types";
import {
  exportPlanAsGoogleSheets,
  exportPlanAsMarkdown,
  exportPlanAsPdf,
} from "@/app/lib/exporters";

interface PlanDisplayProps {
  plan: GeneratedPlan;
  input: ProjectInput;
  version: number;
  aiNotes: string;
}

const tabs = [
  { id: "overview", label: "Synthèse" },
  { id: "canvas", label: "Business Model" },
  { id: "swot", label: "SWOT" },
  { id: "timeline", label: "30/60/90" },
  { id: "budget", label: "Budget" },
  { id: "marketing", label: "Marketing" },
  { id: "ai", label: "IA & Prédictions" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function PlanDisplay({ plan, input, version, aiNotes }: PlanDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const canvasPairs = useMemo(
    () => [
      { title: "Partenaires clés", values: plan.businessModel.keyPartners },
      { title: "Activités clés", values: plan.businessModel.keyActivities },
      { title: "Ressources clés", values: plan.businessModel.keyResources },
      { title: "Proposition de valeur", values: plan.businessModel.valuePropositions },
      { title: "Relation client", values: plan.businessModel.customerRelationships },
      { title: "Canaux", values: plan.businessModel.channels },
      { title: "Segments clients", values: plan.businessModel.customerSegments },
      { title: "Structure de coûts", values: plan.businessModel.costStructure },
      { title: "Revenus", values: plan.businessModel.revenueStreams },
    ],
    [plan.businessModel]
  );

  const exportDisabled = plan.businessModel.keyPartners.length === 0;

  return (
    <section className="glass-panel space-y-6 p-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="badge bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]">
              Version {version}
            </span>
            <span className="text-xs text-primary-700">
              Généré le {new Date().toLocaleDateString("fr-FR", { dateStyle: "medium" })}
            </span>
          </div>
          <h2 className="text-2xl font-semibold">Plan d’action personnalisé</h2>
          <p className="max-w-2xl text-sm text-primary-700">
            {aiNotes}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={exportDisabled}
            onClick={() => exportPlanAsPdf(plan, input)}
            className="rounded-2xl border border-[color:var(--accent-primary)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-primary)] shadow-[0_10px_25px_rgba(10,115,225,0.15)] transition hover:bg-[color:var(--accent-primary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Export PDF HD
          </button>
          <button
            type="button"
            disabled={exportDisabled}
            onClick={() => exportPlanAsMarkdown(plan, input)}
            className="rounded-2xl border border-[color:var(--accent-secondary)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-secondary)] shadow-[0_10px_25px_rgba(212,175,55,0.18)] transition hover:bg-[color:var(--accent-secondary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Export Notion
          </button>
          <button
            type="button"
            disabled={exportDisabled}
            onClick={() => exportPlanAsGoogleSheets(plan, input)}
            className="rounded-2xl border border-[color:var(--accent-primary)] bg-white px-4 py-2 text-sm font-semibold text-primary-900 shadow-[0_10px_25px_rgba(15,23,42,0.1)] transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Export Google Sheets
          </button>
        </div>
      </header>

      <nav className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === tab.id ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]" : "border-[color:var(--border-muted)] bg-white text-primary-700 hover:border-[color:var(--accent-primary)]/40"}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="rounded-3xl border border-[color:var(--border-muted)] bg-white/80 p-6 shadow-inner">
        {activeTab === "overview" && <OverviewTab plan={plan} input={input} />}
        {activeTab === "canvas" && <CanvasTab items={canvasPairs} commentary={plan.businessModel.commentary} />}
        {activeTab === "swot" && <SwotTab plan={plan} />}
        {activeTab === "timeline" && <TimelineTab plan={plan} />}
        {activeTab === "budget" && <BudgetTab plan={plan} />}
        {activeTab === "marketing" && <MarketingTab plan={plan} />}
        {activeTab === "ai" && <AiTab plan={plan} />}
      </div>
    </section>
  );
}

function OverviewTab({ plan, input }: { plan: GeneratedPlan; input: ProjectInput }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Vision" value={input.overview.vision} />
        <SummaryCard title="Objectifs" value={input.overview.objectives.map((o) => `${o.horizon} : ${o.label}`).join(" · ") || "À prioriser"} />
        <SummaryCard title="North Star" value={plan.marketing.northStarMetric} />
      </div>
      <p className="text-sm leading-relaxed text-primary-700">{plan.executiveSummary}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <SummaryCard title="Budget" value={`${plan.budget.breakEvenPoint} | ${plan.budget.roiProjection}`} />
        <SummaryCard title="Runway" value={plan.budget.runwayComment} />
      </div>
    </div>
  );
}

function CanvasTab({ items, commentary }: { items: { title: string; values: string[] }[]; commentary: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/60 p-4">
          <h3 className="text-sm font-semibold text-primary-900">{item.title}</h3>
          <ul className="mt-2 space-y-1 text-sm text-primary-700">
            {item.values.map((value, index) => (
              <li key={`${item.title}-${index}`}>• {value}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="md:col-span-3 rounded-2xl border border-[color:var(--accent-primary)]/30 bg-[color:var(--accent-primary)]/5 p-4 text-sm text-primary-900">
        {commentary}
      </div>
    </div>
  );
}

function SwotTab({ plan }: { plan: GeneratedPlan }) {
  const entries = [
    { title: "Forces", values: plan.swot.strengths, tone: "bg-emerald-50 border-emerald-200 text-emerald-900" },
    { title: "Faiblesses", values: plan.swot.weaknesses, tone: "bg-rose-50 border-rose-200 text-rose-900" },
    { title: "Opportunités", values: plan.swot.opportunities, tone: "bg-sky-50 border-sky-200 text-sky-900" },
    { title: "Menaces", values: plan.swot.threats, tone: "bg-amber-50 border-amber-200 text-amber-900" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((entry) => (
        <div
          key={entry.title}
          className={`rounded-2xl border p-4 text-sm shadow-sm ${entry.tone}`}
        >
          <h3 className="text-base font-semibold">{entry.title}</h3>
          <ul className="mt-2 space-y-1">
            {entry.values.map((value, index) => (
              <li key={`${entry.title}-${index}`}>• {value}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="md:col-span-2 rounded-2xl border border-[color:var(--border-muted)] bg-white p-4 text-sm text-primary-700">
        {plan.swot.summary}
      </div>
    </div>
  );
}

function TimelineTab({ plan }: { plan: GeneratedPlan }) {
  return (
    <div className="space-y-6">
      {plan.timeline.map((milestone) => (
        <div
          key={milestone.phase}
          className="grid gap-3 rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/70 p-4 md:grid-cols-5"
        >
          <div className="md:col-span-1">
            <span className="badge bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]">
              {milestone.phase}
            </span>
            <h3 className="mt-2 text-sm font-semibold">{milestone.focus}</h3>
            <p className="text-xs text-primary-700">{milestone.owner}</p>
          </div>
          <div className="md:col-span-2 text-sm text-primary-700">
            <h4 className="font-semibold">Actions clés</h4>
            <ul className="mt-1 space-y-1">
              {milestone.keyActions.map((action, index) => (
                <li key={`action-${milestone.phase}-${index}`}>• {action}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1 text-sm text-primary-700">
            <h4 className="font-semibold">KPI</h4>
            <ul className="mt-1 space-y-1">
              {milestone.successMetrics.map((metric, index) => (
                <li key={`metric-${milestone.phase}-${index}`}>• {metric}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1 text-sm text-primary-700">
            <h4 className="font-semibold">Automatisation</h4>
            <ul className="mt-1 space-y-1">
              {milestone.automationIdeas.map((idea, index) => (
                <li key={`automation-${milestone.phase}-${index}`}>• {idea}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function BudgetTab({ plan }: { plan: GeneratedPlan }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <BudgetSection title="Charges fixes" entries={plan.budget.fixedCosts} />
      <BudgetSection title="Charges variables" entries={plan.budget.variableCosts} />
      <BudgetSection title="Revenus projetés" entries={plan.budget.projectedRevenues} />
      <div className="rounded-2xl border border-[color:var(--accent-primary)]/40 bg-white p-4 text-sm text-primary-700">
        <p>{plan.budget.breakEvenPoint}</p>
        <p>{plan.budget.runwayComment}</p>
        <p>{plan.budget.roiProjection}</p>
        <ul className="mt-2 space-y-1">
          {plan.budget.alerts.map((alert, index) => (
            <li key={`alert-${index}`} className="text-amber-700">
              ⚠️ {alert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MarketingTab({ plan }: { plan: GeneratedPlan }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Acquisition" value={plan.marketing.acquisitionStrategy} />
        <SummaryCard title="Conversion" value={plan.marketing.conversionStrategy} />
        <SummaryCard title="Rétention" value={plan.marketing.retentionStrategy} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plan.marketing.plays.map((play, index) => (
          <div
            key={`${play.channel}-${index}`}
            className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/60 p-4 text-sm text-primary-700"
          >
            <h3 className="text-sm font-semibold text-primary-900">
              Play {index + 1} · {play.channel}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-primary-700/70">
              {play.funnelStage}
            </p>
            <p className="mt-2 text-sm">Audience : {play.audience}</p>
            <p className="text-sm">Promesse : {play.promise}</p>
            <p className="mt-2 text-xs font-semibold text-primary-700/80">Contenus</p>
            <ul className="mt-1 space-y-1 text-xs">
              {play.contentIdeas.map((idea, ideaIndex) => (
                <li key={`content-${index}-${ideaIndex}`}>• {idea}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs font-semibold text-primary-700/80">KPI clés</p>
            <ul className="mt-1 space-y-1 text-xs">
              {play.kpis.map((kpi, kpiIndex) => (
                <li key={`kpi-${index}-${kpiIndex}`}>• {kpi}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs font-semibold text-primary-700/80">Stack</p>
            <ul className="mt-1 space-y-1 text-xs">
              {play.automationStack.map((tool, toolIndex) => (
                <li key={`tool-${index}-${toolIndex}`}>• {tool}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiTab({ plan }: { plan: GeneratedPlan }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/70 p-4 text-sm text-primary-700">
        <h3 className="text-base font-semibold text-primary-900">Quick wins</h3>
        <ul className="mt-2 space-y-1">
          {plan.aiRecommendation.quickWins.map((win, index) => (
            <li key={`win-${index}`}>• {win}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/70 p-4 text-sm text-primary-700">
        <h3 className="text-base font-semibold text-primary-900">Leviers stratégiques</h3>
        <ul className="mt-2 space-y-1">
          {plan.aiRecommendation.strategicLevers.map((lever, index) => (
            <li key={`lever-${index}`}>• {lever}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-[color:var(--border-muted)] bg-white p-4 text-sm text-primary-700">
        <h3 className="text-base font-semibold text-primary-900">Points de vigilance</h3>
        <ul className="mt-2 space-y-1">
          {plan.aiRecommendation.watchpoints.map((item, index) => (
            <li key={`watch-${index}`}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-[color:var(--accent-primary)]/40 bg-[color:var(--accent-primary)]/5 p-4 text-sm text-primary-900">
        <p>{plan.aiRecommendation.prediction90d}</p>
        <p className="mt-2 text-xs uppercase tracking-wide">
          Niveau de confiance : {plan.aiRecommendation.confidence}
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/80 p-4 text-sm text-primary-700">
      <p className="text-xs uppercase tracking-wide text-primary-700/60">{title}</p>
      <p className="mt-2 text-sm text-primary-900">{value}</p>
    </div>
  );
}

function BudgetSection({
  title,
  entries,
}: {
  title: string;
  entries: { label: string; amount: number }[];
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/60 p-4 text-sm text-primary-700">
      <h3 className="text-sm font-semibold text-primary-900">{title}</h3>
      <ul className="mt-2 space-y-1">
        {entries.map((entry, index) => (
          <li key={`${title}-${index}`}>
            • {entry.label} : {entry.amount.toLocaleString("fr-FR")} €
          </li>
        ))}
      </ul>
    </div>
  );
}
