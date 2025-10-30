import { KPIProjection, ProductivityInput, ProductivityTimelinePoint } from "./types";

/**
 * KPI Visualizer module
 * ---------------------
 * Builds synthetic KPI trajectories leveraging the productivity target. The
 * outputs feed the Recharts visualisations on the client and the PDF exporter.
 */
export function buildKPIVisuals(
  input: ProductivityInput,
): { timeline: ProductivityTimelinePoint[]; kpis: KPIProjection[] } {
  const baseProductivity = 100;
  const goalMultiplier = 1 + input.productivityGoal / 100;

  const timeline: ProductivityTimelinePoint[] = [
    { label: "Semaine 1", productivityIndex: Math.round(baseProductivity * 0.9) },
    { label: "Semaine 2", productivityIndex: Math.round(baseProductivity * 0.98) },
    { label: "Semaine 3", productivityIndex: Math.round(baseProductivity * 1.1) },
    { label: "Semaine 4", productivityIndex: Math.round(baseProductivity * goalMultiplier) },
    { label: "Semaine 5", productivityIndex: Math.round(baseProductivity * goalMultiplier * 1.05) },
  ];

  const kpis: KPIProjection[] = [
    {
      metric: "Heures économisées / mois",
      baseline: Math.round(input.teamSize * 10 * 0.2),
      projected: Math.round(input.teamSize * 10 * goalMultiplier * 0.3),
      description: "Automatisation des tâches répétitives et standardisation des processus",
    },
    {
      metric: "Taux de satisfaction collaborateurs",
      baseline: 62,
      projected: Math.min(95, Math.round(62 + input.productivityGoal * 0.6)),
      description: "Réduction du stress opérationnel et des tâches manuelles",
    },
    {
      metric: "Cycle de livraison projet (jours)",
      baseline: 30,
      projected: Math.max(12, Math.round(30 - input.productivityGoal * 0.4)),
      description: "Processus mieux orchestrés et arbitrages plus rapides",
    },
  ];

  return { timeline, kpis };
}
