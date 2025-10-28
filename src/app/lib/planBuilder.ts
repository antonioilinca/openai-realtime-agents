import type {
  GeneratedPlan,
  PlanGenerationPayload,
  PlanResponse,
  BusinessModelCanvas,
  SwotAnalysis,
  CompetitorInsight,
  TimelineMilestone,
  BudgetOverview,
  MarketingPlan,
  AiRecommendation,
  MarketingPlay,
} from "@/app/types";

const defaultConfidence: AiRecommendation["confidence"] = "Modérée";

function splitText(text: string, separator = /[\n\r]+/) {
  return text
    .split(separator)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function fallbackBusinessModel(payload: PlanGenerationPayload): BusinessModelCanvas {
  const { overview, market, offer, operations, financials } = payload.input;
  return {
    keyPartners: splitText(`${operations.team}\n${market.competitors}`).slice(0, 6),
    keyActivities: splitText(`${offer.signatureOffer}\n${operations.processes}`).slice(0, 6),
    keyResources: splitText(`${overview.differentiator}\n${operations.automationWish}`).slice(0, 6),
    valuePropositions: splitText(offer.valueProposition).slice(0, 5),
    customerRelationships: splitText(`${offer.proofPoints}\nExpérience client signature`).slice(0, 5),
    channels: splitText(`${market.targetCustomers}\n${offer.pricingModel}`).slice(0, 5),
    customerSegments: splitText(market.targetCustomers).slice(0, 5),
    costStructure: [
      `Charges fixes mensuelles estimées à ${financials.monthlyFixedCosts.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
      `Budget marketing aligné sur un CAC cible de ${financials.expectedCAC.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
      `Investissements innovation : ${operations.automationWish || "stack IA immersive"}`,
    ],
    revenueStreams: [
      offer.pricingModel,
      `Objectif de CA mensuel : ${financials.monthlyRevenueTarget.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
      `Panier moyen visé : ${financials.averageOrderValue.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
    ],
    commentary: `Modèle ${overview.sector.toLowerCase()} propulsé par ${offer.valueProposition.toLowerCase()} et une différenciation forte sur ${overview.differentiator.toLowerCase()}.`,
  };
}

function fallbackSwot(payload: PlanGenerationPayload): SwotAnalysis {
  const { overview, market, offer, operations } = payload.input;
  return {
    strengths: splitText(`${offer.valueProposition}\n${operations.team}\n${overview.differentiator}`).slice(0, 5),
    weaknesses: splitText(`${operations.risks}\nOrganisation à industrialiser`).slice(0, 5),
    opportunities: splitText(`${market.keyTrends}\n${market.coreNeed}`).slice(0, 5),
    threats: splitText(`${market.competitors}\nRythme d’exécution insuffisant`).slice(0, 5),
    summary:
      "Analyse SWOT générée sans IA avancée : amplifier vos forces différenciantes, capitaliser sur la tendance clé et sécuriser l’exécution face aux concurrents rapides.",
  };
}

function fallbackCompetition(payload: PlanGenerationPayload): CompetitorInsight[] {
  const competitors = splitText(payload.input.market.competitors);
  if (!competitors.length) {
    return [
      {
        name: "Acteur historique",
        positioning: "Positionnement premium sur le même segment",
        pricing: "Tarifs supérieurs de 20%",
        value: "Large portefeuille clients et confiance de marque",
        differentiation: "Mettre en avant votre agilité et la personnalisation",
      },
    ];
  }
  return competitors.slice(0, 5).map((competitor, index) => ({
    name: competitor,
    positioning: `Positionnement ${index === 0 ? "premium" : "milieu de gamme"}.`,
    pricing: index === 0 ? "Tarifs plus élevés" : "Tarification proche du marché",
    value: "Forces perçues : notoriété, réseau ou innovation produit.",
    differentiation:
      index === 0
        ? "Accent sur l’expérience client sur-mesure."
        : "Capitaliser sur votre proposition de valeur unique.",
  }));
}

function fallbackTimeline(payload: PlanGenerationPayload): TimelineMilestone[] {
  const { objectives } = payload.input.overview;
  const defaultActions = splitText(payload.input.operations.processes).slice(0, 6);
  const missions = objectives.length
    ? objectives
    : [{ id: "0", label: payload.input.overview.elevatorPitch, horizon: "60j" }];

  return [
    {
      phase: "30j",
      focus: `Alignement ${payload.input.overview.projectName}`,
      keyActions: [
        "Finaliser l’offre et les messages clés",
        `Cartographier les concurrents identifiés (${missions[0]?.label ?? "Objectif principal"})`,
        defaultActions[0] ?? "Documenter les process cœur",
      ],
      owner: payload.input.overview.projectName
        ? `Équipe ${payload.input.overview.projectName}`
        : "Équipe fondatrice",
      successMetrics: ["Brief stratégique validé", "KPI de base suivis"],
      automationIdeas: [payload.input.operations.automationWish || "Automatiser la collecte des prospects"],
    },
    {
      phase: "60j",
      focus: "Accélération acquisition",
      keyActions: [
        missions.find((obj) => obj.horizon === "60j")?.label ?? "Lancer deux campagnes d’acquisition",
        "Structurer le pipeline commercial",
        defaultActions[1] ?? "Onboarder les premiers clients",
      ],
      owner: "Marketing & Growth",
      successMetrics: ["Taux de conversion > objectif", "Base de prospects qualifiés"],
      automationIdeas: ["Mettre en place un CRM automatisé"],
    },
    {
      phase: "90j",
      focus: "Industrialisation et ROI",
      keyActions: [
        missions.find((obj) => obj.horizon === "90j")?.label ?? "Optimiser le parcours client",
        "Analyser la rentabilité par canal",
        "Renforcer les partenariats clés",
      ],
      owner: "Direction & Ops",
      successMetrics: ["ROI positif", "Satisfaction client > 4,5/5"],
      automationIdeas: ["Scénarios d’emailing avancés", "Tableau de bord financier automatisé"],
    },
  ];
}

function fallbackBudget(payload: PlanGenerationPayload): BudgetOverview {
  const { financials } = payload.input;
  const expectedClients = financials.expectedCAC > 0
    ? Math.round(Math.max(financials.availableBudget / financials.expectedCAC, 1))
    : 50;
  const revenueEstimate = financials.monthlyRevenueTarget || financials.averageOrderValue * expectedClients;
  return {
    fixedCosts: [
      { label: "Charges fixes mensuelles", amount: financials.monthlyFixedCosts },
      { label: "Équipe & freelances", amount: Math.round(financials.monthlyFixedCosts * 0.35) },
    ],
    variableCosts: [
      { label: "Marketing & acquisition", amount: Math.round(financials.expectedCAC * expectedClients) },
      { label: "Expérience client premium", amount: Math.round(financials.averageOrderValue * 0.3 * expectedClients) },
    ],
    projectedRevenues: [
      { label: "Ventes prévues", amount: revenueEstimate },
      { label: "Upsell / expansion", amount: Math.round(revenueEstimate * 0.2) },
    ],
    breakEvenPoint: `Point mort estimé à ${Math.max(
      Math.ceil((financials.monthlyFixedCosts || 1) / Math.max(financials.averageOrderValue - financials.expectedCAC, 1)),
      1,
    )} clients mensuels`,
    runwayComment: `Runway estimé : ${financials.runwayMonths} mois avec le budget actuel.`,
    roiProjection: `Objectif : atteindre ${financials.monthlyRevenueTarget.toLocaleString("fr-FR")} € de CA mensuel et rentabiliser chaque euro investi en ${financials.expectedCAC.toLocaleString("fr-FR")} € de CAC.`,
    alerts: [
      financials.availableBudget < financials.monthlyFixedCosts
        ? "Budget insuffisant pour couvrir un mois de charges fixes"
        : "Budget cohérent avec le plan de marche",
      financials.runwayMonths < 4
        ? "Sécuriser un coussin de trésorerie supplémentaire"
        : "Runway confortable pour dérouler le plan",
    ],
  };
}

function fallbackMarketing(payload: PlanGenerationPayload): MarketingPlan {
  const sector = payload.input.overview.sector.toLowerCase();
  const plays: MarketingPlay[] = [
    {
      audience: payload.input.market.targetCustomers || "Segment principal",
      promise: payload.input.offer.valueProposition,
      channel: sector.includes("saas") ? "LinkedIn + webinars" : "Campagnes sociales ciblées",
      funnelStage: "Awareness",
      contentIdeas: ["Série de contenus pédagogiques", "Témoignage client"],
      kpis: ["Trafic qualifié", "Nombre de leads"],
      automationStack: ["CRM", "Outil de marketing automation"],
    },
    {
      audience: "Prospects chauds",
      promise: "Démonstration de valeur et rassurance",
      channel: "Email nurturing + retargeting",
      funnelStage: "Conversion",
      contentIdeas: ["Séquences email personnalisées", "Offre découverte"],
      kpis: ["Taux de conversion", "Panier moyen"],
      automationStack: ["Scénarios d’emailing", "Notion HQ pour le suivi"],
    },
    {
      audience: "Clients actifs",
      promise: "Maximiser la fidélisation",
      channel: "Communauté + Customer Success",
      funnelStage: "Fidélisation",
      contentIdeas: ["Programme ambassadeurs", "Contenus exclusifs"],
      kpis: ["NPS", "Taux de réachat"],
      automationStack: ["Outil de support", "Dashboard satisfaction"],
    },
  ];

  return {
    northStarMetric:
      (sector.includes("commerce") ? "Croissance du panier moyen et" : "") + " revenu mensuel récurrent",
    acquisitionStrategy:
      "Combiner contenu expert, campagnes ciblées et partenariats influenceurs pour générer un flux continu de prospects qualifiés.",
    conversionStrategy:
      "Mettre en scène des preuves sociales percutantes, des démos personnalisées et une offre irrésistible pour convertir vite.",
    retentionStrategy:
      "Déployer un onboarding premium, mesurer le feedback en continu et proposer des offres d’expansion à forte valeur.",
    automationPrinciples: [
      "Synchroniser CRM et outils de support pour une vision 360°",
      "Automatiser les alertes KPI critiques",
      payload.input.operations.automationWish || "Centraliser les données marketing",
    ],
    plays,
  };
}

function fallbackAiRecommendation(payload: PlanGenerationPayload): AiRecommendation {
  return {
    quickWins: [
      "Valider le message de valeur via 5 entretiens clients de votre segment idéal",
      "Mettre en place un cockpit Notion/Sheets pour piloter les KPI clés en temps réel",
    ],
    strategicLevers: [
      "Structurer un programme ambassadeurs pour amplifier le bouche-à-oreille",
      "Sécuriser 2 partenariats distribution ou influenceurs complémentaires",
    ],
    watchpoints: [
      "Suivre le tempo d’exécution vs. ambitions commerciales",
      payload.input.operations.risks || "Veiller à la qualité de l’expérience client",
    ],
    prediction90d:
      "En déroulant ce plan, vous pouvez générer une traction puissante en 90 jours avec des revenus récurrents en forte hausse et une marque remarquée sur votre marché.",
    confidence: defaultConfidence,
  };
}

export function fallbackPlan(payload: PlanGenerationPayload): PlanResponse {
  const plan: GeneratedPlan = {
    executiveSummary: `Plan haute intensité généré pour ${payload.input.overview.projectName || "votre projet"}. Nous concentrons l’effort sur ${payload.input.overview.objectives
      .map((o) => o.label)
      .slice(0, 3)
      .join(", ") || "vos jalons clés"}, avec un focus ${payload.input.overview.sector.toLowerCase()} et un ton résolument ambitieux.`,
    businessModel: fallbackBusinessModel(payload),
    swot: fallbackSwot(payload),
    competition: fallbackCompetition(payload),
    timeline: fallbackTimeline(payload),
    budget: fallbackBudget(payload),
    marketing: fallbackMarketing(payload),
    aiRecommendation: fallbackAiRecommendation(payload),
  };

  return {
    plan,
    aiNotes:
      "Plan généré via le moteur interne Atlas. Ajoutez des détails marché ou traction pour encore plus de finesse puis itérez avec l’IA copilote.",
    version: payload.mode === "iterate" ? 2 : 1,
  };
}

export function buildPlanPrompt(payload: PlanGenerationPayload): string {
  const { overview } = payload.input;
  const conversationSnippet = payload.conversation
    ?.map((msg) => `${msg.role === "utilisateur" ? "Utilisateur" : "Assistant"} : ${msg.content}`)
    .join("\n") ?? "";

  return `Tu es Stratège Copilote pour projets francophones. Génère un plan d’action complet en JSON strict selon le schéma fourni. Tout doit être rédigé en français professionnel, sans anglicismes inutiles.

SCHÉMA JSON ATTENDU:
{
  "plan": {
    "executiveSummary": string,
    "businessModel": {
      "keyPartners": string[],
      "keyActivities": string[],
      "keyResources": string[],
      "valuePropositions": string[],
      "customerRelationships": string[],
      "channels": string[],
      "customerSegments": string[],
      "costStructure": string[],
      "revenueStreams": string[],
      "commentary": string
    },
    "swot": {
      "strengths": string[],
      "weaknesses": string[],
      "opportunities": string[],
      "threats": string[],
      "summary": string
    },
    "competition": [{
      "name": string,
      "positioning": string,
      "pricing": string,
      "value": string,
      "differentiation": string
    }],
    "timeline": [{
      "phase": "30j" | "60j" | "90j",
      "focus": string,
      "keyActions": string[],
      "owner": string,
      "successMetrics": string[],
      "automationIdeas": string[]
    }],
    "budget": {
      "fixedCosts": [{ "label": string, "amount": number }],
      "variableCosts": [{ "label": string, "amount": number }],
      "projectedRevenues": [{ "label": string, "amount": number }],
      "breakEvenPoint": string,
      "runwayComment": string,
      "roiProjection": string,
      "alerts": string[]
    },
    "marketing": {
      "northStarMetric": string,
      "acquisitionStrategy": string,
      "conversionStrategy": string,
      "retentionStrategy": string,
      "automationPrinciples": string[],
      "plays": [{
        "audience": string,
        "promise": string,
        "channel": string,
        "funnelStage": "Awareness" | "Consideration" | "Conversion" | "Fidélisation",
        "contentIdeas": string[],
        "kpis": string[],
        "automationStack": string[]
      }]
    },
    "aiRecommendation": {
      "quickWins": string[],
      "strategicLevers": string[],
      "watchpoints": string[],
      "prediction90d": string,
      "confidence": "Faible" | "Modérée" | "Élevée"
    }
  },
  "aiNotes": string,
  "version": number
}

DONNÉES PROJET:
${JSON.stringify(payload.input, null, 2)}

PLAN EXISTANT: ${payload.previousPlan ? JSON.stringify(payload.previousPlan) : "aucun"}

CONVERSATION:
${conversationSnippet}

MODE: ${payload.mode}

INSTRUCTIONS:
- Vérifier la cohérence budget/ambition.
- Adapter le vocabulaire au secteur ${overview.sector}.
- Fournir des montants numériques sans symbole € dans le JSON.
- Mettre en avant les automatisations pertinentes.
- Si itération, intégrer les ajustements demandés.
- Délivrer un plan spectaculaire et immédiatement actionnable sans poser de questions supplémentaires.
- Prioriser les actions à fort levier et préciser les livrables clés.
`;
}

export function parsePlanFromModel(response: string): PlanResponse | null {
  try {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleaned) as PlanResponse;
    return parsed;
  } catch (error) {
    console.error("Impossible de parser la réponse du modèle", error);
    return null;
  }
}
