import { analyzeInternalData } from "./dataAnalyzer";
import { scanMarket } from "./marketScanner";
import { buildKPIVisuals } from "./kpiVisualizer";
import { buildStrategy } from "./strategyEngine";
import { ProductivityInput, ProductivityPlan } from "./types";

/**
 * High level orchestration helper that glues all productivity modules together.
 */
export function runProductivityEngine(input: ProductivityInput): ProductivityPlan {
  const internal = analyzeInternalData(input);
  const market = scanMarket(input);
  const visuals = buildKPIVisuals(input);

  return buildStrategy(input, internal, market, visuals.timeline, visuals.kpis);
}
