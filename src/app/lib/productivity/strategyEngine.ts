import {
  InternalAnalysis,
  MarketAnalysis,
  ProductivityInput,
  ProductivityPlan,
  StrategicInitiative,
  ThirtyDayActionItem,
} from "./types";

/**
 * Strategy Engine module
 * ----------------------
 * Converts the insights coming from the Data Analyzer and Market Scanner into
 * a prioritised plan. The heuristics focus on clarity: every initiative has an
 * owner, an impact/effort score and a measurable KPI to ease execution.
 */
export function buildStrategy(
  input: ProductivityInput,
  internal: InternalAnalysis,
  market: MarketAnalysis,
  timeline: { label: string; productivityIndex: number }[],
  kpiTargets: { metric: string; baseline: number; projected: number; description: string }[],
): ProductivityPlan {
  const initiatives: StrategicInitiative[] = [];

  initiatives.push({
    title: "Deploy productivity command centre",
    owner: "Operations Lead",
    impact: "High",
    effort: "Medium",
    description:
      "Unify KPI dashboards, workflows and accountability rituals in a single command centre to orchestrate weekly sprints.",
    kpi: "Cycle time per core process",
    timeline: "Kick-off within 2 weeks",
  });

  if (internal.improvementLevers.some((lever) => lever.toLowerCase().includes("automation"))) {
    initiatives.push({
      title: "Automation discovery sprint",
      owner: "Process Excellence",
      impact: "High",
      effort: "Medium",
      description: "Prioritise top manual workflows, design automations and pilot with high ROI teams.",
      kpi: "Hours saved per month",
      timeline: "Design sprint in week 1, pilot in week 3",
    });
  }

  initiatives.push({
    title: "Market positioning refresh",
    owner: "Go-To-Market",
    impact: "Medium",
    effort: "Medium",
    description:
      `Translate market insights into differentiated messaging and enablement assets, focusing on ${market.opportunitySignals[0] || "top growth lever"}.`,
    kpi: "Win rate vs key competitors",
    timeline: "Launch new positioning in 30 days",
  });

  const thirtyDayPlan: ThirtyDayActionItem[] = [
    {
      dayRange: "Jours 1 - 10",
      objective: "Aligner les équipes et sécuriser des quick wins",
      actions: [
        "Mettre en place une gouvernance hebdomadaire dédiée à la productivité",
        "Cartographier les flux de travail prioritaires et mesurer la ligne de base",
        "Communiquer la vision et les objectifs de gain de productivité à toute l'entreprise",
      ],
    },
    {
      dayRange: "Jours 11 - 20",
      objective: "Industrialiser l'automatisation et la prise de décision",
      actions: [
        "Lancer les sprints d'automatisation sur les tâches manuelles identifiées",
        "Déployer un tableau de bord partagé avec indicateurs temps-réel",
        "Former les responsables d'équipe à la lecture des insights et à l'ajustement des plans",
      ],
    },
    {
      dayRange: "Jours 21 - 30",
      objective: "Mesurer, optimiser et préparer l'échelle",
      actions: [
        "Mesurer les impacts par équipe et publier un rapport de résultats",
        "Étendre les initiatives les plus rentables et archiver les leçons apprises",
        "Planifier les investissements complémentaires (outils, talents, partenaires)",
      ],
    },
  ];

  return {
    companyName: input.companyName,
    industry: input.industry,
    generatedAt: new Date().toISOString(),
    internalAnalysis: internal,
    marketAnalysis: market,
    strategicInitiatives: initiatives,
    thirtyDayPlan,
    kpiProjections: kpiTargets,
    productivityTimeline: timeline,
    summary:
      "Un plan d'action structuré pour générer des gains de productivité mesurables, aligner les équipes et accélérer l'exécution.",
  };
}
