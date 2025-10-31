"use client";

/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { useMemo, useState } from "react";

const techniqueDetails: Record<string, { title: string; description: string; checklist: string[]; }> = {
  "Cadre": {
    title: "Cadre et objectif",
    description:
      "Commencez par préciser le rôle de l'assistant, son public et les livrables attendus. Un cadrage solide réduit l'ambiguïté et les réponses approximatives.",
    checklist: [
      "Décrivez le public cible et le niveau de langage attendu",
      "Mentionnez la mission exacte de l'assistant",
      "Indiquez les formats de sortie acceptables (liste, tableau, JSON, email, etc.)",
    ],
  },
  "Contexte": {
    title: "Contexte riche",
    description:
      "Ajoutez des informations concrètes : objectifs métiers, contraintes temporelles, données d'entrée et ressources autorisées.",
    checklist: [
      "Intégrez les données pertinentes (documents, chiffres, liens)",
      "Soulignez les contraintes (temps, budget, ton, interdits)",
      "Référencez des exemples de sortie réussis",
    ],
  },
  "Commande": {
    title: "Commande explicite",
    description:
      "Formulez l'action à accomplir sous forme de tâches séquencées. Utilisez l'impératif pour guider précisément le modèle.",
    checklist: [
      "Découpez la tâche en étapes logiques",
      "Indiquez la structure souhaitée (titres, puces, sections)",
      "Demandez un contrôle qualité avant la réponse finale",
    ],
  },
  "Contrôle": {
    title: "Contrôle et itération",
    description:
      "Prévoyez des critères d'évaluation, des tests ou une boucle de réécriture automatique pour améliorer continuellement le résultat.",
    checklist: [
      "Ajoutez des critères de réussite mesurables",
      "Demandez une auto-évaluation ou un résumé de validation",
      "Proposez une itération optionnelle en fonction du feedback",
    ],
  },
};

const frameworks = [
  {
    id: "SPACE",
    name: "Cadre SPACE",
    summary: "Situation, Purpose, Actions, Constraints, Evaluation.",
    items: [
      "Situation : décrire le contexte et les données initiales",
      "Purpose : préciser le pourquoi du prompt",
      "Actions : détailler les étapes d'exécution attendues",
      "Constraints : énumérer les limites et interdits",
      "Evaluation : définir le format de contrôle qualité",
    ],
  },
  {
    id: "CERCLE",
    name: "Cadre CERCLE",
    summary: "Contexte, Exemple, Rôle, Contraintes, Livrable, Évaluation.",
    items: [
      "Contexte : background métier et objectifs",
      "Exemple : montrer ce qu'est une bonne sortie",
      "Rôle : spécifier la casquette de l'IA",
      "Contraintes : ton, longueur, interdits",
      "Livrable : format final attendu",
      "Évaluation : check-list d'auto-contrôle",
    ],
  },
  {
    id: "TARGET",
    name: "Cadre TARGET",
    summary: "Task, Audience, Rules, Guidance, Evaluation, Tone.",
    items: [
      "Task : action principale",
      "Audience : niveau et attentes de l'utilisateur final",
      "Rules : politiques et limites à respecter",
      "Guidance : astuces, méthodes, exemples",
      "Evaluation : tests ou critères de validation",
      "Tone : voix narrative et style",
    ],
  },
];

const guardrailOptions = [
  {
    id: "bias",
    label: "Vérifier les biais et la neutralité",
    helper: "Demandez à l'IA de signaler les affirmations potentiellement sensibles ou discriminantes.",
  },
  {
    id: "sources",
    label: "Exiger des sources ou références",
    helper: "Indiquez le type de sources fiables (rapports, publications, URLs internes).",
  },
  {
    id: "format",
    label: "Forcer un format JSON strict",
    helper: "Spécifiez la clé racine, les champs obligatoires et les validations attendues.",
  },
  {
    id: "tone",
    label: "Maintenir un ton précis",
    helper: "Imposez un ton pédagogique, enthousiaste ou factuel selon l'usage.",
  },
];

const faqItems = [
  {
    question: "Quelle est la différence entre prompt engineering et context engineering ?",
    answer:
      "Le prompt engineering se concentre sur la structure et les instructions données à l'IA, tandis que le context engineering optimise les données et les métadonnées fournies pour augmenter la pertinence des réponses.",
  },
  {
    question: "Pourquoi utiliser des formats JSON pour vos prompts ?",
    answer:
      "Les formats JSON facilitent l'intégration avec vos applications, garantissent un schéma stable et simplifient la validation automatique des sorties.",
  },
  {
    question: "Comment évaluer la qualité d'un prompt ?",
    answer:
      "Mesurez la cohérence, la complétude, le respect des contraintes, la créativité contrôlée et la capacité à se généraliser à d'autres cas.",
  },
  {
    question: "Faut-il toujours fournir des exemples ?",
    answer:
      "Des exemples représentatifs améliorent nettement les performances, mais veillez à les adapter pour éviter des biais ou la répétition mot à mot.",
  },
];

export default function LandingPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>("Cadre");
  const [selectedFramework, setSelectedFramework] = useState<string>(frameworks[1].id);
  const [objective, setObjective] = useState("Former une équipe produit à l'écriture de prompts efficaces");
  const [audienceLevel, setAudienceLevel] = useState("Débutants curieux");
  const [tone, setTone] = useState("Pédagogique et engageant");
  const [constraints, setConstraints] = useState("Atelier de 45 minutes, livrable PDF");
  const [jsonMode, setJsonMode] = useState(true);
  const [evaluationMode, setEvaluationMode] = useState(true);
  const [activeGuardrails, setActiveGuardrails] = useState<string[]>(["format", "sources"]);
  const [activeFaq, setActiveFaq] = useState<string | null>(faqItems[0].question);

  const composedPrompt = useMemo(() => {
    const guardrailSentence = activeGuardrails.length
      ? `\n- Respecte également : ${activeGuardrails
          .map((id) => guardrailOptions.find((item) => item.id === id)?.label.toLowerCase())
          .filter(Boolean)
          .join(", ")}.`
      : "";

    return `Tu es un coach spécialisé en intelligence artificielle. Ta mission : ${objective}.\nPublic visé : ${audienceLevel}.\nContexte : ${constraints}.\nTon : ${tone}.\nDémarche : détaille les étapes, propose des exercices pratiques et termine par une checklist d'auto-évaluation.${guardrailSentence}`;
  }, [objective, audienceLevel, tone, constraints, activeGuardrails]);

  const jsonPrompt = useMemo(() => {
    const payload: Record<string, unknown> = {
      role: "coach_IA",
      goal: objective,
      audience: audienceLevel,
      tone,
      deliverables: ["plan_atelier", "checklist", "mini-exercices"],
      constraints: constraints.split(",").map((item) => item.trim()).filter(Boolean),
    };

    if (jsonMode) {
      payload.output_schema = {
        type: "object",
        required: ["introduction", "modules", "atelier_final"],
        properties: {
          introduction: { type: "string" },
          modules: {
            type: "array",
            minItems: 3,
            items: {
              type: "object",
              required: ["titre", "objectif", "activite", "ressources"],
              properties: {
                titre: { type: "string" },
                objectif: { type: "string" },
                activite: { type: "string" },
                ressources: { type: "array", items: { type: "string" } },
              },
            },
          },
          atelier_final: { type: "string" },
        },
      };
    }

    if (evaluationMode) {
      payload.quality_checks = [
        "Comparer la difficulté des exercices avec le niveau du public",
        "Vérifier que chaque module inclut un exemple concret",
        "Confirmer que le ton reste pédagogique et motivant",
      ];
    }

    return JSON.stringify(payload, null, 2);
  }, [objective, audienceLevel, tone, constraints, jsonMode, evaluationMode]);

  const toggleGuardrail = (id: string) => {
    setActiveGuardrails((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 left-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-cyan-400 text-slate-950 shadow-lg">
            IA
          </span>
          <div className="flex flex-col">
            <span>Atelier Prompt Mastery</span>
            <span className="text-xs font-normal text-slate-300">
              Apprendre à guider l'intelligence artificielle
            </span>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <a href="#frameworks" className="transition hover:text-white">
            Frameworks
          </a>
          <a href="#builder" className="transition hover:text-white">
            Atelier interactif
          </a>
          <a href="#json" className="transition hover:text-white">
            Prompt JSON
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </nav>
        <Link
          href="/realtime"
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/20"
        >
          Tester un agent en direct
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-800/40 px-8 py-16 shadow-2xl">
          <div className="absolute inset-y-0 right-8 hidden w-1/2 rounded-[48px] bg-gradient-to-br from-purple-400/20 via-blue-400/10 to-cyan-400/20 blur-3xl lg:block" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-wider text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Programme intensif 2025
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Apprenez à piloter l'intelligence artificielle grâce au prompt et context engineering.
              </h1>
              <p className="text-lg text-slate-200">
                Comprenez les mécaniques des modèles, structurez vos instructions, orchestrez des contextes riches et créez des expériences augmentées. Des exemples concrets, des canevas prêts à l'emploi et des exercices interactifs pour progresser rapidement.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#builder"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl transition hover:brightness-105"
                >
                  Construire un prompt complet
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Découvrir le parcours
                </a>
              </div>
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-400">Prompts analysés</dt>
                  <dd className="text-2xl font-semibold text-white">+320</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-400">Cas d'usage documentés</dt>
                  <dd className="text-2xl font-semibold text-white">45 secteurs</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-400">Modèles couverts</dt>
                  <dd className="text-2xl font-semibold text-white">GPT, Claude, Gemini, Llama</dd>
                </div>
              </dl>
            </div>
            <div className="relative flex flex-col gap-6 rounded-3xl bg-white/5 p-6 backdrop-blur">
              <div className="absolute -right-6 top-10 h-24 w-24 rounded-full bg-cyan-400/40 blur-2xl" />
              <div className="absolute -bottom-8 left-12 h-20 w-20 rounded-full bg-purple-400/40 blur-2xl" />
              <div className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-200/90">
                  Illustrations conceptuelles
                </span>
                <h3 className="text-lg font-semibold text-white">Cartographie d'un prompt orchestré</h3>
                <p className="text-sm text-slate-300">
                  Visualisez les interactions entre instructions, contexte et validations. Chaque couche renforce la compréhension du modèle.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/40 p-3">
                    <p className="font-semibold text-purple-200">Rôle</p>
                    <p>Coach IA</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/40 p-3">
                    <p className="font-semibold text-cyan-200">Contexte</p>
                    <p>Formation produit</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/40 p-3">
                    <p className="font-semibold text-emerald-200">Livrables</p>
                    <p>Plan + Checklist</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/40 p-3">
                    <p className="font-semibold text-amber-200">Contrôle</p>
                    <p>Validation qualité</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
                <p>
                  « Les équipes qui conçoivent des prompts structurés et contextualisés réduisent de 60% le temps de révision des contenus générés. »
                </p>
                <p className="mt-3 text-xs text-slate-400">— Étude interne PromptOps 2025</p>
              </div>
            </div>
          </div>
        </section>

        <section id="frameworks" className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-white">
              Structurez vos prompts avec des frameworks éprouvés.
            </h2>
            <p className="text-slate-300">
              Les frameworks de prompt engineering offrent un squelette prêt à l'emploi pour aligner votre IA sur vos objectifs métier. Sélectionnez un cadre et découvrez ses piliers essentiels.
            </p>
            <div className="flex flex-wrap gap-3">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => setSelectedFramework(framework.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    selectedFramework === framework.id
                      ? "bg-white text-slate-950 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {framework.name}
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              {frameworks.map((framework) => (
                <div
                  key={framework.id}
                  className={selectedFramework === framework.id ? "flex flex-col gap-4" : "hidden"}
                >
                  <h3 className="text-2xl font-semibold text-white">{framework.name}</h3>
                  <p className="text-sm text-slate-300">{framework.summary}</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    {framework.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-800/40 p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Les 4C du prompt orchestré</h3>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Guide interactif</div>
            </div>
            <div className="mt-6 grid gap-4">
              {(Object.keys(techniqueDetails) as Array<keyof typeof techniqueDetails>).map((techniqueKey) => {
                const technique = techniqueDetails[techniqueKey];
                const isActive = selectedTechnique === techniqueKey;
                return (
                  <button
                    key={techniqueKey}
                    onClick={() => setSelectedTechnique(techniqueKey)}
                    className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-white/80 bg-white text-slate-950 shadow-lg"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest">
                      {techniqueKey}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-slate-900" : "text-slate-200/80"
                      }`}
                    >
                      {technique.title}
                    </span>
                    <span className={`text-sm ${isActive ? "text-slate-700" : "text-slate-300"}`}>
                      {technique.description}
                    </span>
                    {isActive && (
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {technique.checklist.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="builder"
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-white">Atelier interactif</h2>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Prompt Builder
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Ajustez les paramètres pour générer un prompt pédagogique complet. Expérimentez avec le public, la mission et les contraintes pour observer l'impact sur la structure finale.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Objectif</span>
                  <textarea
                    value={objective}
                    onChange={(event) => setObjective(event.target.value)}
                    className="min-h-[96px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white/40 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Public & niveau</span>
                  <input
                    value={audienceLevel}
                    onChange={(event) => setAudienceLevel(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white/40 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Ton et voix</span>
                  <input
                    value={tone}
                    onChange={(event) => setTone(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white/40 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Contraintes clés</span>
                  <textarea
                    value={constraints}
                    onChange={(event) => setConstraints(event.target.value)}
                    className="min-h-[96px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white/40 focus:outline-none"
                  />
                </label>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold text-white">Guardrails contextuels</h3>
                <p className="mt-1 text-xs text-slate-300">
                  Activez les garde-fous pour renforcer la sécurité et la pertinence de la réponse générée.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {guardrailOptions.map((option) => {
                    const isChecked = activeGuardrails.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={`flex flex-col gap-1 rounded-xl border px-4 py-3 text-sm transition ${
                          isChecked
                            ? "border-emerald-400/80 bg-emerald-400/10"
                            : "border-white/10 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <span className="flex items-center justify-between text-slate-200">
                          {option.label}
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleGuardrail(option.id)}
                            className="h-4 w-4 rounded border border-white/30 bg-slate-900 text-emerald-400 focus:ring-emerald-300"
                          />
                        </span>
                        <span className="text-xs text-slate-400">{option.helper}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-800/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Prompt généré</h3>
              <pre className="mt-4 max-h-[320px] overflow-auto rounded-2xl bg-slate-950/70 p-4 text-xs leading-relaxed text-slate-200 shadow-inner">
                {composedPrompt}
              </pre>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-slate-900/60 to-cyan-500/10 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Conseils express</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-200">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-300" />
                  Combinez un ton empathique avec des contraintes de clarté pour aligner la voix de l'IA.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  Décomposez les objectifs complexes en micro-tâches pour un meilleur suivi.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Ajoutez systématiquement une auto-évaluation pour fiabiliser la réponse.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="json" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-white">Prompt JSON orchestré</h2>
              <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
                Context engineering
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Combinez instructions naturelles et structure JSON pour garantir la conformité du modèle. Ajoutez des clés de validation, des métadonnées de contexte ou des scénarios de test pour automatiser vos workflows.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                <span>Schéma JSON strict</span>
                <input
                  type="checkbox"
                  checked={jsonMode}
                  onChange={(event) => setJsonMode(event.target.checked)}
                  className="h-4 w-4 rounded border border-white/30 bg-slate-900 text-cyan-400 focus:ring-cyan-300"
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                <span>Checklist d'évaluation</span>
                <input
                  type="checkbox"
                  checked={evaluationMode}
                  onChange={(event) => setEvaluationMode(event.target.checked)}
                  className="h-4 w-4 rounded border border-white/30 bg-slate-900 text-cyan-400 focus:ring-cyan-300"
                />
              </label>
            </div>
            <p className="text-xs text-slate-400">
              Astuce : placez ce JSON dans la section "response_format" de l'API ou comme message système pour verrouiller la structure de sortie.
            </p>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-xs text-slate-100 shadow-inner">
              <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap">
                {jsonPrompt}
              </pre>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-800/40 p-8 shadow-xl">
            <h3 className="text-lg font-semibold text-white">Pyramide du contexte</h3>
            <p className="mt-2 text-sm text-slate-300">
              Associez données, instructions et métadonnées pour guider l'IA :
            </p>
            <div className="mt-6 space-y-5 text-sm text-slate-200">
              <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-purple-200">Niveau 1 — Système</p>
                <p className="mt-2 text-sm text-white">
                  Définit le rôle, les règles inviolables, les garde-fous et le format global.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-cyan-200">Niveau 2 — Contexte</p>
                <p className="mt-2 text-sm text-white">
                  Ajoute des documents, données tabulaires, extraits multimédias et mémoire conversationnelle.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-200">Niveau 3 — Instructions</p>
                <p className="mt-2 text-sm text-white">
                  Décrit les tâches, les étapes, les tests d'auto-contrôle et le ton final.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-amber-200">Niveau 4 — Feedback</p>
                <p className="mt-2 text-sm text-white">
                  Intègre les retours utilisateurs, le scoring de qualité et les prochaines itérations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white">Un parcours complet en 6 modules</h2>
            <p className="text-sm text-slate-300">
              Chaque module combine théorie, atelier pratique, ressources téléchargeables et exercices de consolidation pour maîtriser progressivement l'art du prompt engineering.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {["Fondamentaux & vocabulaire", "Cadres de prompt", "Context engineering avancé", "Prompting multimodal", "Automatisation & API", "Gouvernance & sécurité"].map((moduleTitle, index) => (
              <div
                key={moduleTitle}
                className="relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Module {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-white">{moduleTitle}</h3>
                <p className="text-sm text-slate-300">
                  {index === 0 && "Comprenez les modèles, les types d'instructions et les biais à surveiller."}
                  {index === 1 && "Expérimentez avec SPACE, CERCLE, TARGET et créez votre propre canevas."}
                  {index === 2 && "Orchestrez documents, bases de connaissances et métadonnées pour contextualiser."}
                  {index === 3 && "Combinez texte, image, audio et outils pour créer des expériences immersives."}
                  {index === 4 && "Industrialisez avec les API, les workflows no-code et les tests automatisés."}
                  {index === 5 && "Définissez des politiques d'usage, des revues humaines et des métriques de performance."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
                  <span className="rounded-full bg-purple-400/20 px-3 py-1 text-purple-100">Cours vidéo</span>
                  <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-cyan-100">Atelier guidé</span>
                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-100">Template</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-800/40 p-8 shadow-xl">
            <h2 className="text-3xl font-semibold text-white">Tableau de bord d'évaluation</h2>
            <p className="mt-2 text-sm text-slate-300">
              Adoptez une boucle d'amélioration continue : mesurez la qualité, testez les variations et documentez vos apprentissages pour capitaliser sur chaque prompt.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {["Clarté des instructions", "Couverture du contexte", "Robustesse du format", "Temps de révision humaine"].map((metric) => (
                <div key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">{metric}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {metric === "Temps de révision humaine" ? "-38%" : "+24%"}
                  </p>
                  <p className="text-xs text-slate-400">Moyenne observée après optimisation</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              <p className="font-semibold text-white">Boucle RIC (Réviser, Itérer, Consolider)</p>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li>1. Réviser : utilisez un checklist d'évaluation et mesurez la satisfaction utilisateur.</li>
                <li>2. Itérer : testez plusieurs versions, ajustez ton, contexte et format.</li>
                <li>3. Consolider : documentez le prompt gagnant et archivez les variations.</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Checklist de déploiement</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-300" />
                  Documentez les versions du prompt dans un dépôt partagé.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  Configurez des tests automatisés (unitaires ou GPT-evals) sur les cas critiques.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Ajoutez une boucle de feedback utilisateur et d'escalade humaine.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-slate-900/60 to-cyan-500/10 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Ressources bonus</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-200">
                <li>🧠 Lexique des termes IA et prompt engineering.</li>
                <li>🧩 Bibliothèque d'exemples prêts à l'emploi (service client, marketing, RH, produit...).</li>
                <li>🛠️ Guide de connexion aux API et aux automations no-code.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold text-white">Questions fréquentes</h2>
            <p className="text-sm text-slate-300">
              Une bonne stratégie de prompts repose sur la compréhension du modèle, la qualité des données et une méthodologie reproductible. Explorez ces réponses rapides pour progresser.
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => {
              const isOpen = activeFaq === item.question;
              return (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-white/5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : item.question)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm text-white"
                  >
                    <span>{item.question}</span>
                    <span className="ml-4 text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-400 sm:flex-row">
          <p>© 2025 Atelier Prompt Mastery — Créez des expériences IA responsables.</p>
          <div className="flex gap-4 text-xs">
            <a href="#frameworks" className="transition hover:text-white">
              Frameworks
            </a>
            <a href="#builder" className="transition hover:text-white">
              Atelier interactif
            </a>
            <a href="#json" className="transition hover:text-white">
              Prompt JSON
            </a>
            <Link href="/realtime" className="transition hover:text-white">
              Démo en direct
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
