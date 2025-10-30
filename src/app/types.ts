export type Domain = "conso" | "logement" | "travail";

export type AccountType = "individual" | "company";

export interface AnalyzeRequest {
  situation: string;
  domain: Domain;
}

export interface ClassificationEntities {
  dates: string[];
  amounts: number[];
  parties: string[];
}

export interface ClassificationResult {
  branch: string;
  sub_branch: string;
  entities: ClassificationEntities;
  clarifying_questions: string[];
}

export interface Citation {
  eli: string;
  nor?: string | null;
  url: string;
  version?: string | null;
  hash?: string | null;
  summary?: string | null;
}

export interface AnalysisResponse {
  analysis_id: string;
  classification: ClassificationResult;
  citations: Citation[];
  summary: string;
  confidence: number;
}

export interface PlanRequest {
  analysisId: string;
  goals: string[];
}

export interface PlanStep {
  step: string;
  legal_basis: string[];
  deadline?: string | null;
  authority?: string | null;
  cost?: string | null;
  required_docs: string[];
}

export interface PlanResponse {
  plan_id: string;
  steps: PlanStep[];
  deadlines: string[];
  costs: string[];
  authorities: string[];
  kpis: Record<string, unknown>;
  audience_focus?: string | null;
}

export interface DocumentRequest {
  planId: string;
  templateId: string;
  vars: Record<string, unknown>;
}

export interface DocumentResponse {
  pdfUrl: string;
}

export interface SourceLogItem {
  eli: string;
  url: string;
  version: string;
  hash: string;
  extracted_at: string;
}

export interface SourceLogResponse {
  items: SourceLogItem[];
}

export interface SignupRequest {
  email: string;
  password: string;
  accountType: AccountType;
  fullName: string;
  companyName?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  accountType: AccountType;
  displayName: string;
  companyName?: string | null;
}

export interface AuthResponse {
  token: string;
  profile: UserProfile;
}

export interface ProcedurePreview {
  step: string;
  deadline?: string;
  authority?: string;
  cost?: string;
}

export interface TemplatePreview {
  id: string;
  label: string;
  description: string;
}
