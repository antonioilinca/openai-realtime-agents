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
    keyPartners: splitText(
      `${operations.partnerships}\n${market.competitors}`
    ).slice(0, 6),
    keyActivities: splitText(
      `${offer.deliveryModel}\n${operations.processes}`
    ).slice(0, 6),
    keyResources: splitText(
      `${operations.team}\n${operations.tools}`
    ).slice(0, 6),
    valuePropositions: splitText(offer.valueProposition).slice(0, 5),
    customerRelationships: splitText(
      `${offer.onboarding}\n${offer.retentionStrategy}`
    ).slice(0, 5),
    channels: splitText(market.targetCustomers).slice(0, 5),
    customerSegments: splitText(market.targetCustomers).slice(0, 5),
    costStructure: [
      `Charges fixes mensuelles estimées à ${financials.monthlyFixedCosts.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
      `Coûts variables (COGS) évalués à ${financials.cogs.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
      `Investissements clés : ${operations.tools}`,
    ],
    revenueStreams: [
      offer.pricingModel,
      `Ticket moyen visé : ${financials.averageOrderValue.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`,
    ],
    commentary: `Modèle orienté ${overview.sector.toLowerCase()} avec priorités sur ${offer.valueProposition.toLowerCase()}.`,
  };
}

function fallbackSwot(payload: PlanGenerationPayload): SwotAnalysis {
  const { overview, market, offer, operations } = payload.input;
  return {
    strengths: splitText(
      `${offer.valueProposition}\n${operations.team}\n${overview.differentiator}`
    ).slice(0, 5),
    weaknesses: splitText(
      `${operations.risks}\nBudget disponible : ${payload.input.financials.availableBudget} €`
    ).slice(0, 5),
    opportunities: splitText(
      `${market.keyTrends}\n${market.pains}`
    ).slice(0, 5),
    threats: splitText(
      `${market.competitors}\n${market.regulations}`
    ).slice(0, 5),
    summary:
      "Analyse SWOT générée sans IA avancée : prioriser la différenciation, surveiller la réglementation et sécuriser les ressources critiques.",
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
  const missions = objectives.length ? objectives : [{ id: "0", label: payload.input.overview.mission, horizon: "60j" }];

  return [
    {
      phase: "30j",
      focus: `Alignement ${payload.input.overview.projectName}`,
      keyActions: [
        "Finaliser l’offre et les messages clés",
        `Cartographier les concurrents identifiés (${missions[0]?.label ?? "Objectif principal"})`,
        defaultActions[0] ?? "Documenter les process cœur",
      ],
      owner: payload.input.overview.founderName || "Équipe fondatrice",
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
  const revenueEstimate = financials.averageOrderValue * 100;
  return {
    fixedCosts: [
      { label: "Charges fixes mensuelles", amount: financials.monthlyFixedCosts },
      { label: "Équipe & freelances", amount: Math.round(financials.monthlyFixedCosts * 0.35) },
    ],
    variableCosts: [
      { label: "Marketing & acquisition", amount: Math.round(financials.expectedCAC * 50) },
      { label: "Coûts variables", amount: financials.cogs },
    ],
    projectedRevenues: [
      { label: "Ventes prévues", amount: revenueEstimate },
      { label: "Upsell / cross-sell", amount: Math.round(revenueEstimate * 0.15) },
    ],
    breakEvenPoint: `Point mort estimé à ${Math.ceil(
      (financials.monthlyFixedCosts + financials.cogs) /
        Math.max(financials.averageOrderValue - financials.expectedCAC, 1)
    )} clients par mois`,
    runwayComment: `Runway estimé : ${financials.runwayMonths} mois.`,
    roiProjection: `ROI potentiel sur 90j si ${financials.expectedConversionRate}% de conversion et panier moyen de ${financials.averageOrderValue} €`,
    alerts: [
      financials.availableBudget < financials.monthlyFixedCosts
        ? "Budget insuffisant pour couvrir un mois de charges fixes"
        : "Budget cohérent avec le plan de marche",
      financials.fundingNeeds > 0
        ? `Prévoir une levée de ${financials.fundingNeeds} €`
        : "Pas de levée immédiate nécessaire",
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
    northStarMetric: "Croissance du revenu mensuel récurrent" + (sector.includes("commerce") ? " et panier moyen" : ""),
    acquisitionStrategy: "Combiner contenu expert, prospection ciblée et partenariats pour générer un flux régulier de leads qualifiés.",
    conversionStrategy: "Miser sur la preuve sociale, des démonstrations live et une offre d’essai pour rassurer et convertir.",
    retentionStrategy: "Mettre en place un onboarding premium, mesurer le feedback en continu et proposer des upsells pertinents.",
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
      "Valider le message de valeur via 5 entretiens clients",
      "Mettre en place un tableau de bord Notion pour piloter les KPI clés",
    ],
    strategicLevers: [
      "Structurer un programme ambassadeurs pour accélérer le bouche-à-oreille",
      "Sécuriser 2 partenariats distribution complémentaires",
    ],
    watchpoints: [
      "Suivre l’évolution réglementaire évoquée",
      payload.input.operations.risks || "Veiller à la qualité de l’expérience client",
    ],
    prediction90d: "En respectant ce plan, une traction commerciale significative peut émerger d’ici 3 mois avec un premier ROI mesurable.",
    confidence: defaultConfidence,
  };
}

export function fallbackPlan(payload: PlanGenerationPayload): PlanResponse {
  const plan: GeneratedPlan = {
    executiveSummary: `Plan généré avec le moteur interne pour ${payload.input.overview.projectName}. Priorités : ${payload.input.overview.objectives
      .map((o) => o.label)
      .slice(0, 3)
      .join(", ")}.`,
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
      "Le plan a été généré sans appel à une API externe. Ajustez les données de marché dès que possible pour plus de précision.",
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
