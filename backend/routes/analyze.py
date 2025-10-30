from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address

from prisma import Prisma

from backend.models.gpt_engine import GPTLegalEngine
from backend.schemas.analyze import AnalysisCreateRequest, AnalysisResponse
from backend.services.legifrance_api import fetch_articles
from backend.utils.deps import get_current_user, get_db
from backend.utils.mappers import map_analysis_record

# Routes principales d'analyse et d'historique côté API.

limiter = Limiter(key_func=get_remote_address, default_limits=["30/minute"])

router = APIRouter(tags=["analysis"])
engine = GPTLegalEngine()


@router.post("/analyze", response_model=AnalysisResponse)
@limiter.limit("10/minute")
async def analyze_case(
  payload: AnalysisCreateRequest,
  db: Prisma = Depends(get_db),
  user: Dict[str, Any] | None = Depends(get_current_user)
):
  """Analyse une situation juridique et met en cache le résultat pendant 24h."""
  user_id = user["id"] if user else None
  existing = await db.analysis.find_first(
    where={
      "text": payload.text,
      "user_id": user_id,
      "cached_until": {"gt": datetime.utcnow()}
    },
    order={"created_at": "desc"}
  )
  if existing:
    return map_analysis_record(existing)

  domain = await engine.classify_domain(payload.text)
  keywords = list({*(payload.subject.split()), *(payload.context or "").split(), *(payload.details.split())})[:12]
  articles = await fetch_articles(keywords)
  ai_response = await engine.generate_analysis(payload.text, articles)

  if not ai_response.get("summary"):
    raise HTTPException(status_code=502, detail="Réponse IA invalide")

  record = await db.analysis.create(
    data={
      "user_id": user_id,
      "text": payload.text,
      "domain": ai_response.get("domain", domain),
      "keywords": ai_response.get("keywords", keywords),
      "articles": ai_response.get("articles", articles),
      "summary": ai_response.get("summary"),
      "actions": ai_response.get("actions", []),
      "success_score": ai_response.get("success_score", 50),
      "sources": ai_response.get("sources", []),
      "cached_until": datetime.utcnow() + timedelta(hours=24)
    }
  )
  return map_analysis_record(record)


@router.get("/history", response_model=List[AnalysisResponse])
async def list_history(
  domain: str | None = None,
  db: Prisma = Depends(get_db),
  user: Dict[str, Any] | None = Depends(get_current_user)
):
  filters: Dict[str, Any] = {}
  if user:
    filters["user_id"] = user["id"]
  else:
    filters["user_id"] = None
  if domain:
    filters["domain"] = domain
  records = await db.analysis.find_many(where=filters, order={"created_at": "desc"})
  return [map_analysis_record(record) for record in records]


@router.get("/history/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(
  analysis_id: int,
  db: Prisma = Depends(get_db),
  user: Dict[str, Any] | None = Depends(get_current_user)
):
  record = await db.analysis.find_unique(where={"id": analysis_id})
  if not record:
    raise HTTPException(status_code=404, detail="Analyse introuvable")
  if user and record.get("user_id") not in (None, user["id"]):
    raise HTTPException(status_code=403, detail="Accès interdit")
  return map_analysis_record(record)
