"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronRightIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

import {
  analyzeSituation,
  fetchSources,
  generateDocument,
  generatePlan,
} from "./lib/api";
import type {
  AnalysisResponse,
  DocumentResponse,
  PlanResponse,
  Domain,
} from "./types";
import { Card } from "./ui/Card";
import { StepBadge } from "./ui/StepBadge";
import { StatusPill } from "./ui/StatusPill";
import { cn } from "./ui/cn";

interface WizardFormValues {
  domain: Domain;
  situation: string;
  objectives: string;
  consent: boolean;
}

const steps = [
  { id: "onboarding", label: "Onboarding" },
  { id: "analysis", label: "Analyse & citations" },
  { id: "plan", label: "Plan d'actions" },
  { id: "documents", label: "Modèles & exports" },
];

const templates = [
  {
    id: "mise-en-demeure",
    label: "Mise en demeure",
    description: "Courrier personnalisé rappelant la base légale et les délais."
  },
  {
    id: "lettre-rh",
    label: "Courrier RH",
    description: "Notification structurée au service RH (heures supplémentaires, solde)."
  },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [document, setDocument] = useState<DocumentResponse | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState } = useForm<WizardFormValues>({
    defaultValues: {
      domain: "conso",
      situation: "J'ai acheté un smartphone il y a 2 semaines, il ne fonctionne plus et le vendeur refuse la réparation.",
      objectives: "Obtenir la réparation ou le remboursement sous garantie légale.",
      consent: false,
    },
  });

  const consentChecked = watch("consent");

  const handleAnalyze = handleSubmit(async (data) => {
    setError(null);
    setLoading(true);
    setCurrentStep(0);
    setAnalysis(null);
    setPlan(null);
    setDocument(null);
    setSources([]);
    try {
      const analysisResponse = await analyzeSituation({
        situation: data.situation,
        domain: data.domain,
      });
      setAnalysis(analysisResponse);
      setCurrentStep(1);
      const planResponse = await generatePlan({
        analysisId: analysisResponse.analysis_id,
        goals: data.objectives ? data.objectives.split("\n").filter(Boolean) : [],
      });
      setPlan(planResponse);
      setCurrentStep(2);
      const sourceResponse = await fetchSources(planResponse.plan_id);
      setSources(sourceResponse.items.map((item) => `${item.eli} · ${item.version}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  });

  const handleGenerateDocument = async (templateId: string) => {
    if (!plan || !analysis) return;
    setLoading(true);
    setError(null);
    try {
      const response = await generateDocument({
        planId: plan.plan_id,
        templateId,
        vars: {
          domain: analysis.classification.branch,
          legal_basis: analysis.citations.map((citation) => citation.eli).join(", "),
          subject: watch("objectives") || "Litige en cours",
        },
      });
      setDocument(response);
      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  const completionRate = useMemo(() => {
    if (currentStep === 0) return 0;
    if (currentStep === 1) return 0.33;
    if (currentStep === 2) return 0.66;
    return 1;
  }, [currentStep]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 md:py-12">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="sticky top-24 h-fit" padding="md">
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <StepBadge
                key={step.id}
                index={index + 1}
                label={step.label}
                active={index === currentStep}
                completed={index < currentStep}
              />
            ))}
            <div className="mt-2 h-2 rounded-full bg-surface">
              <motion.div
                className="h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${completionRate * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
            <p className="text-sm text-muted">
              Lexora couvre actuellement la consommation, le logement et le travail. Les réponses sont sourcées avec ELI/NOR.
            </p>
          </div>
        </Card>
        <div className="flex flex-col gap-6">
          <Card>
            <form className="flex flex-col gap-6" onSubmit={handleAnalyze}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted">Domaine</label>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {(
                    [
                      { value: "conso", label: "Consommation" },
                      { value: "logement", label: "Logement" },
                      { value: "travail", label: "Travail" },
                    ] satisfies { value: Domain; label: string }[]
                  ).map((domainOption) => (
                    <label
                      key={domainOption.value}
                      className={cn(
                        "group relative flex cursor-pointer flex-col gap-2 rounded-xl border border-surface/80 bg-background/60 p-4 transition",
                        watch("domain") === domainOption.value && "border-primary/60 bg-primary/10",
                      )}
                    >
                      <input
                        type="radio"
                        value={domainOption.value}
                        {...register("domain")}
                        className="peer sr-only"
                      />
                      <span className="text-base font-semibold text-white">{domainOption.label}</span>
                      <span className="text-sm text-muted">
                        {domainOption.value === "conso" && "Garanties, vices cachés, litiges e-commerce."}
                        {domainOption.value === "logement" && "Dépôt de garantie, charges, congés, décence."}
                        {domainOption.value === "travail" && "Heures sup, documents fin de contrat, harcèlement (info)."}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted" htmlFor="situation">
                  Décrivez votre situation
                </label>
                <textarea
                  id="situation"
                  rows={5}
                  className="w-full rounded-xl border border-surface bg-background/80 p-4 text-sm text-slate-200 placeholder:text-muted focus:border-primary focus:outline-none"
                  {...register("situation", { required: true })}
                  placeholder="Décrivez les faits, les dates, les échanges..."
                />
                {formState.errors.situation && (
                  <span className="text-xs text-danger">La description est obligatoire.</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted" htmlFor="objectives">
                  Vos objectifs
                </label>
                <textarea
                  id="objectives"
                  rows={3}
                  className="w-full rounded-xl border border-surface bg-background/80 p-4 text-sm text-slate-200 placeholder:text-muted focus:border-primary focus:outline-none"
                  {...register("objectives")}
                  placeholder="Ex : obtenir le remboursement, calculer les intérêts de retard, préparer un courrier..."
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-muted">
                <input type="checkbox" {...register("consent", { required: true })} className="mt-1 h-4 w-4" />
                <span>
                  J'autorise Lexora à traiter ces informations pour me fournir une information juridique générale. Je comprends que
                  ce service ne remplace pas un conseil personnalisé.
                </span>
              </label>
              {formState.errors.consent && <span className="text-xs text-danger">Vous devez consentir pour continuer.</span>}

              <div className="flex items-center justify-between gap-4">
                <StatusPill label="RGPD" tone="info" />
                <button
                  type="submit"
                  disabled={!consentChecked || loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lexora transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Analyse en cours..." : "Analyser ma situation"}
                  <ChevronRightIcon className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
            </form>
          </Card>

          <AnimatePresence>{analysis && <AnalysisPanel analysis={analysis} />}</AnimatePresence>
          <AnimatePresence>{plan && <PlanPanel plan={plan} />}</AnimatePresence>
          <AnimatePresence>
            {plan && (
              <DocumentsPanel
                onGenerate={handleGenerateDocument}
                document={document}
                sources={sources}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AnalysisPanel({ analysis }: { analysis: AnalysisResponse }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <StatusPill label="Analyse générée" tone="success" />
              <span className="text-sm text-muted">Confiance : {(analysis.confidence * 100).toFixed(0)}%</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Synthèse juridico-factuelle</h2>
            <p className="text-sm leading-relaxed text-slate-300">{analysis.summary}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background/60" padding="md">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Classification</h3>
              <p className="mt-2 text-lg font-semibold text-white">{analysis.classification.branch}</p>
              <p className="text-sm text-muted">{analysis.classification.sub_branch}</p>
              {analysis.classification.clarifying_questions.length > 0 && (
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  <p className="font-medium text-muted">Questions de clarification :</p>
                  <ul className="list-disc space-y-1 pl-5">
                    {analysis.classification.clarifying_questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
            <Card className="bg-background/60" padding="md">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Citations</h3>
              <ul className="mt-3 space-y-3 text-sm">
                {analysis.citations.map((citation) => (
                  <li key={citation.eli} className="rounded-xl border border-surface/60 bg-surface/60 p-3">
                    <p className="font-semibold text-white">{citation.eli}</p>
                    <p className="text-xs text-muted">Version : {citation.version ?? "N/A"}</p>
                    <a
                      href={citation.url}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Consulter sur Légifrance
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}

function PlanPanel({ plan }: { plan: PlanResponse }) {
  const nextDeadline =
    typeof plan.kpis["next_deadline"] === "string" ? (plan.kpis["next_deadline"] as string) : "À déterminer";
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <StatusPill label="Checklist actionnable" tone="info" />
              <h2 className="mt-2 text-2xl font-semibold text-white">Plan d'actions</h2>
            </div>
            <div className="text-right text-sm text-muted">
              <p>Prochaine échéance : {nextDeadline}</p>
              <p>Autorités impliquées : {plan.authorities.join(", ") || "À confirmer"}</p>
            </div>
          </div>
          <ol className="space-y-4">
            {plan.steps.map((step) => (
              <li key={step.step} className="rounded-xl border border-surface/60 bg-background/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{step.step}</p>
                    <p className="mt-1 text-sm text-slate-300">Base légale : {step.legal_basis.join(", ")}</p>
                    {step.required_docs.length > 0 && (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                        Pièces : {step.required_docs.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right text-xs text-muted">
                    {step.deadline && <span>Échéance : {step.deadline}</span>}
                    {step.authority && <span>Autorité : {step.authority}</span>}
                    {step.cost && <span>Coût : {step.cost}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Card>
    </motion.section>
  );
}

interface DocumentsPanelProps {
  onGenerate: (templateId: string) => Promise<void>;
  document: DocumentResponse | null;
  sources: string[];
  loading: boolean;
}

function DocumentsPanel({ onGenerate, document, sources, loading }: DocumentsPanelProps) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <StatusPill label="Documents prêts" tone="success" />
              <h2 className="mt-2 text-2xl font-semibold text-white">Modèles & export PDF</h2>
            </div>
            {document && (
              <a
                href={document.pdfUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
              >
                Télécharger le PDF
                <DocumentTextIcon className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => onGenerate(template.id)}
                disabled={loading}
                className="flex h-full flex-col gap-3 rounded-xl border border-surface/60 bg-background/60 p-4 text-left transition hover:border-primary/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center gap-2 text-primary">
                  <CheckIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]">Template</span>
                </div>
                <p className="text-lg font-semibold text-white">{template.label}</p>
                <p className="text-sm text-slate-300">{template.description}</p>
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Sources & versions</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {sources.map((source) => (
                <li key={source} className="rounded-xl border border-surface/60 bg-surface/60 p-3">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
