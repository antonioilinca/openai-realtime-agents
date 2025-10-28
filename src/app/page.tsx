"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import { jsPDF } from "jspdf";

import {
  BlueprintInputs,
  BlueprintPlan,
  generateBlueprint,
  formatCurrency,
} from "./lib/generateBlueprint";

const channelOptions = [
  { value: "email", label: "Email marketing" },
  { value: "social", label: "Réseaux sociaux" },
  { value: "seo", label: "SEO & contenu" },
  { value: "events", label: "Évènements / webinaires" },
  { value: "paid", label: "Publicité en ligne" },
  { value: "affiliates", label: "Affiliation & partenariats" },
];

const initialInputs: BlueprintInputs = {
  companyName: "",
  founderName: "",
  sector: "",
  businessStage: "lancement",
  objective: "lancer",
  budget: 6000,
  targetAudience: "",
  valueProposition: "",
  teamSize: "petite",
  preferredChannels: ["social", "email"],
  automationPriority: "moyenne",
  painPoints: "",
  strengths: "",
};

export default function Page() {
  const [step, setStep] = useState<"landing" | "form" | "plan">("landing");
  const [inputs, setInputs] = useState<BlueprintInputs>(initialInputs);
  const [generatedPlan, setGeneratedPlan] = useState<BlueprintPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const allowGeneration = useMemo(() => {
    return (
      inputs.companyName.trim().length > 1 &&
      inputs.sector.trim().length > 1 &&
      inputs.targetAudience.trim().length > 3 &&
      inputs.valueProposition.trim().length > 3 &&
      inputs.painPoints.trim().length > 3 &&
      inputs.strengths.trim().length > 3
    );
  }, [inputs]);

  const handleChange = (
    field: keyof BlueprintInputs,
    value: BlueprintInputs[keyof BlueprintInputs],
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleChannel = (channel: string) => {
    setInputs((prev) => {
      const already = prev.preferredChannels.includes(channel);
      return {
        ...prev,
        preferredChannels: already
          ? prev.preferredChannels.filter((c) => c !== channel)
          : [...prev.preferredChannels, channel],
      };
    });
  };

  const handleSubmit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateBlueprint(inputs);
      setGeneratedPlan(plan);
      setIsGenerating(false);
      setStep("plan");
    }, 320);
  };

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (!generatedPlan) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 48;
    const marginY = 60;
    let cursorY = marginY;

    const drawSection = (title: string, content: string[]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const splitted = doc.splitTextToSize(title, 500);
      doc.text(splitted, marginX, cursorY);
      cursorY += splitted.length * 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      content.forEach((line) => {
        const processed = doc.splitTextToSize(line, 500);
        if (cursorY + processed.length * 14 > doc.internal.pageSize.getHeight() - marginY) {
          doc.addPage();
          cursorY = marginY;
        }
        doc.text(processed, marginX, cursorY);
        cursorY += processed.length * 14 + 6;
      });
      cursorY += 4;
      if (cursorY > doc.internal.pageSize.getHeight() - marginY) {
        doc.addPage();
        cursorY = marginY;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(
      `Business Launch Blueprint – ${inputs.companyName || "Projet"}`,
      marginX,
      cursorY,
    );
    cursorY += 28;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Généré le ${generatedPlan.generatedAt}`, marginX, cursorY);
    cursorY += 24;

    drawSection("Synthèse exécutive", [generatedPlan.summary]);
    drawSection("Résultats attendus", generatedPlan.keyResults);

    const businessModelContent = generatedPlan.businessModel.flatMap((section) => [
      `${section.title.toUpperCase()}: ${section.description}`,
      ...section.bullets.map((b) => `• ${b}`),
    ]);
    drawSection("Business model", businessModelContent);

    const planContent = generatedPlan.actionPlan.flatMap((week) => [
      `${week.week} – ${week.focus} (Priorité ${week.priority})`,
      "Actions :",
      ...week.actions.map((a) => `• ${a}`),
      "Livrables :",
      ...week.deliverables.map((d) => `• ${d}`),
      "KPIs :",
      ...week.successMetrics.map((k) => `• ${k}`),
    ]);
    drawSection("Plan d'action 30 jours", planContent);

    const budgetLines = [
      ...generatedPlan.budget.investment.map(
        (line) =>
          `${line.label} – ${formatCurrency(line.amount)} (${line.frequency === "unique" ? "Dépense unique" : ""}) : ${line.details}`,
      ),
      ...generatedPlan.budget.operations.map(
        (line) =>
          `${line.label} – ${formatCurrency(line.amount)} / mois : ${line.details}`,
      ),
      `Garde-fous : ${generatedPlan.budget.guardrails.join(" | ")}`,
      generatedPlan.budget.commentary,
    ];
    drawSection("Budget prévisionnel", budgetLines);

    const automationLines = [
      ...generatedPlan.automation.stack.map(
        (stack) => `${stack.category} : ${stack.tools.join(", ")} – ${stack.notes}`,
      ),
      "Workflows prioritaires :",
      ...generatedPlan.automation.workflows.map((wf) => `• ${wf}`),
      "Campagnes :",
      ...generatedPlan.automation.campaigns.map((c) => `• ${c}`),
      "KPIs :",
      ...generatedPlan.automation.kpis.map((kpi) => `• ${kpi}`),
    ];
    drawSection("Automatisation & marketing", automationLines);

    const growthLines = [
      "Différenciation :",
      ...generatedPlan.growth.differentiators.map((d) => `• ${d}`),
      "Feuille de route :",
      ...generatedPlan.growth.roadmap.map(
        (init) => `• ${init.title} : ${init.description} (Impact : ${init.expectedImpact})`,
      ),
      "Gestion des risques :",
      ...generatedPlan.growth.riskMitigation.map((r) => `• ${r}`),
    ];
    drawSection("Plan de croissance", growthLines);

    doc.save(`business-launch-blueprint-${inputs.companyName || "projet"}.pdf`);
  };

  const handleExportMarkdown = () => {
    if (!generatedPlan) return;
    downloadFile(
      `blueprint-${inputs.companyName || "projet"}.md`,
      generatedPlan.exportPayload.markdown,
      "text/markdown;charset=utf-8",
    );
  };

  const handleExportCsv = () => {
    if (!generatedPlan) return;
    downloadFile(
      `budget-et-plan-${inputs.companyName || "projet"}.csv`,
      generatedPlan.exportPayload.csv,
      "text/csv;charset=utf-8",
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        {step === "landing" && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-slate-900 p-12 text-slate-50 shadow-2xl">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-slate-900/40 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-6">
              <span className="w-fit rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest">
                Business Launch Blueprint
              </span>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                L’assistant stratégique qui transforme vos idées en plan d’action prêt à déployer.
              </h1>
              <p className="max-w-2xl text-lg text-slate-100/90">
                Collectez les informations essentielles de votre projet, générez automatiquement un business model, un plan de lancement sur 30 jours, un budget prévisionnel et un playbook marketing & automatisation. Exportez le tout en PDF, Notion ou Google Sheets en un clic.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setStep("form")}
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-purple-700/30 transition-transform hover:-translate-y-0.5 hover:shadow-purple-500/50"
                >
                  Commencer
                </button>
                <div className="flex flex-col text-sm text-slate-100/80">
                  <span>✔️ Plan professionnel prêt à présenter à des investisseurs</span>
                  <span>✔️ Recommandations marketing & automation personnalisées</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === "form" && (
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <div className="mb-10 flex flex-col gap-2">
              <h2 className="text-3xl font-semibold text-slate-50">1. Collecte intelligente</h2>
              <p className="text-slate-300">
                Répondez à ces questions clés pour générer un plan taillé sur mesure. Chaque réponse alimente directement le business model, le plan d’action et les recommandations budgétaires.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                label="Nom du projet / entreprise"
                placeholder="Ex. Nova Consulting"
                value={inputs.companyName}
                onChange={(value) => handleChange("companyName", value)}
              />
              <Field
                label="Fondateur / Responsable"
                placeholder="Ex. Clara Dupont"
                value={inputs.founderName}
                onChange={(value) => handleChange("founderName", value)}
              />
              <Field
                label="Secteur principal"
                placeholder="Ex. Conseil en transformation digitale"
                value={inputs.sector}
                onChange={(value) => handleChange("sector", value)}
              />
              <Field
                label="Cible prioritaire"
                placeholder="Décrivez rapidement vos clients idéaux"
                value={inputs.targetAudience}
                onChange={(value) => handleChange("targetAudience", value)}
              />
              <Field
                label="Proposition de valeur"
                placeholder="Quelle promesse concrète faites-vous ?"
                value={inputs.valueProposition}
                onChange={(value) => handleChange("valueProposition", value)}
                textarea
              />
              <Field
                label="Douleurs clients à résoudre"
                placeholder="Quels problèmes votre offre élimine-t-elle ?"
                value={inputs.painPoints}
                onChange={(value) => handleChange("painPoints", value)}
                textarea
              />
              <Field
                label="Forces / avantages compétitifs"
                placeholder="Expertise, réseau, technologie, méthodologie..."
                value={inputs.strengths}
                onChange={(value) => handleChange("strengths", value)}
                textarea
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-200">Budget disponible (€/mois)</label>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-400"
                  value={inputs.budget}
                  onChange={(event) => handleChange("budget", Number(event.target.value))}
                />
                <span className="text-xs text-slate-400">
                  Utilisé pour calibrer le budget prévisionnel et les hypothèses d’acquisition.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-200">Stade du projet</label>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-400"
                  value={inputs.businessStage}
                  onChange={(event) =>
                    handleChange(
                      "businessStage",
                      event.target.value as BlueprintInputs["businessStage"],
                    )
                  }
                >
                  <option value="idee">Idée validée / MVP</option>
                  <option value="lancement">Lancement en cours</option>
                  <option value="croissance">Croissance & scale</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-200">Objectif prioritaire</label>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-400"
                  value={inputs.objective}
                  onChange={(event) =>
                    handleChange("objective", event.target.value as BlueprintInputs["objective"])
                  }
                >
                  <option value="valider">Valider le marché</option>
                  <option value="lancer">Lancer et signer les premiers clients</option>
                  <option value="acquerir">Accélérer l’acquisition</option>
                  <option value="optimiser">Optimiser la rentabilité</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-200">Taille d’équipe actuelle</label>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-400"
                  value={inputs.teamSize}
                  onChange={(event) =>
                    handleChange("teamSize", event.target.value as BlueprintInputs["teamSize"])
                  }
                >
                  <option value="solo">Solopreneur / Freelance</option>
                  <option value="petite">Équipe 2-5 personnes</option>
                  <option value="moyenne">Équipe 6-10 personnes</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-200">Priorité d’automatisation</label>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-400"
                  value={inputs.automationPriority}
                  onChange={(event) =>
                    handleChange(
                      "automationPriority",
                      event.target.value as BlueprintInputs["automationPriority"],
                    )
                  }
                >
                  <option value="faible">Essentielle uniquement</option>
                  <option value="moyenne">Équilibre marketing & interne</option>
                  <option value="elevee">Automatisation avancée</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-200">
                  Canaux d’acquisition prioritaires
                </span>
                <div className="flex flex-wrap gap-3">
                  {channelOptions.map((channel) => {
                    const active = inputs.preferredChannels.includes(channel.value);
                    return (
                      <button
                        key={channel.value}
                        onClick={() => toggleChannel(channel.value)}
                        type="button"
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                          active
                            ? "border-purple-400 bg-purple-500/20 text-purple-100 shadow-lg shadow-purple-500/20"
                            : "border-white/10 bg-white/5 text-slate-200 hover:border-purple-400 hover:text-purple-100"
                        }`}
                      >
                        {channel.label}
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-slate-400">
                  Choisissez 2-3 canaux pour concentrer vos efforts durant les 30 premiers jours.
                </span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setStep("landing")}
                className="text-sm text-slate-400 transition hover:text-slate-200"
              >
                ← Retour à l’accueil
              </button>
              <button
                disabled={!allowGeneration || isGenerating}
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-700/30 transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {isGenerating ? "Génération en cours..." : "Générer le plan sur mesure"}
              </button>
            </div>
          </section>
        )}

        {step === "plan" && generatedPlan && (
          <section className="flex flex-col gap-12">
            <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-indigo-500/10 backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-50">
                    {generatedPlan.headline}
                  </h2>
                  <p className="mt-2 max-w-2xl text-slate-300">{generatedPlan.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {generatedPlan.keyResults.map((kr) => (
                      <span
                        key={kr}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100"
                      >
                        {kr}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/40"
                  >
                    <DownloadIcon /> Exporter en PDF
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-purple-400"
                  >
                    <DownloadIcon /> Export Notion (Markdown)
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-purple-400"
                  >
                    <DownloadIcon /> Export Google Sheets (CSV)
                  </button>
                </div>
              </div>
            </header>

            <nav className="grid gap-4 md:grid-cols-4">
              {["Business model", "Plan 30 jours", "Budget", "Croissance"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 text-sm text-slate-200 shadow-lg shadow-black/20"
                >
                  <p className="font-semibold text-slate-100">{label}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Accès direct via le sommaire ou en scrollant l’interface.
                  </p>
                </div>
              ))}
            </nav>

            <div className="grid gap-10">
              <SectionCard title="2. Business model personnalisé" id="business-model">
                <div className="grid gap-6 md:grid-cols-2">
                  {generatedPlan.businessModel.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-lg shadow-black/20"
                    >
                      <h3 className="text-lg font-semibold text-slate-100">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{section.description}</p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-200">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-purple-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="3. Plan de lancement sur 30 jours" id="plan-30-jours">
                <div className="grid gap-6 md:grid-cols-2">
                  {generatedPlan.actionPlan.map((week) => (
                    <div
                      key={week.week}
                      className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-lg shadow-black/30"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm uppercase tracking-wide text-purple-300">
                            {week.week}
                          </p>
                          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-100">
                            Priorité {week.priority}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-slate-100">
                          {week.focus}
                        </h3>
                        <div className="mt-4 space-y-3 text-sm text-slate-200">
                          <DetailList title="Actions" items={week.actions} />
                          <DetailList title="Livrables" items={week.deliverables} />
                          <DetailList title="KPIs" items={week.successMetrics} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="4. Budget prévisionnel & garde-fous" id="budget">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                    <h3 className="text-lg font-semibold text-slate-100">
                      Investissements initiaux
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {generatedPlan.budget.investment.map((line) => (
                        <li key={line.label} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-100">{line.label}</span>
                            <span className="text-purple-200">{formatCurrency(line.amount)}</span>
                          </div>
                          <p className="text-xs text-slate-400">{line.details}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                    <h3 className="text-lg font-semibold text-slate-100">Charges opérationnelles</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {generatedPlan.budget.operations.map((line) => (
                        <li key={line.label} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-100">{line.label}</span>
                            <span className="text-purple-200">{formatCurrency(line.amount)}/mois</span>
                          </div>
                          <p className="text-xs text-slate-400">{line.details}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-100">
                      Garde-fous financiers & recommandations
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">{generatedPlan.budget.commentary}</p>
                    <ul className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-3">
                      {generatedPlan.budget.guardrails.map((guardrail) => (
                        <li key={guardrail} className="rounded-xl bg-white/5 px-4 py-3 text-slate-100">
                          {guardrail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="5. Automatisation & marketing digital" id="automation">
                <div className="grid gap-6 md:grid-cols-2">
                  {generatedPlan.automation.stack.map((stack) => (
                    <div
                      key={stack.category}
                      className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
                    >
                      <h3 className="text-lg font-semibold text-slate-100">
                        {stack.category}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{stack.notes}</p>
                      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-purple-100">
                        {stack.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-purple-500/20 px-3 py-1"
                          >
                            {tool}
                          </span>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                    <DetailList title="Workflows prioritaires" items={generatedPlan.automation.workflows} />
                    <DetailList title="Campagnes" items={generatedPlan.automation.campaigns} />
                    <DetailList title="KPIs" items={generatedPlan.automation.kpis} />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="6. Plan de croissance & différenciation" id="growth">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                    <h3 className="text-lg font-semibold text-slate-100">Différenciateurs clés</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {generatedPlan.growth.differentiators.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                    <h3 className="text-lg font-semibold text-slate-100">Gestion des risques</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {generatedPlan.growth.riskMitigation.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-100">Feuille de route croissance</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {generatedPlan.growth.roadmap.map((item) => (
                        <div key={item.title} className="rounded-xl bg-white/5 p-4 text-sm text-slate-100">
                          <p className="text-sm font-semibold text-purple-100">{item.title}</p>
                          <p className="mt-2 text-xs text-slate-200">{item.description}</p>
                          <p className="mt-3 text-xs text-slate-400">Impact : {item.expectedImpact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="7. Exports & prochain pas" id="exports">
                <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
                  <p className="text-sm text-slate-300">
                    Téléchargez votre plan pour l’intégrer dans vos outils de pilotage. Les exports incluent le budget, les actions détaillées et les KPI pour faciliter le partage avec votre équipe, vos investisseurs ou votre incubateur.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/40"
                    >
                      <DownloadIcon /> PDF premium
                    </button>
                    <button
                      onClick={handleExportMarkdown}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-purple-400"
                    >
                      <DownloadIcon /> Notion (Markdown)
                    </button>
                    <button
                      onClick={handleExportCsv}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-purple-400"
                    >
                      <DownloadIcon /> Google Sheets (CSV)
                    </button>
                  </div>
                  <div className="mt-6 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="font-semibold text-purple-100">Checklist investisseur</p>
                      <p className="mt-1 text-xs text-slate-300">
                        Résumé exécutif + KPI + budget immédiatement disponibles.
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="font-semibold text-purple-100">Pilotage hebdomadaire</p>
                      <p className="mt-1 text-xs text-slate-300">Plan 30 jours structuré par priorités et livrables.</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="font-semibold text-purple-100">Activation marketing</p>
                      <p className="mt-1 text-xs text-slate-300">Stack outils + workflows automatisés prêts à déployer.</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
}

function Field({ label, value, onChange, placeholder, textarea }: FieldProps) {
  const commonClasses =
    "rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-purple-400";
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          className={`${commonClasses} resize-none`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={commonClasses}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  id?: string;
  children: ReactNode;
}

function SectionCard({ title, id, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 shadow-2xl shadow-indigo-500/10 backdrop-blur"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-slate-50">{title}</h2>
        {children}
      </div>
    </section>
  );
}

interface DetailListProps {
  title: string;
  items: string[];
}

function DetailList({ title, items }: DetailListProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <ul className="mt-2 space-y-2 text-sm text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-purple-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
