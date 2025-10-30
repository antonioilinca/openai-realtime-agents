/**
 * Shared domain types describing the inputs and outputs of the Productivity Booster AI engine.
 * Each interface is intentionally explicit so the analysis, strategy and PDF modules can evolve independently
 * while keeping type-safety between the backend API and the React client.
 */
export interface ProductivityInput {
  companyName: string;
  industry: string;
  teamSize: number;
  revenue: number;
  challenges: string;
  productivityGoal: number;
}

export interface InternalAnalysis {
  strengths: string[];
  weaknesses: string[];
  improvementLevers: string[];
  riskAlerts: string[];
}

export interface MarketCompetitorInsight {
  name: string;
  positioning: string;
  differentiator: string;
  priorityAction: string;
}

export interface MarketAnalysis {
  summary: string;
  competitorInsights: MarketCompetitorInsight[];
  opportunitySignals: string[];
}

export interface StrategicInitiative {
  title: string;
  owner: string;
  impact: "High" | "Medium" | "Low";
  effort: "High" | "Medium" | "Low";
  description: string;
  kpi: string;
  timeline: string;
}

export interface ThirtyDayActionItem {
  dayRange: string;
  objective: string;
  actions: string[];
}

export interface KPIProjection {
  metric: string;
  baseline: number;
  projected: number;
  description: string;
}

export interface ProductivityTimelinePoint {
  label: string;
  productivityIndex: number;
}

export interface ProductivityPlan {
  companyName: string;
  industry: string;
  generatedAt: string;
  internalAnalysis: InternalAnalysis;
  marketAnalysis: MarketAnalysis;
  strategicInitiatives: StrategicInitiative[];
  thirtyDayPlan: ThirtyDayActionItem[];
  kpiProjections: KPIProjection[];
  productivityTimeline: ProductivityTimelinePoint[];
  summary: string;
}
