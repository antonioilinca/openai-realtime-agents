"""In-memory persistence layer for the Lexora prototype."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import hashlib
import secrets
from typing import Dict, Iterable

from lexora.models.schemas import (
    AccountType,
    AnalysisResponse,
    AuthResponse,
    Citation,
    LoginRequest,
    PlanResponse,
    SignupRequest,
    UserProfile,
)
from lexora.utils.ids import short_uuid


def _hash_password(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 390000).hex()


@dataclass
class UserRecord:
    user_id: str
    email: str
    password_salt: str
    password_hash: str
    account_type: AccountType
    full_name: str
    company_name: str | None

    def to_profile(self) -> UserProfile:
        return UserProfile(
            userId=self.user_id,
            email=self.email,
            accountType=self.account_type,
            displayName=self.full_name,
            companyName=self.company_name,
        )


@dataclass
class SessionRecord:
    token: str
    user_id: str
    created_at: datetime


@dataclass
class AnalysisRecord:
    user_id: str
    response: AnalysisResponse
    created_at: datetime


@dataclass
class PlanRecord:
    user_id: str
    analysis_id: str
    response: PlanResponse
    citations: list[Citation]
    created_at: datetime


@dataclass
class DocumentRecord:
    user_id: str
    plan_id: str
    template_id: str
    pdf_url: str
    checksum: str
    created_at: datetime


class InMemoryStore:
    """Stateful store to support the demo workflow without a database."""

    def __init__(self) -> None:
        self._users_by_email: Dict[str, UserRecord] = {}
        self._users: Dict[str, UserRecord] = {}
        self._sessions: Dict[str, SessionRecord] = {}
        self._analyses: Dict[str, AnalysisRecord] = {}
        self._plans: Dict[str, PlanRecord] = {}
        self._documents: Dict[str, DocumentRecord] = {}

    # -- Authentication -------------------------------------------------
    def create_user(self, payload: SignupRequest) -> AuthResponse:
        email = str(payload.email).strip().lower()
        if email in self._users_by_email:
            raise ValueError("Email already registered")

        full_name = payload.full_name.strip()
        company_name = (payload.company_name or "").strip() or None

        if payload.account_type == "company" and not company_name:
            raise ValueError("companyName is required for company accounts")

        salt = secrets.token_hex(16)
        user = UserRecord(
            user_id=f"user-{short_uuid()}",
            email=email,
            password_salt=salt,
            password_hash=_hash_password(payload.password, salt),
            account_type=payload.account_type,
            full_name=full_name,
            company_name=company_name,
        )
        self._users[user.user_id] = user
        self._users_by_email[user.email] = user

        token = self._create_session(user.user_id)
        return AuthResponse(token=token, profile=user.to_profile())

    def authenticate(self, payload: LoginRequest) -> AuthResponse:
        email = str(payload.email).strip().lower()
        user = self._users_by_email.get(email)
        if not user:
            raise ValueError("Invalid credentials")

        expected = _hash_password(payload.password, user.password_salt)
        if secrets.compare_digest(expected, user.password_hash) is False:
            raise ValueError("Invalid credentials")

        token = self._create_session(user.user_id)
        return AuthResponse(token=token, profile=user.to_profile())

    def _create_session(self, user_id: str) -> str:
        token = secrets.token_urlsafe(32)
        self._sessions[token] = SessionRecord(token=token, user_id=user_id, created_at=datetime.now(timezone.utc))
        return token

    def get_session(self, token: str) -> SessionRecord | None:
        return self._sessions.get(token)

    def get_user(self, user_id: str) -> UserRecord | None:
        return self._users.get(user_id)

    # -- Analysis / Plan / Documents -----------------------------------
    def save_analysis(self, user_id: str, response: AnalysisResponse) -> None:
        self._analyses[response.analysis_id] = AnalysisRecord(
            user_id=user_id,
            response=response,
            created_at=datetime.now(timezone.utc),
        )

    def get_analysis(self, user_id: str, analysis_id: str) -> AnalysisResponse | None:
        record = self._analyses.get(analysis_id)
        if not record or record.user_id != user_id:
            return None
        return record.response

    def save_plan(self, user_id: str, analysis_id: str, response: PlanResponse, citations: Iterable[Citation]) -> None:
        self._plans[response.plan_id] = PlanRecord(
            user_id=user_id,
            analysis_id=analysis_id,
            response=response,
            citations=list(citations),
            created_at=datetime.now(timezone.utc),
        )

    def get_plan(self, user_id: str, plan_id: str) -> PlanRecord | None:
        record = self._plans.get(plan_id)
        if not record or record.user_id != user_id:
            return None
        return record

    def save_document(self, user_id: str, plan_id: str, template_id: str, pdf_url: str, checksum: str) -> None:
        self._documents[pdf_url] = DocumentRecord(
            user_id=user_id,
            plan_id=plan_id,
            template_id=template_id,
            pdf_url=pdf_url,
            checksum=checksum,
            created_at=datetime.now(timezone.utc),
        )


STORE = InMemoryStore()
