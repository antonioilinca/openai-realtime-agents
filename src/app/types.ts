export type StageLevel = "Idée" | "Prototype" | "Lancement" | "Croissance" | "Relance";

export interface Objective {
  id: string;
  label: string;
  horizon: "30j" | "60j" | "90j" | "Long terme";
}

export interface ProjectOverview {
  projectName: string;
  elevatorPitch: string;
  sector: string;
  stage: StageLevel;
  vision: string;
  differentiator: string;
  objectives: Objective[];
}

export interface MarketInsights {
  targetCustomers: string;
  coreNeed: string;
  keyTrends: string;
  competitors: string;
}

export interface OfferDetails {
  signatureOffer: string;
  valueProposition: string;
  pricingModel: string;
  proofPoints: string;
}

export interface OperationsSetup {
  team: string;
  processes: string;
  automationWish: string;
  risks: string;
}

export interface FinancialInputs {
  availableBudget: number;
  monthlyRevenueTarget: number;
  monthlyFixedCosts: number;
  expectedCAC: number;
  averageOrderValue: number;
  runwayMonths: number;
}

export interface ProjectInput {
  overview: ProjectOverview;
  market: MarketInsights;
  offer: OfferDetails;
  operations: OperationsSetup;
  financials: FinancialInputs;
  language: "fr" | "en";
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
  commentary: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  summary: string;
}

export interface CompetitorInsight {
  name: string;
  positioning: string;
  pricing: string;
  value: string;
  differentiation: string;
}

export interface TimelineMilestone {
  phase: "30j" | "60j" | "90j";
  focus: string;
  keyActions: string[];
  owner: string;
  successMetrics: string[];
  automationIdeas: string[];
}

export interface BudgetOverview {
  fixedCosts: { label: string; amount: number }[];
  variableCosts: { label: string; amount: number }[];
  projectedRevenues: { label: string; amount: number }[];
  breakEvenPoint: string;
  runwayComment: string;
  roiProjection: string;
  alerts: string[];
}

export interface MarketingPlay {
  audience: string;
  promise: string;
  channel: string;
  funnelStage: "Awareness" | "Consideration" | "Conversion" | "Fidélisation";
  contentIdeas: string[];
  kpis: string[];
  automationStack: string[];
}

export interface MarketingPlan {
  northStarMetric: string;
  acquisitionStrategy: string;
  conversionStrategy: string;
  retentionStrategy: string;
  automationPrinciples: string[];
  plays: MarketingPlay[];
}

export interface AiRecommendation {
  quickWins: string[];
  strategicLevers: string[];
  watchpoints: string[];
  prediction90d: string;
  confidence: "Faible" | "Modérée" | "Élevée";
}

export interface GeneratedPlan {
  executiveSummary: string;
  businessModel: BusinessModelCanvas;
  swot: SwotAnalysis;
  competition: CompetitorInsight[];
  timeline: TimelineMilestone[];
  budget: BudgetOverview;
  marketing: MarketingPlan;
  aiRecommendation: AiRecommendation;
}

export interface PlanResponse {
  plan: GeneratedPlan;
  aiNotes: string;
  version: number;
}

export interface IterationMessage {
  id: string;
  role: "utilisateur" | "assistant";
  content: string;
  createdAt: string;
}

export interface IterationResponse {
  notes: string;
  plan?: GeneratedPlan;
}

export interface PlanGenerationPayload {
  input: ProjectInput;
  previousPlan?: GeneratedPlan;
  conversation?: IterationMessage[];
  mode: "generate" | "iterate";
  userMessage?: string;
}
