import { ProductivityInput, InternalAnalysis } from "./types";

/**
 * Data Analyzer module
 * ---------------------
 * Applies lightweight heuristics to transform raw company inputs into
 * strengths, weaknesses and immediate risk alerts that can be consumed by
 * the strategy engine. The rules are intentionally transparent so they can be
 * audited and extended with real ML models later on.
 */
export function analyzeInternalData(input: ProductivityInput): InternalAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const improvementLevers: string[] = [];
  const riskAlerts: string[] = [];

  if (input.teamSize <= 15) {
    strengths.push("Agile team able to pivot quickly and adopt new processes in weeks");
    improvementLevers.push("Formalise knowledge sharing to avoid single points of failure");
  } else if (input.teamSize <= 60) {
    strengths.push("Mid-sized workforce with enough capacity to pilot parallel initiatives");
    improvementLevers.push("Introduce squad-based ownership with weekly operating cadences");
  } else {
    strengths.push("Scaled organisation capable of funding automation and analytics investments");
    weaknesses.push("Operational inertia risks slowing adoption of new workflows");
    riskAlerts.push("Change management program required to sustain adoption across large teams");
  }

  if (input.revenue < 1_000_000) {
    weaknesses.push("Revenue below industry median suggests pricing or go-to-market gaps");
    improvementLevers.push("Prioritise revenue operations automation to remove manual leakage");
  } else if (input.revenue < 10_000_000) {
    strengths.push("Healthy revenue base to finance process optimisation sprints");
    improvementLevers.push("Create quarterly pipeline forecast rituals to unlock compounding gains");
  } else {
    strengths.push("Strong revenue engine ready for advanced analytics and AI copilots");
    improvementLevers.push("Deploy predictive insights to improve allocation of senior talent");
  }

  if (input.challenges.toLowerCase().includes("communication")) {
    weaknesses.push("Cross-team communication friction is slowing decision cycles");
    improvementLevers.push("Adopt shared OKR dashboards with async status rituals");
  }

  if (input.challenges.toLowerCase().includes("manual")) {
    weaknesses.push("High manual workload identified, automation opportunities available");
    improvementLevers.push("Map repetitive workflows and prioritise RPA or no-code automation");
  }

  if (input.productivityGoal >= 50) {
    riskAlerts.push(
      "Ambitious productivity uplift requires phased roadmap with clear accountability",
    );
    improvementLevers.push("Bundle initiatives into quarterly horizons with measurable ROI gates");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("No major internal bottlenecks detected. Focus on scaling winning plays.");
  }

  return {
    strengths,
    weaknesses,
    improvementLevers,
    riskAlerts,
  };
}
