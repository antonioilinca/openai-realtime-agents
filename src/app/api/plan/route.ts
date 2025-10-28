import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

import type { PlanGenerationPayload, PlanResponse } from "@/app/types";
import {
  buildPlanPrompt,
  fallbackPlan,
  parsePlanFromModel,
} from "@/app/lib/planBuilder";

const payloadSchema = z.object({
  input: z.object({
    overview: z.object({
      projectName: z.string(),
      slogan: z.string(),
      founderName: z.string(),
      email: z.string(),
      sector: z.string(),
      subSector: z.string(),
      stage: z.string(),
      location: z.string(),
      vision: z.string(),
      mission: z.string(),
      differentiator: z.string(),
      objectives: z
        .array(
          z.object({
            id: z.string(),
            label: z.string(),
            horizon: z.string(),
          })
        )
        .default([]),
    }),
    market: z.object({
      targetCustomers: z.string(),
      pains: z.string(),
      keyTrends: z.string(),
      competitors: z.string(),
      regulations: z.string(),
      geographies: z.string(),
      maturity: z.string(),
    }),
    offer: z.object({
      products: z.string(),
      pricingModel: z.string(),
      valueProposition: z.string(),
      proofPoints: z.string(),
      deliveryModel: z.string(),
      onboarding: z.string(),
      retentionStrategy: z.string(),
    }),
    operations: z.object({
      team: z.string(),
      processes: z.string(),
      tools: z.string(),
      partnerships: z.string(),
      risks: z.string(),
      automationWish: z.string(),
    }),
    financials: z.object({
      availableBudget: z.number(),
      fundingNeeds: z.number(),
      monthlyFixedCosts: z.number(),
      cogs: z.number(),
      expectedCAC: z.number(),
      averageOrderValue: z.number(),
      expectedConversionRate: z.number(),
      lifetimeValue: z.number(),
      runwayMonths: z.number(),
    }),
    language: z.enum(["fr", "en"]).default("fr"),
  }),
  previousPlan: z.any().optional(),
  conversation: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(["utilisateur", "assistant"]),
        content: z.string(),
        createdAt: z.string(),
      })
    )
    .optional(),
  mode: z.enum(["generate", "iterate"]),
  userMessage: z.string().optional(),
});

const openAiKey = process.env.OPENAI_API_KEY;
const openAiModel = process.env.OPENAI_MODEL || "gpt-4.1";
const geminiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "gemini-1.5-pro";

const openaiClient = openAiKey ? new OpenAI({ apiKey: openAiKey }) : null;
const geminiClient = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

async function callOpenAi(prompt: string): Promise<PlanResponse | null> {
  if (!openaiClient) return null;
  try {
    const response = await openaiClient.responses.create({
      model: openAiModel,
      input: prompt,
      reasoning: { effort: "medium" },
      temperature: 0.2,
    });
    const output = response.output_text ?? "";
    return parsePlanFromModel(output);
  } catch (error) {
    console.error("Erreur OpenAI", error);
    return null;
  }
}

async function callGemini(prompt: string): Promise<PlanResponse | null> {
  if (!geminiClient) return null;
  try {
    const model = geminiClient.getGenerativeModel({ model: geminiModel });
    const result = await model.generateContent(prompt);
    const text = result.response?.text() ?? "";
    return parsePlanFromModel(text);
  } catch (error) {
    console.error("Erreur Gemini", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await payloadSchema.parseAsync(await request.json())) as PlanGenerationPayload;
    const prompt = buildPlanPrompt(payload);

    let planResponse: PlanResponse | null = null;

    if (openaiClient) {
      planResponse = await callOpenAi(prompt);
    }

    if (!planResponse && geminiClient) {
      planResponse = await callGemini(prompt);
    }

    if (!planResponse) {
      planResponse = fallbackPlan(payload);
    }

    return NextResponse.json(planResponse);
  } catch (error) {
    console.error("Erreur lors de la génération du plan", error);
    return NextResponse.json(
      { message: "Impossible de générer le plan stratégique.", details: `${error}` },
      { status: 500 }
    );
  }
}
