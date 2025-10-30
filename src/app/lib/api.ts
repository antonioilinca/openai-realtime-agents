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

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

function resolveApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromEnv) {
    return trimTrailingSlash(fromEnv);
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname, port } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      const apiPort = port && port !== "3000" ? port : "8000";
      return `${protocol}//${hostname}:${apiPort}/api`;
    }
    const portSuffix = port ? `:${port}` : "";
    return `${protocol}//${hostname}${portSuffix}/api`;
  }

  return "http://localhost:8000/api";
}

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function jsonFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const base = resolveApiBase();
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
  } catch (error) {
    throw new Error(
      "Connexion au serveur Lexora impossible. Vérifiez que le backend est démarré et accessible.",
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && payload && typeof payload === "object") {
      const detail = (payload as { detail?: unknown }).detail;
      if (typeof detail === "string") {
        throw new Error(detail);
      }
      if (Array.isArray(detail) && detail.length > 0) {
        const first = detail[0] as { msg?: string };
        if (first?.msg) {
          throw new Error(first.msg);
        }
      }
    }
    if (typeof payload === "string" && payload.trim().length > 0) {
      throw new Error(payload);
    }
    throw new Error(`Request failed (${response.status})`);
  }

  return payload as T;
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
