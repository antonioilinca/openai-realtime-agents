"""Pydantic schemas used across the Lexora API."""
from __future__ import annotations

from datetime import datetime
from typing import Any, Literal, Sequence

from pydantic import BaseModel, EmailStr, Field, constr

Domain = Literal["conso", "logement", "travail"]
AccountType = Literal["individual", "company"]


class ClassificationEntities(BaseModel):
    dates: list[str] = Field(default_factory=list)
    amounts: list[float] = Field(default_factory=list)
    parties: list[str] = Field(default_factory=list)


class ClassificationResult(BaseModel):
    branch: str
    sub_branch: str
    entities: ClassificationEntities
    clarifying_questions: list[str] = Field(default_factory=list)


class Citation(BaseModel):
    eli: str
    nor: str | None = None
    url: str
    version: str | None = None
    hash: str | None = None
    summary: str | None = None


class AnalysisResponse(BaseModel):
    analysis_id: str
    classification: ClassificationResult
    citations: list[Citation]
    summary: str
    confidence: float


class AnalyzeRequest(BaseModel):
    situation: str
    domain: Domain


class PlanStep(BaseModel):
    step: str
    legal_basis: list[str]
    deadline: str | None = None
    authority: str | None = None
    cost: str | None = None
    required_docs: list[str] = Field(default_factory=list)


class PlanResponse(BaseModel):
    plan_id: str
    steps: list[PlanStep]
    deadlines: list[str] = Field(default_factory=list)
    costs: list[str] = Field(default_factory=list)
    authorities: list[str] = Field(default_factory=list)
    kpis: dict[str, Any] = Field(default_factory=dict)
    audience_focus: str | None = None


class PlanRequest(BaseModel):
    analysisId: str = Field(..., alias="analysisId")
    goals: list[str] = Field(default_factory=list)


class DocumentRequest(BaseModel):
    planId: str = Field(..., alias="planId")
    templateId: str
    vars: dict[str, Any] = Field(default_factory=dict)


class DocumentResponse(BaseModel):
    pdfUrl: str


class SourceLogItem(BaseModel):
    eli: str
    url: str
    version: str
    hash: str
    extracted_at: datetime


class SourceLogResponse(BaseModel):
    items: Sequence[SourceLogItem]


class SignupRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=8)
    account_type: AccountType = Field(alias="accountType")
    full_name: constr(min_length=2, max_length=120) = Field(alias="fullName")
    company_name: str | None = Field(default=None, alias="companyName")


class LoginRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class UserProfile(BaseModel):
    user_id: str = Field(alias="userId")
    email: EmailStr
    account_type: AccountType = Field(alias="accountType")
    display_name: str = Field(alias="displayName")
    company_name: str | None = Field(default=None, alias="companyName")


class AuthResponse(BaseModel):
    token: str
    profile: UserProfile

