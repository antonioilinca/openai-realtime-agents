"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type {
  GeneratedPlan,
  IterationMessage,
  PlanGenerationPayload,
  PlanResponse,
} from "@/app/types";

interface UsePlanGeneratorResult {
  plan: GeneratedPlan | null;
  isLoading: boolean;
  error: string | null;
  version: number;
  conversation: IterationMessage[];
  aiNotes: string;
  generatePlan: (payload: PlanGenerationPayload) => Promise<void>;
  iteratePlan: (message: string, payload: PlanGenerationPayload) => Promise<void>;
}

export function usePlanGenerator(): UsePlanGeneratorResult {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const [aiNotes, setAiNotes] = useState("");
  const [conversation, setConversation] = useState<IterationMessage[]>([]);

  const requestPlan = async (payload: PlanGenerationPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Le moteur stratégique a rencontré un blocage.");
      }
      const data: PlanResponse = await response.json();
      setPlan(data.plan);
      setVersion(data.version);
      setAiNotes(data.aiNotes);
      const assistantMessage: IterationMessage = {
        id: uuidv4(),
        role: "assistant",
        content: data.aiNotes,
        createdAt: new Date().toISOString(),
      };
      setConversation((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Erreur inconnue lors de la génération du plan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlan = async (payload: PlanGenerationPayload) => {
    setConversation([
      {
        id: uuidv4(),
        role: "utilisateur",
        content: "Présentation initiale du projet envoyée.",
        createdAt: new Date().toISOString(),
      },
    ]);
    await requestPlan({ ...payload, mode: "generate" });
  };

  const iteratePlan = async (message: string, payload: PlanGenerationPayload) => {
    const userMessage: IterationMessage = {
      id: uuidv4(),
      role: "utilisateur",
      content: message,
      createdAt: new Date().toISOString(),
    };
    setConversation((prev) => [...prev, userMessage]);
    await requestPlan({ ...payload, mode: "iterate", userMessage: message });
  };

  return {
    plan,
    isLoading,
    error,
    version,
    aiNotes,
    conversation,
    generatePlan,
    iteratePlan,
  };
}
