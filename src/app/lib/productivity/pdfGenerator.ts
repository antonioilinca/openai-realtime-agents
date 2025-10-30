import PDFDocument from "pdfkit";
import { ProductivityPlan } from "./types";

/**
 * PDF Exporter module
 * -------------------
 * Uses pdfkit to produce a branded report aligned with the UI colour palette.
 * The helper returns a Buffer so the Next.js route can stream the PDF back to
 * the browser without touching the filesystem.
 */
export async function generateProductivityReport(plan: ProductivityPlan): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 50, info: { Title: "Productivity Booster AI" } });
  const buffers: Uint8Array[] = [];

  doc.on("data", (chunk) => buffers.push(chunk));

  const primary = "#2563eb"; // Tailwind blue-600 equivalent
  const gray = "#1f2937";

  const heading = (label: string) => {
    doc.moveDown();
    doc.fillColor(primary).fontSize(18).text(label, { underline: false });
    doc.moveDown(0.3);
    doc.fillColor(gray).fontSize(11);
  };

  const subheading = (label: string) => {
    doc.moveDown(0.5);
    doc.fillColor(primary).fontSize(13).text(label);
    doc.moveDown(0.2);
    doc.fillColor(gray).fontSize(10.5);
  };

  doc.fillColor(primary).fontSize(26).text("Productivity Booster AI", { align: "left" });
  doc.fillColor(gray).fontSize(12).text(`Plan pour ${plan.companyName}`, { align: "left" });
  doc.moveDown();
  doc.fontSize(10).text(`Industrie : ${plan.industry}`);
  doc.text(`Généré le : ${new Date(plan.generatedAt).toLocaleString("fr-FR")}`);

  heading("Analyse interne");
  subheading("Forces");
  plan.internalAnalysis.strengths.forEach((item) => doc.list([item]));
  subheading("Faiblesses");
  plan.internalAnalysis.weaknesses.forEach((item) => doc.list([item]));
  subheading("Leviers prioritaires");
  plan.internalAnalysis.improvementLevers.forEach((item) => doc.list([item]));
  if (plan.internalAnalysis.riskAlerts.length > 0) {
    subheading("Alertes risques");
    plan.internalAnalysis.riskAlerts.forEach((item) => doc.list([item]));
  }

  heading("Étude de marché");
  doc.text(plan.marketAnalysis.summary);
  subheading("Insights concurrents");
  plan.marketAnalysis.competitorInsights.forEach((competitor) => {
    doc
      .fontSize(11)
      .fillColor(gray)
      .text(`${competitor.name} — ${competitor.positioning}`, { continued: false });
    doc.fontSize(10).text(`Différenciation : ${competitor.differentiator}`);
    doc.fontSize(10).text(`Action clé : ${competitor.priorityAction}`);
    doc.moveDown(0.3);
  });
  subheading("Opportunités");
  plan.marketAnalysis.opportunitySignals.forEach((item) => doc.list([item]));

  heading("Recommandations stratégiques");
  plan.strategicInitiatives.forEach((initiative, index) => {
    doc
      .fontSize(12)
      .fillColor(primary)
      .text(`${index + 1}. ${initiative.title}`);
    doc
      .fontSize(10)
      .fillColor(gray)
      .text(`Owner : ${initiative.owner} | Impact : ${initiative.impact} | Effort : ${initiative.effort}`);
    doc.text(initiative.description);
    doc.text(`KPI clé : ${initiative.kpi}`);
    doc.text(`Timeline : ${initiative.timeline}`);
    doc.moveDown(0.5);
  });

  heading("Plan 30 jours");
  plan.thirtyDayPlan.forEach((item) => {
    doc.fontSize(12).fillColor(primary).text(item.dayRange);
    doc.fontSize(10).fillColor(gray).text(item.objective);
    doc.list(item.actions);
    doc.moveDown(0.5);
  });

  heading("KPIs projetés");
  plan.kpiProjections.forEach((kpi) => {
    doc
      .fontSize(11)
      .fillColor(primary)
      .text(`${kpi.metric} — Baseline ${kpi.baseline} → Cible ${kpi.projected}`);
    doc.fontSize(10).fillColor(gray).text(kpi.description);
    doc.moveDown(0.3);
  });

  heading("Conclusion");
  doc.text(plan.summary);

  doc.end();

  return await new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", (err) => reject(err));
  });
}
