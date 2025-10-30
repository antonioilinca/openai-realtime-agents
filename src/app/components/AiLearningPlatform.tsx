"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClipboardDocumentIcon, ArrowTopRightOnSquareIcon, PlayIcon } from "@heroicons/react/24/solid";

const neonGradient = "bg-gradient-to-br from-blue-500/80 via-sky-400/70 to-indigo-500/80";

const modules = [
  {
    id: "intro",
    title: "Introduction à l'intelligence artificielle",
    description:
      "Comprenez l'histoire de l'IA, les concepts fondamentaux et les applications actuelles qui transforment nos métiers.",
    duration: "2h30",
    level: "Débutant",
    tags: ["Bases", "Culture IA", "Histoire"],
  },
  {
    id: "models",
    title: "Comprendre les modèles d'IA",
    description:
      "Explorez les réseaux de neurones, le deep learning, les modèles de langage et les architectures multimodales.",
    duration: "3h15",
    level: "Intermédiaire",
    tags: ["Deep Learning", "LLM", "Architectures"],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering avancé",
    description:
      "Apprenez à concevoir des prompts efficaces, à orchestrer des agents et à automatiser des workflows conversationnels.",
    duration: "4h",
    level: "Avancé",
    tags: ["Prompts", "Agents", "Optimisation"],
  },
  {
    id: "automation",
    title: "Automatisation par l'IA",
    description:
      "Construisez des chaînes d'automatisation avec Zapier, Make, LangChain, et connectez l'IA à vos systèmes métier.",
    duration: "2h45",
    level: "Intermédiaire",
    tags: ["Automation", "API", "Workflows"],
  },
  {
    id: "vision-video",
    title: "IA visuelle & vidéo",
    description:
      "Maîtrisez Midjourney, Veo3, Sora2, Runway et les pipelines de génération et d'édition vidéo professionnelles.",
    duration: "3h30",
    level: "Intermédiaire",
    tags: ["Image", "Vidéo", "Création"],
  },
  {
    id: "voice",
    title: "IA vocale & audio",
    description:
      "Créez des voix réalistes avec ElevenLabs, gérez la narration multilingue et intégrez l'IA vocale dans vos produits.",
    duration: "1h50",
    level: "Débutant",
    tags: ["Audio", "Synthèse", "Narration"],
  },
  {
    id: "business",
    title: "Stratégies business & IA",
    description:
      "Identifiez les opportunités, mesurez le ROI et déployez des stratégies IA gagnantes dans vos équipes.",
    duration: "2h",
    level: "Intermédiaire",
    tags: ["Business", "Stratégie", "ROI"],
  },
  {
    id: "creative",
    title: "IA créative & storytelling",
    description:
      "Combinez texte, image, audio et vidéo pour concevoir des expériences immersives et des contenus mémorables.",
    duration: "2h10",
    level: "Débutant",
    tags: ["Créativité", "Storytelling", "Multimédia"],
  },
];

const promptJsonExamples = [
  {
    title: "Assistant de génération de brief marketing",
    description:
      "Construit un brief structuré pour une campagne en utilisant un schéma JSON clair et validé.",
    prompt: `{
  "role": "system",
  "instructions": {
    "objectif": "Créer un brief marketing complet",
    "contraintes": ["Respecter la tonalité de la marque", "Fournir 3 slogans"],
    "format": {
      "persona": { "type": "string", "description": "Public cible" },
      "promesse": { "type": "string" },
      "preuves": { "type": "array", "items": "string" },
      "idee_centrale": { "type": "string" }
    }
  }
}`,
  },
  {
    title: "Analyste de conversations clients",
    description:
      "Détecte les signaux d'attrition, synthétise les objections et suggère les actions prioritaires.",
    prompt: `{
  "role": "assistant",
  "context": {
    "source": "transcripts_support",
    "langues": ["fr", "en"],
    "seuil_alertes": 0.7
  },
  "tasks": [
    { "id": "analyse_sentiment", "output": "score" },
    { "id": "resume_objet", "output": "string" },
    {
      "id": "actions",
      "output": "array",
      "items": { "type": "string", "maxLength": 140 }
    }
  ]
}`,
  },
  {
    title: "Générateur de scripts vidéo IA",
    description:
      "Prépare un storyboard compatible Veo3 / Runway avec descriptions de scènes et assets visuels.",
    prompt: `{
  "meta": {
    "format": "storyboard",
    "outils": ["Veo3", "Runway", "Midjourney"]
  },
  "scenes": [
    {
      "id": 1,
      "description": "Ouverture futuriste",
      "visuel": "Ville néon pluie",
      "voix_off": "string",
      "effets_sonores": ["pads atmosphériques"]
    }
  ],
  "cta": "string"
}`,
  },
];

const guides = [
  {
    title: "Comprendre les modèles GPT, Claude et Gemini",
    description:
      "Comparaison des forces, latences et coûts, avec démonstrations et benchmarks interactifs.",
    link: "#modeles",
  },
  {
    title: "Atelier Prompt Engineering avancé",
    description:
      "Atelier guidé avec évaluation automatique et suggestions d'amélioration en temps réel.",
    link: "#prompt",
  },
  {
    title: "Automatiser un workflow créatif",
    description:
      "Tutoriel pas à pas reliant GPT-5, Midjourney et Runway pour produire une campagne vidéo.",
    link: "#automation",
  },
];

const toolLibrary = {
  productivite: ["GPT-5", "Claude", "Notion AI", "Mem", "Perplexity"],
  contenu: ["Jasper", "Copy.ai", "Gemini Advanced", "ChatGPT", "WriteSonic"],
  business: ["ElevenLabs", "Runway", "Midjourney", "Sana", "Personal AI"],
  art: ["Midjourney", "Leonardo AI", "Ideogram", "DALL-E", "Adobe Firefly"],
  dev: ["GitHub Copilot", "Cursor", "Warp AI", "Codeium", "Bolt"],
  audio: ["ElevenLabs", "Voicemod", "Suno", "Aiva", "Descript"],
  video: ["Runway", "Veo3", "Sora2", "Kapwing AI", "Pika"],
};

const profiles = [
  {
    id: "etudiant",
    label: "Étudiant",
    steps: [
      "Renforce ta culture générale IA et maîtrise les modèles principaux.",
      "Apprends à utiliser l'IA pour accélérer tes recherches et ta prise de notes.",
      "Crée un portfolio de projets IA prêts à être montrés lors d'entretiens.",
    ],
  },
  {
    id: "createur",
    label: "Créateur / Artiste",
    steps: [
      "Fusionne texte, image et audio pour développer ta signature artistique.",
      "Automatise la production de contenus et prototypages visuels.",
      "Monétise tes créations avec des offres IA sur mesure.",
    ],
  },
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    steps: [
      "Identifie les use cases à fort impact dans ton business.",
      "Déploie des assistants IA pour l'acquisition, le support et les opérations.",
      "Mesure le ROI et documente les processus pour tes équipes.",
    ],
  },
  {
    id: "developpeur",
    label: "Développeur",
    steps: [
      "Maîtrise les SDK et API des principaux modèles (OpenAI, Anthropic, Google).",
      "Construis des pipelines MLOps et automatisations avec LangChain ou LlamaIndex.",
      "Expérimente les agents autonomes et le fine-tuning responsable.",
    ],
  },
];

const iaNews = [
  {
    title: "Gemini dévoile un orchestrateur multimodal temps réel",
    description:
      "Nouveau mode permettant de combiner texte, voix et vision dans un seul flux avec latence réduite.",
    link: "https://ai.google/discover/gemini",
  },
  {
    title: "GPT-5 introduit des compétences proactives",
    description:
      "Le modèle peut planifier et exécuter des tâches complexes avec supervision granulaire.",
    link: "https://openai.com",
  },
  {
    title: "Veo3 optimise la génération vidéo 4K",
    description:
      "Qualité cinématographique et contrôle précis grâce aux calques de mouvements.",
    link: "https://deepmind.google/discover",
  },
];

const tips = [
  "Crée une routine quotidienne IA : 15 minutes de veille, 30 minutes de pratique.",
  "Documente chaque prompt efficace dans ta bibliothèque personnelle.",
  "Combine plusieurs outils pour obtenir un résultat professionnel en un temps record.",
  "Utilise l'IA pour prototyper rapidement, puis itère avec les retours de tes utilisateurs.",
];

const promptUseCases = [
  {
    category: "Stratégie business",
    prompt:
      "Tu es un Chief AI Officer. Analyse les 3 principaux processus du client et propose une roadmap IA priorisée.",
  },
  {
    category: "Création de contenu",
    prompt:
      "Tu es un directeur créatif. Génère 5 concepts de campagne social media avec moodboard Midjourney associé.",
  },
  {
    category: "Développement produit",
    prompt:
      "Tu es un PM technique. Rédige un PRD avec user stories et prototypes IA à intégrer.",
  },
];

const AiLearningPlatform = () => {
  const [search, setSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const flattenedTools = useMemo(
    () =>
      Object.entries(toolLibrary).flatMap(([category, tools]) =>
        tools.map((tool) => ({ category, tool }))
      ),
    []
  );

  const randomTool = useMemo(() => {
    const index = Math.floor(Math.random() * flattenedTools.length);
    return flattenedTools[index];
  }, [flattenedTools]);

  const filteredModules = useMemo(() => {
    if (!search) return modules;
    return modules.filter(
      (module) =>
        module.title.toLowerCase().includes(search.toLowerCase()) ||
        module.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const filteredPrompts = useMemo(() => {
    if (!search) return promptJsonExamples;
    return promptJsonExamples.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredTools = useMemo(() => {
    if (!search) return toolLibrary;
    const entries = Object.entries(toolLibrary).map(([category, tools]) => ({
      category,
      tools: tools.filter((tool) => tool.toLowerCase().includes(search.toLowerCase())),
    }));
    return entries
      .filter((entry) => entry.tools.length > 0)
      .reduce<Record<string, string[]>>((acc, entry) => {
        acc[entry.category as keyof typeof toolLibrary] = entry.tools;
        return acc;
      }, {} as Record<string, string[]>);
  }, [search]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(text);
      setTimeout(() => setCopiedPrompt(null), 2500);
    } catch (error) {
      console.error("Clipboard error", error);
    }
  };

  const handleOpenTool = (tool: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(tool + " AI")}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-slate-100 to-slate-200" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-300/40 via-transparent to-transparent blur-3xl" />

      <header className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/60 bg-white/80 p-10 shadow-2xl backdrop-blur-lg"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Plateforme immersive
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
                Maîtrisez l’intelligence artificielle de A à Z
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-700">
                Apprenez sans friction, sans inscription, grâce à des modules interactifs, des cas pratiques et une
                bibliothèque d’outils IA toujours à jour. Développez une expertise solide en prompt engineering, en
                automation et en stratégies business IA.
              </p>
            </div>
            <div className="relative shrink-0">
              <div className={`h-44 w-44 rounded-3xl ${neonGradient} p-[2px] shadow-[0_0_60px_rgba(59,130,246,0.35)]`}>
                <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-slate-950/90">
                  <SparklesIcon className="h-12 w-12 text-sky-100" />
                  <span className="mt-3 text-center text-sm font-semibold uppercase tracking-wide text-sky-50">
                    100% Gratuit
                  </span>
                  <span className="mt-1 text-xs text-slate-300">Parcours adaptatifs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-200" />
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white/70 py-4 pl-12 pr-4 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
                placeholder="Rechercher un concept, un prompt ou un outil..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-sky-500/40 bg-sky-500/10 px-6 py-4 text-sky-700">
              <span className="text-sm font-semibold uppercase tracking-wide">Navigation fluide</span>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
            </div>
          </div>
        </motion.div>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        <section id="modules" className="scroll-mt-24">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Parcours complet</h2>
            <span className="text-sm uppercase tracking-widest text-sky-300">
              {filteredModules.length} modules sélectionnés
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredModules.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg transition"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs uppercase tracking-wide text-sky-600">
                    {module.level}
                  </span>
                  <span className="text-sm text-slate-500">{module.duration}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{module.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/20">
                  Découvrir le module
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="prompt" className="scroll-mt-24">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Prompt Engineering JSON</h2>
            <p className="max-w-2xl text-sm text-slate-600">
              Comprenez comment structurer des instructions précises, valider vos schémas et générer des prompts réutilisables.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredPrompts.map((example) => (
              <div key={example.title} className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{example.description}</p>
                <pre className="mt-4 flex-1 overflow-auto rounded-2xl bg-slate-950/80 p-4 text-xs text-sky-100 shadow-inner">
                  <code>{example.prompt}</code>
                </pre>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleCopy(example.prompt)}
                    className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-500/20"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
                    {copiedPrompt === example.prompt ? "Copié !" : "Copier le prompt"}
                  </button>
                  <button
                    onClick={() => handleOpenTool(example.title)}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                  >
                    <PlayIcon className="h-4 w-4" />
                    Tester ce prompt
                  </button>
                  <button
                    onClick={() => handleOpenTool(example.title + " démo")}
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    Voir en action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="guides" className="scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Guides interactifs</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <motion.a
                href={guide.link}
                key={guide.title}
                whileHover={{ y: -4 }}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-sky-700">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-sky-600">
                  Explorer
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="outil-hasard" className="scroll-mt-24">
          <div className="rounded-3xl border border-sky-500/30 bg-sky-100 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Découvrir un outil au hasard</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Chaque visite met en lumière un outil différent pour élargir votre palette créative.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white px-6 py-4 text-center text-slate-900 shadow-lg">
                <p className="text-sm uppercase tracking-wide text-sky-600">{randomTool.category}</p>
                <p className="mt-1 text-2xl font-semibold">{randomTool.tool}</p>
                <button
                  onClick={() => handleOpenTool(randomTool.tool)}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  Explorer l’outil
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="bibliotheque" className="scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Bibliothèque d’outils par usage</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(filteredTools).map(([category, tools]) => (
              <div key={category} className="rounded-3xl border border-slate-200/80 bg-white p-6">
                <h3 className="text-lg font-semibold capitalize text-slate-900">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => handleOpenTool(tool)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="use-case" className="scroll-mt-24">
          <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Apprendre par cas d’usage</h2>
              <p className="mt-2 text-sm text-slate-600">
                Choisissez votre profil pour un parcours personnalisé.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selectedProfile.id === profile.id
                        ? "border-sky-400 bg-sky-500/15 text-sky-700"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-400/60 hover:text-sky-700"
                    }`}
                  >
                    {profile.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-900/40 bg-slate-900 p-6 text-white">
              <h3 className="text-lg font-semibold">{selectedProfile.label}</h3>
              <ul className="mt-4 space-y-4">
                {selectedProfile.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="conseils" className="scroll-mt-24">
          <div className="grid gap-6 md:grid-cols-[1fr,1fr]">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Conseils & stratégies IA</h2>
              <p className="mt-2 text-sm text-slate-600">
                Intégrez l’IA de manière durable dans vos projets personnels et professionnels.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <SparklesIcon className="mt-1 h-5 w-5 text-sky-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">Prompts prêts à l’emploi</h3>
              <div className="mt-3 space-y-4">
                {promptUseCases.map((item) => (
                  <div key={item.category} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-wide text-sky-200">{item.category}</p>
                    <p className="mt-2 text-sm text-slate-200">{item.prompt}</p>
                    <button
                      onClick={() => handleCopy(item.prompt)}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-500/20"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      {copiedPrompt === item.prompt ? "Copié !" : "Copier le prompt"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="nouveautes" className="scroll-mt-24">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Les nouveautés de l’IA</h2>
              <span className="text-xs uppercase tracking-[0.4em] text-sky-500">Mise à jour continue</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {iaNews.map((news) => (
                <a
                  key={news.title}
                  href={news.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-sky-400"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-sky-700">{news.title}</p>
                  <p className="mt-2 text-xs text-slate-600">{news.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs text-sky-600">
                    Lire l’article
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mx-auto mt-12 max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-sm text-slate-700 shadow-lg">
          <p>
            Cette plateforme francophone est mise à jour en continu pour vous aider à maîtriser l’intelligence artificielle et
            ses outils. Revenez régulièrement pour découvrir de nouveaux cas pratiques, modèles et ressources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiLearningPlatform;
