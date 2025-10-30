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

const ensureApiPath = (pathname: string) => {
  if (!pathname || pathname === "/") {
    return "/api";
  }

  const normalised = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (normalised.endsWith("/api")) {
    return normalised;
  }

  return `${normalised}/api`;
};

const normaliseEnvUrl = (rawValue: string): string | null => {
  const candidate = rawValue.trim();
  if (!candidate) {
    return null;
  }

  const hasScheme = candidate.includes("://");
  const looksLikeHost = /^[a-z0-9.-]+(?::\d+)?$/i.test(candidate);

  if (!hasScheme && !looksLikeHost) {
    // Likely a relative path (e.g. "/api") – fallback to runtime detection.
    return null;
  }

  try {
    const url = new URL(hasScheme ? candidate : `http://${candidate}`);
    url.pathname = ensureApiPath(url.pathname);
    url.search = "";
    url.hash = "";
    return trimTrailingSlash(url.toString());
  } catch (error) {
    console.warn("NEXT_PUBLIC_API_URL invalide, retour au comportement par défaut", error);
    return null;
  }
};

export function resolveApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  const normalisedEnv = fromEnv ? normaliseEnvUrl(fromEnv) : null;
  if (normalisedEnv) {
    return normalisedEnv;
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
    if (!isJson && typeof payload === "string" && payload.includes("This page could not be found")) {
      throw new Error(
        "Le backend Lexora n'est pas accessible via l'URL configurée. Vérifiez NEXT_PUBLIC_API_URL ou le port 8000.",
      );
    }
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
