from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Response
from jinja2 import Environment, PackageLoader, select_autoescape
from weasyprint import HTML

from prisma import Prisma

from backend.utils.deps import get_current_user, get_db
from backend.utils.mappers import map_analysis_record

# Génération de rapports PDF professionnels.

router = APIRouter(prefix="/pdf", tags=["documents"])

jinja_env = Environment(
  loader=PackageLoader("backend", "templates"),
  autoescape=select_autoescape(["html", "xml"])
)


@router.get("/{analysis_id}")
async def download_pdf(
  analysis_id: int,
  db: Prisma = Depends(get_db),
  user = Depends(get_current_user)
):
  record = await db.analysis.find_unique(where={"id": analysis_id})
  if not record:
    raise HTTPException(status_code=404, detail="Analyse introuvable")
  if user and record.get("user_id") not in (None, user["id"]):
    raise HTTPException(status_code=403, detail="Accès interdit")

  analysis = map_analysis_record(record)
  template = jinja_env.get_template("report.html")
  html_content = template.render(
    analysis=analysis,
    generated_at=datetime.now().strftime("%d/%m/%Y %H:%M")
  )
  pdf_bytes = HTML(string=html_content).write_pdf()
  return Response(content=pdf_bytes, media_type="application/pdf")
