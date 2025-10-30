from datetime import datetime
from typing import List
from pydantic import BaseModel, Field


class Article(BaseModel):
  code: str
  article: str
  titre: str
  lien: str
  resume: str | None = None


class AnalysisCreateRequest(BaseModel):
  text: str = Field(..., min_length=20)
  subject: str
  category: str
  context: str | None = None
  details: str


class AnalysisResponse(BaseModel):
  id: int
  domain: str
  keywords: List[str]
  articles: List[Article]
  summary: str
  actions: List[str]
  success_score: float
  created_at: datetime
  sources: List[str]

  class Config:
    from_attributes = True
