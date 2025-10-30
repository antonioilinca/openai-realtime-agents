import { NextResponse } from "next/server";
import { z } from "zod";
import { generateProductivityReport } from "@/app/lib/productivity/pdfGenerator";
import { ProductivityPlan } from "@/app/lib/productivity/types";

const planSchema: z.ZodType<ProductivityPlan> = z.object({
  companyName: z.string(),
  industry: z.string(),
  generatedAt: z.string(),
  internalAnalysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    improvementLevers: z.array(z.string()),
    riskAlerts: z.array(z.string()),
  }),
  marketAnalysis: z.object({
    summary: z.string(),
    competitorInsights: z.array(
      z.object({
        name: z.string(),
        positioning: z.string(),
        differentiator: z.string(),
        priorityAction: z.string(),
      }),
    ),
    opportunitySignals: z.array(z.string()),
  }),
  strategicInitiatives: z.array(
    z.object({
      title: z.string(),
      owner: z.string(),
      impact: z.enum(["High", "Medium", "Low"]),
      effort: z.enum(["High", "Medium", "Low"]),
      description: z.string(),
      kpi: z.string(),
      timeline: z.string(),
    }),
  ),
  thirtyDayPlan: z.array(
    z.object({
      dayRange: z.string(),
      objective: z.string(),
      actions: z.array(z.string()),
    }),
  ),
  kpiProjections: z.array(
    z.object({
      metric: z.string(),
      baseline: z.number(),
      projected: z.number(),
      description: z.string(),
    }),
  ),
  productivityTimeline: z.array(
    z.object({
      label: z.string(),
      productivityIndex: z.number(),
    }),
  ),
  summary: z.string(),
});

/**
 * POST /api/productivity/export
 * Takes a validated plan and streams a branded PDF back to the client.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const plan = planSchema.parse(payload);

    const pdfBuffer = await generateProductivityReport(plan);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="productivity-plan-${plan.companyName.replace(/\s+/g, "-").toLowerCase()}.pdf"`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Plan invalide pour export PDF", issues: error.issues },
        { status: 400 },
      );
    }

    console.error("Failed to export PDF", error);
    return NextResponse.json(
      { message: "Erreur lors de la génération du PDF" },
      { status: 500 },
    );
  }
}
