import { NextResponse } from "next/server";
import { z } from "zod";
import { runProductivityEngine } from "@/app/lib/productivity/engine";
import { ProductivityInput } from "@/app/lib/productivity/types";

const payloadSchema = z.object({
  companyName: z.string().min(2),
  industry: z.string().min(2),
  teamSize: z.number().int().min(1),
  revenue: z.number().min(0),
  challenges: z.string().min(2),
  productivityGoal: z.number().min(10).max(300),
});

/**
 * POST /api/productivity/analyze
 * Validates the incoming payload, executes the productivity engine and returns
 * the structured plan. Errors are returned with a clear JSON message so the
 * client can display contextual feedback.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = payloadSchema.parse(data) as ProductivityInput;

    const plan = runProductivityEngine(payload);

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Payload invalide", issues: error.issues },
        { status: 400 },
      );
    }

    console.error("Unexpected error while generating plan", error);
    return NextResponse.json(
      { message: "Erreur interne lors de la génération du plan" },
      { status: 500 },
    );
  }
}
