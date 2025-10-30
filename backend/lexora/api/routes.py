"""API routes definition."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import NamedTuple

from fastapi import APIRouter, Depends, Header, HTTPException, status

from lexora.documents.generator import DocumentGenerator
from lexora.models.schemas import (
    AnalysisResponse,
    AnalyzeRequest,
    AuthResponse,
    DocumentRequest,
    DocumentResponse,
    LoginRequest,
    PlanRequest,
    PlanResponse,
    SourceLogItem,
    SourceLogResponse,
    SignupRequest,
    UserProfile,
)
from lexora.services.classifier import classify
from lexora.services.procedure_engine import ProcedureEngine
from lexora.services.rag_engine import RAGEngine
from lexora.services.storage import STORE, UserRecord
from lexora.utils.ids import hash_text, short_uuid

router = APIRouter()
rag_engine = RAGEngine()
procedure_engine = ProcedureEngine()
document_generator = DocumentGenerator()
store = STORE


class SessionContext(NamedTuple):
    """Bundle the authenticated user with the session token."""

    token: str
    user: UserRecord


async def require_session(authorization: str | None = Header(default=None)) -> SessionContext:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
        )

    token = authorization.split(" ", 1)[1].strip()
    session = store.get_session(token)
    if not session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session token")

    user = store.get_user(session.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unknown session user")

    return SessionContext(token=token, user=user)


@router.post("/auth/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(request: SignupRequest) -> AuthResponse:
    try:
        return store.create_user(request)
    except ValueError as exc:  # pragma: no cover - exercised in tests
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/auth/login", response_model=AuthResponse)
async def login(request: LoginRequest) -> AuthResponse:
    try:
        return store.authenticate(request)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc


@router.get("/auth/profile", response_model=UserProfile)
async def profile(session: SessionContext = Depends(require_session)) -> UserProfile:
    return session.user.to_profile()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(
    request: AnalyzeRequest, session: SessionContext = Depends(require_session)
) -> AnalysisResponse:
    classification = classify(request.domain, request.situation)
    summary, citations = await rag_engine.analyse(request.situation, domain=request.domain)
    analysis_id = f"analysis-{short_uuid()}"
    response = AnalysisResponse(
        analysis_id=analysis_id,
        classification=classification,
        citations=citations,
        summary=summary,
        confidence=0.65,
    )
    store.save_analysis(session.user.user_id, response)
    return response


@router.post("/plan", response_model=PlanResponse)
async def plan(request: PlanRequest, session: SessionContext = Depends(require_session)) -> PlanResponse:
    if not request.analysisId:
        raise HTTPException(status_code=400, detail="analysisId is required")

    analysis = store.get_analysis(session.user.user_id, request.analysisId)
    if not analysis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")

    plan_response = procedure_engine.build_plan(
        analysis_id=request.analysisId,
        goals=request.goals,
        citations=[citation.eli for citation in analysis.citations],
        account_type=session.user.account_type,
    )
    store.save_plan(
        session.user.user_id,
        analysis_id=analysis.analysis_id,
        response=plan_response,
        citations=analysis.citations,
    )
    return plan_response


@router.post("/document", response_model=DocumentResponse)
async def generate_document(
    request: DocumentRequest, session: SessionContext = Depends(require_session)
) -> DocumentResponse:
    if not request.templateId:
        raise HTTPException(status_code=400, detail="templateId is required")

    plan_record = store.get_plan(session.user.user_id, request.planId)
    if not plan_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")

    base_context = {
        "generation_date": datetime.now(timezone.utc).strftime("%d/%m/%Y"),
        "domain": request.vars.get("domain", "conso"),
        "claimant_name": request.vars.get(
            "claimant_name",
            session.user.company_name or session.user.full_name,
        ),
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
    store.save_document(
        session.user.user_id,
        plan_id=plan_record.response.plan_id,
        template_id=request.templateId,
        pdf_url=pdf_url,
        checksum=checksum,
    )
    return DocumentResponse(pdfUrl=pdf_url)


@router.get("/sources/{plan_id}", response_model=SourceLogResponse)
async def list_sources(
    plan_id: str, session: SessionContext = Depends(require_session)
) -> SourceLogResponse:
    if not plan_id:
        raise HTTPException(status_code=400, detail="planId is required")

    plan_record = store.get_plan(session.user.user_id, plan_id)
    if not plan_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")

    items = [
        SourceLogItem(
            eli=citation.eli,
            url=citation.url,
            version=citation.version or "non_disponible",
            hash=citation.hash or "",
            extracted_at=plan_record.created_at,
        )
        for citation in plan_record.citations
    ]
    return SourceLogResponse(items=items)

