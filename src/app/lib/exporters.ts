"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import JSZip from "jszip";

import type { GeneratedPlan, ProjectInput } from "@/app/types";

async function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function exportPlanAsPdf(plan: GeneratedPlan, input: ProjectInput) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 portrait
  let { width, height } = page.getSize();
  const margin = 40;

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let cursorY = height - margin;

  const drawText = (
    text: string,
    options: { size?: number; font?: any; color?: { r: number; g: number; b: number } } = {}
  ) => {
    const size = options.size ?? 12;
    const font = options.font ?? helvetica;
    const color = options.color ?? rgb(0.06, 0.09, 0.16);
    const lines = wrapText(text, width - margin * 2, size, font);
    lines.forEach((line) => {
      if (cursorY < margin) {
        cursorY = height - margin;
        page = pdfDoc.addPage([595, 842]);
        ({ width, height } = page.getSize());
      }
      page.drawText(line, {
        x: margin,
        y: cursorY,
        size,
        font,
        color,
      });
      cursorY -= size + 4;
    });
  };

  drawText(input.overview.projectName, {
    size: 22,
    font: helveticaBold,
    color: rgb(0.04, 0.45, 0.88),
  });
  drawText(`${input.overview.slogan} – ${new Date().toLocaleDateString("fr-FR")}`, {
    size: 12,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });
  cursorY -= 12;

  drawText("Résumé exécutif", { size: 16, font: helveticaBold });
  drawText(plan.executiveSummary);
  cursorY -= 12;

  drawText("Business Model Canvas", { size: 16, font: helveticaBold });
  const canvasSections = [
    ["Partenaires clés", plan.businessModel.keyPartners],
    ["Activités clés", plan.businessModel.keyActivities],
    ["Ressources clés", plan.businessModel.keyResources],
    ["Proposition de valeur", plan.businessModel.valuePropositions],
    ["Relation client", plan.businessModel.customerRelationships],
    ["Canaux", plan.businessModel.channels],
    ["Segments clients", plan.businessModel.customerSegments],
    ["Structure de coûts", plan.businessModel.costStructure],
    ["Revenus", plan.businessModel.revenueStreams],
  ];
  canvasSections.forEach(([title, values]) => {
    drawText(`• ${title}`, { font: helveticaBold });
    drawText((values as string[]).join("; "));
  });
  drawText(plan.businessModel.commentary);
  cursorY -= 8;

  drawText("Analyse SWOT", { size: 16, font: helveticaBold });
  drawText(`Forces : ${plan.swot.strengths.join(", ")}`);
  drawText(`Faiblesses : ${plan.swot.weaknesses.join(", ")}`);
  drawText(`Opportunités : ${plan.swot.opportunities.join(", ")}`);
  drawText(`Menaces : ${plan.swot.threats.join(", ")}`);
  drawText(plan.swot.summary);
  cursorY -= 8;

  drawText("Plan 30/60/90 jours", { size: 16, font: helveticaBold });
  plan.timeline.forEach((milestone) => {
    drawText(`${milestone.phase} – ${milestone.focus}`, { font: helveticaBold });
    drawText(`Actions : ${milestone.keyActions.join(" | ")}`);
    drawText(`Responsable : ${milestone.owner}`);
    drawText(`KPI : ${milestone.successMetrics.join(", ")}`);
    drawText(`Automatisation : ${milestone.automationIdeas.join(", ")}`);
  });
  cursorY -= 8;

  drawText("Budget prévisionnel", { size: 16, font: helveticaBold });
  drawText(`Charges fixes : ${formatLines(plan.budget.fixedCosts)}`);
  drawText(`Variables : ${formatLines(plan.budget.variableCosts)}`);
  drawText(`Revenus projetés : ${formatLines(plan.budget.projectedRevenues)}`);
  drawText(plan.budget.breakEvenPoint);
  drawText(plan.budget.runwayComment);
  drawText(plan.budget.roiProjection);
  drawText(`Alertes : ${plan.budget.alerts.join(" | ")}`);
  cursorY -= 8;

  drawText("Stratégie Marketing", { size: 16, font: helveticaBold });
  drawText(`North Star : ${plan.marketing.northStarMetric}`);
  drawText(`Acquisition : ${plan.marketing.acquisitionStrategy}`);
  drawText(`Conversion : ${plan.marketing.conversionStrategy}`);
  drawText(`Rétention : ${plan.marketing.retentionStrategy}`);
  plan.marketing.plays.forEach((play, index) => {
    drawText(`Play ${index + 1} – ${play.channel}`, { font: helveticaBold });
    drawText(`Audience : ${play.audience}`);
    drawText(`Promesse : ${play.promise}`);
    drawText(`Contenus : ${play.contentIdeas.join(", ")}`);
    drawText(`KPI : ${play.kpis.join(", ")}`);
  });
  cursorY -= 8;

  drawText("Recommandations IA", { size: 16, font: helveticaBold });
  drawText(`Quick wins : ${plan.aiRecommendation.quickWins.join(", ")}`);
  drawText(`Leviers : ${plan.aiRecommendation.strategicLevers.join(", ")}`);
  drawText(`Points de vigilance : ${plan.aiRecommendation.watchpoints.join(", ")}`);
  drawText(`Prédiction 90j : ${plan.aiRecommendation.prediction90d}`);

  const pdfBytes = await pdfDoc.save();
  await downloadBlob(
    `${sanitizeFilename(input.overview.projectName)}-plan-strategique.pdf`,
    new Blob([pdfBytes], { type: "application/pdf" })
  );
}

export async function exportPlanAsMarkdown(plan: GeneratedPlan, input: ProjectInput) {
  const markdown = `# ${input.overview.projectName}

> ${input.overview.slogan}

## Résumé exécutif
${plan.executiveSummary}

## Business Model Canvas
${renderList("Partenaires clés", plan.businessModel.keyPartners)}
${renderList("Activités clés", plan.businessModel.keyActivities)}
${renderList("Ressources clés", plan.businessModel.keyResources)}
${renderList("Proposition de valeur", plan.businessModel.valuePropositions)}
${renderList("Relation client", plan.businessModel.customerRelationships)}
${renderList("Canaux", plan.businessModel.channels)}
${renderList("Segments clients", plan.businessModel.customerSegments)}
${renderList("Structure de coûts", plan.businessModel.costStructure)}
${renderList("Revenus", plan.businessModel.revenueStreams)}

## SWOT
${renderList("Forces", plan.swot.strengths)}
${renderList("Faiblesses", plan.swot.weaknesses)}
${renderList("Opportunités", plan.swot.opportunities)}
${renderList("Menaces", plan.swot.threats)}

## Plan 30/60/90
${plan.timeline
    .map(
      (item) =>
        `### ${item.phase} – ${item.focus}\n- Actions : ${item.keyActions.join(", ")}\n- Responsable : ${item.owner}\n- KPI : ${item.successMetrics.join(", ")}\n- Automatisation : ${item.automationIdeas.join(", ")}`
    )
    .join("\n\n")}

## Budget
- Charges fixes : ${formatLines(plan.budget.fixedCosts)}
- Variables : ${formatLines(plan.budget.variableCosts)}
- Revenus projetés : ${formatLines(plan.budget.projectedRevenues)}
- Seuil de rentabilité : ${plan.budget.breakEvenPoint}
- Runway : ${plan.budget.runwayComment}
- ROI : ${plan.budget.roiProjection}

## Marketing
- North Star : ${plan.marketing.northStarMetric}
- Acquisition : ${plan.marketing.acquisitionStrategy}
- Conversion : ${plan.marketing.conversionStrategy}
- Rétention : ${plan.marketing.retentionStrategy}
- Automatisation : ${plan.marketing.automationPrinciples.join(", ")}

${plan.marketing.plays
    .map(
      (play, index) =>
        `### Play ${index + 1} – ${play.channel}\n- Audience : ${play.audience}\n- Promesse : ${play.promise}\n- Contenus : ${play.contentIdeas.join(", ")}\n- KPI : ${play.kpis.join(", ")}\n- Stack : ${play.automationStack.join(", ")}`
    )
    .join("\n\n")}

## Recommandations IA
- Quick wins : ${plan.aiRecommendation.quickWins.join(", ")}
- Leviers : ${plan.aiRecommendation.strategicLevers.join(", ")}
- Vigilance : ${plan.aiRecommendation.watchpoints.join(", ")}
- Projection 90j : ${plan.aiRecommendation.prediction90d}
- Confiance : ${plan.aiRecommendation.confidence}
`;

  await downloadBlob(
    `${sanitizeFilename(input.overview.projectName)}-plan-notion.md`,
    new Blob([markdown], { type: "text/markdown" })
  );
}

export async function exportPlanAsGoogleSheets(plan: GeneratedPlan, input: ProjectInput) {
  const zip = new JSZip();
  zip.file("business_model.csv", toCsv(plan.businessModel));
  zip.file("swot.csv", toCsv(plan.swot));
  zip.file("timeline.csv", toCsv(plan.timeline));
  zip.file("budget.csv", toCsv(plan.budget));
  zip.file("marketing.csv", toCsv(plan.marketing));
  zip.file("ai.csv", toCsv(plan.aiRecommendation));

  const content = await zip.generateAsync({ type: "blob" });
  await downloadBlob(
    `${sanitizeFilename(input.overview.projectName)}-google-sheets.zip`,
    content
  );
}

function wrapText(text: string, maxWidth: number, fontSize: number, font: any) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

function formatLines(entries: { label: string; amount: number }[]) {
  return entries
    .map((entry) => `${entry.label} : ${entry.amount.toLocaleString("fr-FR")} €`)
    .join(" | ");
}

function renderList(title: string, values: string[]) {
  return `### ${title}\n${values.map((value) => `- ${value}`).join("\n")}`;
}

function toCsv(data: unknown) {
  if (!data) return "";
  if (Array.isArray(data)) {
    if (data.length === 0) return "";
    if (typeof data[0] === "string") {
      return `valeur\n${(data as string[]).join("\n")}`;
    }
    const keys = Object.keys(data[0] as Record<string, unknown>);
    const rows = (data as Record<string, unknown>[]).map((row) =>
      keys
        .map((key) => formatCsvValue(row[key]))
        .join(",")
    );
    return `${keys.join(",")}\n${rows.join("\n")}`;
  }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    return entries.map(([key, value]) => `${key},${formatCsvValue(value)}`).join("\n");
  }
  return String(data);
}

function formatCsvValue(value: unknown) {
  if (Array.isArray(value)) {
    return `"${value.join("; ")}"`;
  }
  if (typeof value === "object" && value !== null) {
    return `"${JSON.stringify(value)}"`;
  }
  if (typeof value === "string") {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return String(value ?? "");
}

function sanitizeFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/-+/g, "-");
}
