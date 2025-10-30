import type {
  AnalyzeRequest,
  AnalysisResponse,
  AuthResponse,
  DocumentRequest,
  DocumentResponse,
  LoginRequest,
  PlanRequest,
  PlanResponse,
  SignupRequest,
  SourceLogResponse,
  UserProfile,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function jsonFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function analyzeSituation(payload: AnalyzeRequest): Promise<AnalysisResponse> {
  return jsonFetch<AnalysisResponse>("/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function generatePlan(payload: PlanRequest): Promise<PlanResponse> {
  return jsonFetch<PlanResponse>("/plan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function generateDocument(payload: DocumentRequest): Promise<DocumentResponse> {
  return jsonFetch<DocumentResponse>("/document", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchSources(planId: string): Promise<SourceLogResponse> {
  return jsonFetch<SourceLogResponse>(`/sources/${planId}`);
}

export async function signup(payload: SignupRequest): Promise<AuthResponse> {
  return jsonFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  return jsonFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchProfile(): Promise<UserProfile> {
  return jsonFetch<UserProfile>("/auth/profile");
}
