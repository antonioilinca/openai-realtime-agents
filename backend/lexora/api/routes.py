"""API routes definition."""
from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from lexora.documents.generator import DocumentGenerator
from lexora.models.schemas import (
    AnalysisResponse,
    AnalyzeRequest,
    DocumentRequest,
    DocumentResponse,
    PlanRequest,
    PlanResponse,
    SourceLogItem,
    SourceLogResponse,
)
from lexora.services.classifier import classify
from lexora.services.procedure_engine import ProcedureEngine
from lexora.services.rag_engine import RAGEngine
from lexora.utils.ids import hash_text, short_uuid

router = APIRouter()
rag_engine = RAGEngine()
procedure_engine = ProcedureEngine()
document_generator = DocumentGenerator()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalyzeRequest) -> AnalysisResponse:
    classification = classify(request.domain, request.situation)
    summary, citations = await rag_engine.analyse(request.situation, domain=request.domain)
    analysis_id = f"analysis-{short_uuid()}"
    return AnalysisResponse(
        analysis_id=analysis_id,
        classification=classification,
        citations=citations,
        summary=summary,
        confidence=0.65,
    )


@router.post("/plan", response_model=PlanResponse)
async def plan(request: PlanRequest) -> PlanResponse:
    if not request.analysisId:
        raise HTTPException(status_code=400, detail="analysisId is required")
    citations = ["eli/legis/fr/etat/demo/1234"]
    return procedure_engine.build_plan(
        analysis_id=request.analysisId,
        goals=request.goals,
        citations=citations,
    )


@router.post("/document", response_model=DocumentResponse)
async def generate_document(request: DocumentRequest) -> DocumentResponse:
    if not request.templateId:
        raise HTTPException(status_code=400, detail="templateId is required")

    base_context = {
        "generation_date": datetime.now(timezone.utc).strftime("%d/%m/%Y"),
        "domain": request.vars.get("domain", "conso"),
        "claimant_name": request.vars.get("claimant_name", "Prénom Nom"),
        "claimant_address": request.vars.get("claimant_address", "Adresse complète"),
        "recipient_name": request.vars.get("recipient_name", "Destinataire"),
        "recipient_address": request.vars.get("recipient_address", "Adresse"),
        "subject": request.vars.get("subject", "litige"),
        "demand": request.vars.get("demand", "effectuer la réparation"),
        "delay": request.vars.get("delay", 8),
        "legal_basis": request.vars.get("legal_basis", "Code de la consommation L.217-3"),
        "attachments": request.vars.get("attachments", ["Facture", "Courriel du vendeur"]),
        "employee_name": request.vars.get("employee_name", "Prénom Nom"),
        "employee_position": request.vars.get("employee_position", "Poste"),
        "employer_name": request.vars.get("employer_name", "Entreprise"),
        "period": request.vars.get("period", "Janvier 2024"),
        "overtime_hours": request.vars.get("overtime_hours", 12),
    }
    html = document_generator.render(request.templateId, base_context)
    checksum = hash_text(html)
    pdf_url = f"{request.planId}-{request.templateId}-{checksum}.pdf"
    return DocumentResponse(pdfUrl=pdf_url)


@router.get("/sources/{plan_id}", response_model=SourceLogResponse)
async def list_sources(plan_id: str) -> SourceLogResponse:
    if not plan_id:
        raise HTTPException(status_code=400, detail="planId is required")

    now = datetime.now(timezone.utc)
    items = [
        SourceLogItem(
            eli="eli/legis/fr/etat/demo/1234",
            url="https://www.legifrance.gouv.fr/eli/legis/fr/etat/demo/1234",
            version="2024-01-01",
            hash="demo-1234",
            extracted_at=now,
        )
    ]
    return SourceLogResponse(items=items)

