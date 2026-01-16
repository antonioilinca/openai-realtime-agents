from __future__ import annotations

from pydantic import BaseModel


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


class IngestResponse(BaseModel):
    ingested: int


class BriefResponse(BaseModel):
    brief_path: str
    belief_path: str

