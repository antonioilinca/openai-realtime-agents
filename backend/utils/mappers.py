from typing import Any, Dict

from backend.schemas.analyze import AnalysisResponse

# Conversion générique d'un enregistrement Prisma en objet Pydantic partagé.


def map_analysis_record(record: Any) -> AnalysisResponse:
  payload: Dict[str, Any]
  if hasattr(record, "dict"):
    payload = record.dict()
  else:
    payload = dict(record)
  return AnalysisResponse(
    id=payload["id"],
    domain=payload["domain"],
    keywords=payload["keywords"],
    articles=payload["articles"],
    summary=payload["summary"],
    actions=payload["actions"],
    success_score=float(payload["success_score"]),
    created_at=payload["created_at"],
    sources=payload["sources"]
  )
