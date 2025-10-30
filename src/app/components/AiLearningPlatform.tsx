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

type ModuleLesson = {
  title: string;
  focus: string;
  practice: string;
};

type ModuleSection = {
  title: string;
  description: string;
  lessons: ModuleLesson[];
  tools?: string[];
};

type ModuleDetail = {
  summary: string;
  objectives: string[];
  prerequisites: string[];
  format: string;
  timeBreakdown: { label: string; duration: string }[];
  sections: ModuleSection[];
  project: {
    title: string;
    description: string;
    deliverables: string[];
  };
  resources: { label: string; type: string; link?: string }[];
  evaluation: string[];
};

const moduleDetails: Record<string, ModuleDetail> = {
  intro: {
    summary:
      "Posez les bases solides de votre culture IA : définitions clés, histoire, grandes familles de techniques et panorama des usages actuels.",
    objectives: [
      "Comprendre l'évolution de l'IA et ses sous-domaines (symbolique, statistique, connexionniste).",
      "Identifier les composantes d'un système d'IA moderne et son cycle de vie.",
      "Analyser les impacts sociétaux, éthiques et réglementaires pour adopter une pratique responsable.",
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Intérêt pour les innovations numériques",
    ],
    format: "Cours vidéo + quiz interactifs + mini-labs de découverte",
    timeBreakdown: [
      { label: "Capsules vidéo", duration: "1h20" },
      { label: "Quiz & flashcards", duration: "30 min" },
      { label: "Ateliers guidés", duration: "40 min" },
    ],
    sections: [
      {
        title: "Origines et évolution",
        description:
          "Revivez les grandes étapes, des premières machines à la vague deep learning, et découvrez les figures incontournables.",
        lessons: [
          {
            title: "Des pionniers aux IA modernes",
            focus: "Chronologie de Turing à GPT-5, ruptures technologiques et cycles d'engouement.",
            practice: "Quiz timeline interactif + fiche mémo téléchargeable.",
          },
          {
            title: "Cartographie des domaines de l'IA",
            focus: "Vision, langage, planification, robotique, IA générative : définitions et cas d'usage emblématiques.",
            practice: "Étude de cas : associer chaque technologie à un scénario concret.",
          },
        ],
      },
      {
        title: "Fonctionnement d'un système IA",
        description:
          "Décortiquez les étapes de collecte de données, d'entraînement, d'évaluation et de déploiement.",
        lessons: [
          {
            title: "Cycle de vie d'un modèle",
            focus: "Pipeline standard MLOps et rôles impliqués (data engineer, ML engineer, product owner).",
            practice: "Simulation : choisir l'équipe idéale pour un projet d'IA conversationnelle.",
          },
          {
            title: "Qualité des données et biais",
            focus: "Typologie des biais, risques et méthodes de mitigation.",
            practice: "Mini-lab : analyser un jeu de données pour détecter un biais potentiel.",
          },
        ],
      },
      {
        title: "IA responsable & gouvernance",
        description:
          "Maîtrisez les cadres réglementaires (IA Act, RGPD), les principes éthiques et les bonnes pratiques d'audit.",
        lessons: [
          {
            title: "Cadres légaux",
            focus: "Panorama des régulations internationales et implications pour les entreprises.",
            practice: "Cas pratique : appliquer un checklist conformité pour un chatbot santé.",
          },
          {
            title: "Transparence et explicabilité",
            focus: "Techniques d'interprétabilité et communication des limites aux utilisateurs.",
            practice: "Atelier : rédiger un protocole d'usage responsable pour un assistant IA interne.",
          },
        ],
      },
    ],
    project: {
      title: "Diagnostic IA d'une organisation",
      description:
        "Évaluez la maturité IA d'une entreprise fictive et proposez trois initiatives à court terme.",
      deliverables: [
        "Carte des opportunités IA prioritaires",
        "Analyse des risques et mesures d'atténuation",
        "Pitch deck de 5 slides pour convaincre le comité de direction",
      ],
    },
    resources: [
      { label: "Timeline interactive de l'IA", type: "Infographie" },
      { label: "Guide pratique IA Act", type: "PDF" },
      { label: "Glossaire IA débutant", type: "Carte mémoire" },
    ],
    evaluation: [
      "Quiz de 20 questions chronométrées",
      "Tableau à compléter sur les étapes du cycle de vie",
      "Compte rendu du diagnostic IA (évaluation par les pairs)",
    ],
  },
  models: {
    summary:
      "Analysez en profondeur les architectures modernes (transformers, diffusions, modèles hybrides) et apprenez à sélectionner l'approche adaptée à votre projet.",
    objectives: [
      "Différencier les modèles statistiques classiques et les architectures neuronales avancées.",
      "Comprendre le fonctionnement interne des transformers et des modèles multimodaux.",
      "Choisir le bon modèle selon les contraintes de données, de coût et de performance.",
    ],
    prerequisites: ["Bases mathématiques (probabilités, matrices)", "Notions Python ou pseudo-code"],
    format: "Cours vidéo + notebooks interactifs + analyse de benchmarks",
    timeBreakdown: [
      { label: "Théorie", duration: "1h45" },
      { label: "Notebooks pratiques", duration: "1h10" },
      { label: "Étude de cas", duration: "20 min" },
    ],
    sections: [
      {
        title: "Panorama des architectures",
        description:
          "Comparez réseaux convolutionnels, transformers, modèles de diffusion et approches hybrides.",
        lessons: [
          {
            title: "Transformer, la révolution",
            focus: "Self-attention, embeddings, fine-tuning vs. prompt-tuning.",
            practice: "Notebook : visualiser les poids d'attention d'un mini-transformer.",
          },
          {
            title: "Diffusion & générateurs visuels",
            focus: "Principe de débruitage progressif et conditionnement texte-image.",
            practice: "Manipuler un pipeline Stable Diffusion avec différents schedulers.",
          },
        ],
        tools: ["PyTorch", "Hugging Face Transformers", "Diffusers"],
      },
      {
        title: "Modèles multimodaux",
        description:
          "Découvrez comment les modèles gèrent simultanément texte, image, audio et vidéo.",
        lessons: [
          {
            title: "Alignement cross-modal",
            focus: "Encoders vs. décoders, joint embeddings et cross-attention.",
            practice: "Cas pratique : associer une description textuelle à une image via CLIP.",
          },
          {
            title: "Agents orchestrateurs",
            focus: "Coordination de plusieurs modèles spécialisés via un agent central.",
            practice: "Workflow LangChain : orchestrer un LLM et un modèle de vision pour analyser un document.",
          },
        ],
      },
      {
        title: "Choisir et évaluer un modèle",
        description:
          "Définissez vos critères de sélection : latence, coût, sécurité, gouvernance et maintenance.",
        lessons: [
          {
            title: "Benchmarks et métriques",
            focus: "Perplexité, BLEU, FID, WER, métriques business.",
            practice: "Tableau de comparaison entre GPT-5, Claude, Gemini, Llama-3.",
          },
          {
            title: "Optimisation et déploiement",
            focus: "Distillation, quantification, hébergement serverless vs. on-premise.",
            practice: "Étude de cas : réduire les coûts d'inférence pour une API conversationnelle.",
          },
        ],
      },
    ],
    project: {
      title: "Fiche de sélection modèle",
      description:
        "Réalisez une matrice décisionnelle pour choisir un modèle de résumé automatique multilingue.",
      deliverables: [
        "Tableau de comparaison des modèles",
        "Analyse des risques techniques",
        "Plan de test et monitoring",
      ],
    },
    resources: [
      { label: "Notebook transformer expliqué", type: "Notebook" },
      { label: "Benchmark LLMs 2024", type: "Rapport" },
      { label: "Guide de sélection modèle", type: "Template" },
    ],
    evaluation: [
      "Quiz technique 15 questions",
      "Validation du notebook d'attention",
      "Revue par un mentor de la fiche de sélection",
    ],
  },
  "prompt-engineering": {
    summary:
      "Découvrez les stratégies avancées pour piloter les modèles de langage : structuration, chaînes d'appels, agents, contrôles qualité et instrumentation.",
    objectives: [
      "Maîtriser les patrons de prompt (CoT, ReAct, JSON, tutoriels dynamiques).",
      "Créer des agents outillés et orchestrer plusieurs appels pour des tâches complexes.",
      "Mettre en place une gouvernance des prompts (versioning, AB testing, monitoring).",
    ],
    prerequisites: ["Bases IA générative", "Notions API OpenAI/Anthropic"],
    format: "Démos interactives + générateur de prompts + cas pratiques corrigés",
    timeBreakdown: [
      { label: "Théorie & structures", duration: "1h30" },
      { label: "Labs JSON", duration: "1h20" },
      { label: "Projet agent", duration: "1h10" },
    ],
    sections: [
      {
        title: "Fondamentaux avancés",
        description:
          "Passez des prompts classiques aux stratégies avancées : rôles, formatage, méta-instructions, garde-fous.",
        lessons: [
          {
            title: "Patrons incontournables",
            focus: "Zero-shot vs. few-shot, Chain-of-Thought, Tree-of-Thought, Skeleton prompts.",
            practice: "Atelier : transformer un prompt basique en prompt structuré multi-étapes.",
          },
          {
            title: "Gestion du contexte",
            focus: "Fenêtre contextuelle, résumés dynamiques, mémoire vectorielle.",
            practice: "Mini-lab : construire un buffer mémoire avec LlamaIndex.",
          },
        ],
      },
      {
        title: "Prompt Engineering JSON",
        description:
          "Structurez vos instructions pour générer des réponses contrôlées et validables automatiquement.",
        lessons: [
          {
            title: "Schemas et validation",
            focus: "Types, contraintes, dépendances, vérification côté client/serveur.",
            practice: "Créer un schema Zod/JSON Schema et valider la sortie d'un LLM.",
          },
          {
            title: "Générateurs d'exemples",
            focus: "Automatiser la production de prompts en utilisant des templates dynamiques.",
            practice: "Construire un générateur React + TypeScript avec bibliothèque de snippets.",
          },
        ],
        tools: ["OpenAI Responses", "Anthropic Tools", "Zod", "LangChain"],
      },
      {
        title: "Agents et automatisation",
        description:
          "Combinez prompts, outils et mémoire pour créer des agents fiables orientés résultat.",
        lessons: [
          {
            title: "Agents planificateurs",
            focus: "ReAct, planification hiérarchique, délégation de sous-tâches.",
            practice: "Implémenter un agent qui planifie un lancement produit (LangGraph).",
          },
          {
            title: "Monitoring & amélioration continue",
            focus: "Traçabilité, feedback utilisateurs, AB testing.",
            practice: "Mettre en place une boucle d'amélioration sur PromptLayer + observabilité.",
          },
        ],
      },
    ],
    project: {
      title: "Agent assistant de veille",
      description:
        "Construisez un agent IA qui agrège des sources, synthétise et propose des actions hebdomadaires.",
      deliverables: [
        "Diagramme d'orchestration",
        "Prompts versionnés et documentés",
        "Dashboard de monitoring des performances",
      ],
    },
    resources: [
      { label: "Bibliothèque de patrons de prompt", type: "Base de connaissances" },
      { label: "Template JSON Schema avancé", type: "Snippet" },
      { label: "Guide AB testing de prompts", type: "Article" },
    ],
    evaluation: [
      "Validation automatique du schema JSON",
      "Audit d'un agent existant (revue par les pairs)",
      "Pitch vidéo de l'agent de veille",
    ],
  },
  automation: {
    summary:
      "Apprenez à automatiser vos processus métiers en connectant IA, APIs et outils no-code/low-code avec des workflows fiables.",
    objectives: [
      "Identifier les opportunités d'automatisation dans un cycle métier complet.",
      "Construire des scénarios Make/Zapier enrichis par des modèles GPT-5, Claude, Gemini.",
      "Mettre en production des automatisations robustes et monitorées.",
    ],
    prerequisites: ["Connaissances basiques en APIs", "Compréhension des prompts"],
    format: "Studios pratiques + checklists opérationnelles + retours d'expérience",
    timeBreakdown: [
      { label: "Exploration", duration: "45 min" },
      { label: "Construction de scénarios", duration: "1h30" },
      { label: "Industrialisation", duration: "30 min" },
    ],
    sections: [
      {
        title: "Cartographier les opportunités",
        description:
          "Analysez les tâches répétitives, les données disponibles et les outils existants pour détecter les leviers IA.",
        lessons: [
          {
            title: "Audit process",
            focus: "Méthode RICE pour prioriser les automatisations.",
            practice: "Atelier : scoring d'un pipeline marketing.",
          },
          {
            title: "Design d'expérience",
            focus: "Définir les points de contrôle humains et l'expérience finale.",
            practice: "Canvas : dessiner le user journey automatisé.",
          },
        ],
      },
      {
        title: "Construire des workflows IA",
        description:
          "Connectez modèles et services (CRMs, Slack, Notion) avec des automatisations sur mesure.",
        lessons: [
          {
            title: "Make & Zapier + IA",
            focus: "Actions custom GPT, webhooks, gestion des erreurs.",
            practice: "Créer un scénario de qualification automatique des leads.",
          },
          {
            title: "Orchestration avancée",
            focus: "Combiner LangChain/LangGraph avec des tâches planifiées.",
            practice: "Implémenter un orchestrateur Node.js déclenché par des événements CRM.",
          },
        ],
        tools: ["Make", "Zapier", "LangChain", "n8n"],
      },
      {
        title: "Industrialiser et monitorer",
        description:
          "Mettez en place des indicateurs de performance, des alertes et un support continu.",
        lessons: [
          {
            title: "Monitoring & observabilité",
            focus: "Logs, dashboards, alerting sur les workflows IA.",
            practice: "Configurer des alertes Slack via Make pour surveiller les échecs.",
          },
          {
            title: "Amélioration continue",
            focus: "Boucles de feedback, REX, documentation.",
            practice: "Construire un plan de maintenance trimestriel.",
          },
        ],
      },
    ],
    project: {
      title: "Pipeline d'onboarding automatisé",
      description:
        "Concevez un workflow complet d'onboarding client avec assistant IA, notifications et reporting.",
      deliverables: [
        "Diagramme BPMN",
        "Scénario Make/Zapier exporté",
        "Tableau de suivi des KPIs",
      ],
    },
    resources: [
      { label: "Checklist de déploiement", type: "Template" },
      { label: "Bibliothèque de webhooks utiles", type: "Base de données" },
      { label: "Retour d'expérience SaaS B2B", type: "Étude de cas" },
    ],
    evaluation: [
      "Audit du diagramme BPMN",
      "Test utilisateur sur le workflow livré",
      "Score de robustesse via checklist mentor",
    ],
  },
  "vision-video": {
    summary:
      "Maîtrisez les outils visuels et vidéo de nouvelle génération pour produire des rendus professionnels et contrôler chaque détail créatif.",
    objectives: [
      "Comprendre les pipelines de génération et d'édition d'images/vidéo.",
      "Exploiter Midjourney, Veo3, Sora2 et Runway avec des workflows cohérents.",
      "Construire une bible graphique et un pipeline de post-production automatisé.",
    ],
    prerequisites: ["Notions de composition visuelle", "Expérience basique avec un outil créatif"],
    format: "Studios créatifs + démonstrations live + presets téléchargeables",
    timeBreakdown: [
      { label: "Exploration des outils", duration: "1h" },
      { label: "Ateliers guidés", duration: "1h40" },
      { label: "Post-production", duration: "50 min" },
    ],
    sections: [
      {
        title: "Pipeline image-to-video",
        description:
          "De l'idéation au rendu final : moodboard, prompts visuels, génération, montage.",
        lessons: [
          {
            title: "Midjourney avancé",
            focus: "Paramètres stylize, chaos, seeds, variation modes.",
            practice: "Créer un board cohérent pour une campagne néon futuriste.",
          },
          {
            title: "Transition vers la vidéo",
            focus: "Convertir des frames clés en séquences animées via Runway/Sora2.",
            practice: "Importer un storyboard dans Runway et ajouter des caméras virtuelles.",
          },
        ],
      },
      {
        title: "Contrôle & édition",
        description:
          "Raffinez vos rendus avec des techniques de contrôle fin (ControlNet, keyframes, mask).",
        lessons: [
          {
            title: "ControlNet & régularisation",
            focus: "Esquisses, depth maps, pose control pour maîtriser les poses et perspectives.",
            practice: "Refaire une scène publicitaire avec silhouettes cohérentes.",
          },
          {
            title: "VFX & compositing",
            focus: "Ajouter du motion design, du sound design et des transitions.",
            practice: "Pipeline After Effects + Runway pour finaliser une bande-annonce.",
          },
        ],
        tools: ["Midjourney", "Runway", "Sora2", "After Effects"],
      },
      {
        title: "Production & diffusion",
        description:
          "Organisez vos livrables, exportez dans les bons formats et planifiez la diffusion.",
        lessons: [
          {
            title: "Templates & presets",
            focus: "Gestion des variations, déclinaisons multilingues, LUTs.",
            practice: "Créer un pack de déclinaisons sociales 9:16, 1:1, 16:9.",
          },
          {
            title: "Diffusion multi-plateformes",
            focus: "Automatiser la publication et mesurer la performance.",
            practice: "Workflow : exporter vers YouTube, TikTok et landing page dédiée.",
          },
        ],
      },
    ],
    project: {
      title: "Showreel immersif IA",
      description:
        "Produisez une vidéo de 45 secondes présentant un univers de marque, avec assets générés et montés.",
      deliverables: [
        "Moodboard + prompts Midjourney",
        "Storyboard Veo3/Runway",
        "Vidéo finale + preset export",
      ],
    },
    resources: [
      { label: "Pack de prompts visuels", type: "Bibliothèque" },
      { label: "Preset color grading", type: "Téléchargement" },
      { label: "Checklist diffusion social media", type: "Template" },
    ],
    evaluation: [
      "Revue créative par un mentor",
      "Score de cohérence graphique",
      "Checklist technique complétée",
    ],
  },
  voice: {
    summary:
      "Créez des expériences audio immersives : synthèse vocale, clonage de voix, automatisation de podcasts et assistants vocaux.",
    objectives: [
      "Comprendre les modèles de synthèse vocale et leurs paramètres clés.",
      "Configurer ElevenLabs, Suno et autres outils pour produire des narrations naturelles.",
      "Intégrer la voix dans des produits interactifs (assistants, IVR, jeux).",
    ],
    prerequisites: ["Microphone de base", "Notions audio (waveform, bitrate)"],
    format: "Studios audio + templates de scripts + intégrations API",
    timeBreakdown: [
      { label: "Fondamentaux audio", duration: "30 min" },
      { label: "Production vocale", duration: "55 min" },
      { label: "Intégrations", duration: "25 min" },
    ],
    sections: [
      {
        title: "Synthèse & clonage",
        description:
          "Découvrez comment générer des voix naturelles, cloner une voix et paramétrer le rendu.",
        lessons: [
          {
            title: "Échantillonnage & prosodie",
            focus: "Pitch, vitesse, émotion, respiration.",
            practice: "Cloner une voix en respectant les bonnes pratiques légales.",
          },
          {
            title: "Scripts optimisés",
            focus: "Structurer un script pour un rendu naturel et dynamique.",
            practice: "Atelier : écrire un script podcast + prompt d'intonation.",
          },
        ],
      },
      {
        title: "Chaîne de production audio",
        description:
          "Nettoyez, mixez et masterisez vos pistes pour un rendu professionnel.",
        lessons: [
          {
            title: "Traitements essentiels",
            focus: "Réduction de bruit, égalisation, compression.",
            practice: "Utiliser Descript + plugins VST pour polir une narration.",
          },
          {
            title: "Habillage sonore",
            focus: "Sound design, ambiances, musiques génératives.",
            practice: "Créer une intro sonore avec Suno et la synchroniser au script.",
          },
        ],
        tools: ["ElevenLabs", "Descript", "Suno", "Adobe Audition"],
      },
      {
        title: "Intégrations temps réel",
        description:
          "Déployez votre voix IA dans un produit : API, WebRTC, assistants vocaux.",
        lessons: [
          {
            title: "Assistants & IVR",
            focus: "Concevoir des dialogues, gérer les interruptions, fallback humains.",
            practice: "Prototyper un agent vocal pour le support client.",
          },
          {
            title: "Accessibilité & multilingue",
            focus: "Sous-titres, traduction, adaptation culturelle.",
            practice: "Créer une version multilingue d'un podcast avec post-édition humaine.",
          },
        ],
      },
    ],
    project: {
      title: "Assistant vocal de marque",
      description:
        "Concevez une identité vocale complète (charte, voix, scripts) et un prototype interactif.",
      deliverables: [
        "Persona vocal + guidelines",
        "Bibliothèque de prompts d'intonation",
        "Prototype Web ou IVR prêt à tester",
      ],
    },
    resources: [
      { label: "Pack d'effets audio", type: "Téléchargement" },
      { label: "Guide légal clonage de voix", type: "Article" },
      { label: "Template charte vocale", type: "Document" },
    ],
    evaluation: [
      "Écoute commentée par un mentor",
      "Score de clarté et d'émotion",
      "Checklist accessibilité validée",
    ],
  },
  business: {
    summary:
      "Déployez l'IA comme levier stratégique : gouvernance, ROI, modèles économiques et conduite du changement.",
    objectives: [
      "Identifier les projets IA à forte valeur business.",
      "Construire un business case chiffré et une roadmap réaliste.",
      "Piloter l'adoption et mesurer l'impact dans la durée.",
    ],
    prerequisites: ["Connaissance de son organisation", "Notions de pilotage de projet"],
    format: "Workshops stratégiques + templates financiers + coaching collectif",
    timeBreakdown: [
      { label: "Analyse d'opportunités", duration: "40 min" },
      { label: "Construction business case", duration: "50 min" },
      { label: "Gouvernance & change", duration: "30 min" },
    ],
    sections: [
      {
        title: "Vision & alignement",
        description:
          "Clarifiez les objectifs business, le niveau de maturité et les indicateurs clés.",
        lessons: [
          {
            title: "Matrice impact/effort",
            focus: "Prioriser les cas d'usage par valeur et faisabilité.",
            practice: "Atelier : cartographier 10 idées IA et sélectionner le top 3.",
          },
          {
            title: "Storytelling exécutif",
            focus: "Convaincre sponsors et équipes en valorisant les gains.",
            practice: "Rédiger un mémo 1-page pour le COMEX.",
          },
        ],
      },
      {
        title: "Business case & ROI",
        description:
          "Modélisez les coûts, économies, gains de revenus et scénarios de sensibilité.",
        lessons: [
          {
            title: "Structure d'un business case IA",
            focus: "CAPEX/OPEX, coûts de données, coûts d'inférence, coûts humains.",
            practice: "Construire un modèle financier sur Google Sheets avec scénarios.",
          },
          {
            title: "Pilotage par la valeur",
            focus: "KPI IA, OKR, reporting au comité de pilotage.",
            practice: "Créer un dashboard Notion/Looker Studio.",
          },
        ],
      },
      {
        title: "Conduite du changement",
        description:
          "Déployez l'IA avec une approche centrée humain : formation, communication, gouvernance.",
        lessons: [
          {
            title: "Plan de transformation",
            focus: "RACI, gouvernance, comité IA.",
            practice: "Élaborer un plan de communication interne sur 3 mois.",
          },
          {
            title: "Éthique & conformité",
            focus: "Charte d'usage, confidentialité, sécurité.",
            practice: "Designer un processus de revue éthique.",
          },
        ],
      },
    ],
    project: {
      title: "Roadmap IA 12 mois",
      description:
        "Formalisez une feuille de route stratégique alignée avec les priorités de l'entreprise.",
      deliverables: [
        "Vision IA + objectifs SMART",
        "Modèle financier avec ROI",
        "Plan de conduite du changement",
      ],
    },
    resources: [
      { label: "Template business case", type: "Google Sheet" },
      { label: "Guide gouvernance IA", type: "Livre blanc" },
      { label: "Checklist conformité", type: "Document" },
    ],
    evaluation: [
      "Revue de la roadmap par un mentor",
      "Score de viabilité financière",
      "Plan de change validé par un pair",
    ],
  },
  creative: {
    summary:
      "Combinez texte, image, audio et vidéo pour construire des univers narratifs puissants et différenciants.",
    objectives: [
      "Développer une méthode créative augmentée par l'IA.",
      "Prototyper rapidement des concepts immersifs multi-supports.",
      "Industrialiser la production de contenus en conservant une signature artistique.",
    ],
    prerequisites: ["Aucun", "Curiosité créative"],
    format: "Studios de co-création + templates Notion + bibliothèques de prompts",
    timeBreakdown: [
      { label: "Idéation", duration: "35 min" },
      { label: "Production", duration: "1h10" },
      { label: "Diffusion", duration: "25 min" },
    ],
    sections: [
      {
        title: "Narration augmentée",
        description:
          "Construisez des univers cohérents en mixant modèles de texte et générateurs visuels.",
        lessons: [
          {
            title: "Storytelling IA",
            focus: "Structures narratives, arcs émotionnels, personas générés.",
            practice: "Atelier : créer une bible narrative pour une série audio.",
          },
          {
            title: "Moodboards dynamiques",
            focus: "Prompts multi-modaux, variations rapides.",
            practice: "Utiliser Midjourney + Ideogram pour matérialiser un univers graphique.",
          },
        ],
      },
      {
        title: "Production multi-supports",
        description:
          "Assemblez texte, image, audio, vidéo dans un pipeline cohérent.",
        lessons: [
          {
            title: "Scripts + voix + visuels",
            focus: "Combiner GPT-5, ElevenLabs, Runway.",
            practice: "Produire une capsule social media en moins d'une heure.",
          },
          {
            title: "Interactive storytelling",
            focus: "Branches narratives, choix utilisateur, personnalisation.",
            practice: "Prototyper une expérience web interactive avec Spline + IA.",
          },
        ],
        tools: ["GPT-5", "Claude", "Midjourney", "Runway", "ElevenLabs"],
      },
      {
        title: "Monétisation & diffusion",
        description:
          "Développez un plan de distribution et de monétisation de vos créations IA.",
        lessons: [
          {
            title: "Plateformes & licences",
            focus: "Patreon, Gumroad, NFT responsables, licences commerciales.",
            practice: "Construire une offre freemium + premium.",
          },
          {
            title: "Automatisation marketing",
            focus: "Calendrier éditorial, automatisation newsletters, analytics.",
            practice: "Mettre en place un funnel d'emails personnalisés.",
          },
        ],
      },
    ],
    project: {
      title: "Collection immersive IA",
      description:
        "Créez une mini-collection narrative (texte, visuel, audio) autour d'un thème choisi.",
      deliverables: [
        "Bible narrative + moodboard",
        "3 contenus multimédia finalisés",
        "Plan de diffusion & monétisation",
      ],
    },
    resources: [
      { label: "Template bible narrative", type: "Notion" },
      { label: "Pack de prompts créatifs", type: "Bibliothèque" },
      { label: "Guide monétisation créateurs IA", type: "Article" },
    ],
    evaluation: [
      "Revue croisée de la collection",
      "Score d'engagement narratif",
      "Plan marketing validé",
    ],
  },
};

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
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0].id);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const selectedModule = moduleDetails[selectedModuleId];
  const moduleMeta = useMemo(() => modules.find((module) => module.id === selectedModuleId), [selectedModuleId]);

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
                onClick={() => setSelectedModuleId(module.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 shadow-lg transition ${
                  selectedModuleId === module.id
                    ? "border-sky-400/80 bg-sky-50"
                    : "border-slate-200/80 bg-white hover:border-sky-300/80"
                }`}
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
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/20"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedModuleId(module.id);
                  }}
                >
                  Voir le contenu
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
          {selectedModule && moduleMeta && (
            <div className="mt-10 grid gap-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl lg:grid-cols-[320px,1fr]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{moduleMeta.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{selectedModule.summary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">Objectifs pédagogiques</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {selectedModule.objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">Prérequis</h4>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {selectedModule.prerequisites.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <SparklesIcon className="mt-0.5 h-4 w-4 text-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">Format & temps</h4>
                  <p className="mt-2 text-sm text-slate-600">{selectedModule.format}</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-500">
                    {selectedModule.timeBreakdown.map((slot) => (
                      <li key={slot.label} className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2">
                        <span className="font-medium text-slate-700">{slot.label}</span>
                        <span>{slot.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">Ressources</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {selectedModule.resources.map((resource) => (
                      <li key={resource.label} className="flex items-start justify-between gap-2 rounded-2xl border border-slate-200 px-3 py-2">
                        <div>
                          <p className="font-medium text-slate-800">{resource.label}</p>
                          <p className="text-xs uppercase tracking-wide text-slate-400">{resource.type}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => resource.link && window.open(resource.link, "_blank", "noopener,noreferrer")}
                          className={`inline-flex items-center gap-1 text-xs font-semibold transition ${
                            resource.link ? "text-sky-600 hover:text-sky-500" : "cursor-not-allowed text-slate-400"
                          }`}
                          disabled={!resource.link}
                        >
                          Explorer
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-500">Évaluation</h4>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {selectedModule.evaluation.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <SparklesIcon className="mt-0.5 h-4 w-4 text-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-8 rounded-3xl border border-slate-200/70 bg-slate-50 p-6">
                <div className="space-y-4">
                  {selectedModule.sections.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h4 className="text-lg font-semibold text-slate-900">{section.title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{section.description}</p>
                      {section.tools && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.tools.map((tool) => (
                            <span key={tool} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs text-sky-700">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 space-y-3">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.title} className="rounded-xl bg-slate-50 p-4">
                            <h5 className="text-sm font-semibold text-slate-800">{lesson.title}</h5>
                            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Focus</p>
                            <p className="text-sm text-slate-600">{lesson.focus}</p>
                            <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">Mise en pratique</p>
                            <p className="text-sm text-slate-600">{lesson.practice}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm">
                  <h4 className="text-lg font-semibold text-slate-900">{selectedModule.project.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{selectedModule.project.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {selectedModule.project.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 text-sky-400" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    Télécharger le cahier de projet
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
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
