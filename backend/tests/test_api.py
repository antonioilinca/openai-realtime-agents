"""API contract tests for Lexora backend with authentication."""
from __future__ import annotations

import uuid

import pytest
from fastapi.testclient import TestClient

from lexora.api.main import app

client = TestClient(app)


def _auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture()
def individual_account() -> tuple[str, dict[str, str]]:
    email = f"user-{uuid.uuid4()}@example.com"
    response = client.post(
        "/api/auth/signup",
        json={
            "email": email,
            "password": "P@ssword123",
            "accountType": "individual",
            "fullName": "Test Utilisateur",
            "companyName": None,
        },
    )
    assert response.status_code == 201
    data = response.json()
    return data["token"], data["profile"]


@pytest.fixture()
def company_account() -> tuple[str, dict[str, str], str]:
    email = f"company-{uuid.uuid4()}@example.com"
    password = "P@ssword123"
    response = client.post(
        "/api/auth/signup",
        json={
            "email": email,
            "password": password,
            "accountType": "company",
            "fullName": "Responsable Legal",
            "companyName": "Entreprise Demo",
        },
    )
    assert response.status_code == 201
    data = response.json()
    return data["token"], data["profile"], password


def test_healthcheck() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"


def test_cors_preflight_allows_frontend_origin() -> None:
    response = client.options(
        "/api/auth/signup",
        headers={
            "origin": "http://localhost:3000",
            "access-control-request-method": "POST",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
    allow_methods = response.headers.get("access-control-allow-methods")
    assert allow_methods is not None
    assert "POST" in allow_methods


def test_signup_and_profile(individual_account: tuple[str, dict[str, str]]) -> None:
    token, profile = individual_account
    assert profile["accountType"] == "individual"

    profile_response = client.get("/api/auth/profile", headers=_auth_headers(token))
    assert profile_response.status_code == 200
    fetched = profile_response.json()
    assert fetched["email"] == profile["email"]


def test_login_returns_new_token(company_account: tuple[str, dict[str, str], str]) -> None:
    _, profile, password = company_account
    response = client.post(
        "/api/auth/login",
        json={"email": profile["email"], "password": password},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["token"]
    assert data["profile"]["accountType"] == "company"


def test_analyze_requires_auth() -> None:
    response = client.post(
        "/api/analyze",
        json={"situation": "Le vendeur refuse la garantie.", "domain": "conso"},
    )
    assert response.status_code == 401


def test_analyze_plan_document_flow(individual_account: tuple[str, dict[str, str]]) -> None:
    token, _ = individual_account

    analysis_response = client.post(
        "/api/analyze",
        headers=_auth_headers(token),
        json={"situation": "Le vendeur refuse la garantie.", "domain": "conso"},
    )
    assert analysis_response.status_code == 200
    analysis = analysis_response.json()
    assert analysis["analysis_id"].startswith("analysis-")
    assert analysis["citations"]

    plan_response = client.post(
        "/api/plan",
        headers=_auth_headers(token),
        json={"analysisId": analysis["analysis_id"], "goals": ["Contacter le vendeur"]},
    )
    assert plan_response.status_code == 200
    plan = plan_response.json()
    assert plan["plan_id"].startswith("plan-")
    assert plan["audience_focus"].startswith("Priorité particulier")

    document_response = client.post(
        "/api/document",
        headers=_auth_headers(token),
        json={
            "planId": plan["plan_id"],
            "templateId": "mise-en-demeure",
            "vars": {"domain": "conso", "claimant_name": "Test"},
        },
    )
    assert document_response.status_code == 200
    pdf_url = document_response.json()["pdfUrl"]
    assert pdf_url.startswith(f"{plan['plan_id']}-mise-en-demeure")

    sources_response = client.get(
        f"/api/sources/{plan['plan_id']}",
        headers=_auth_headers(token),
    )
    assert sources_response.status_code == 200
    body = sources_response.json()
    assert len(body["items"]) == len(analysis["citations"])


def test_company_plan_emphasis(company_account: tuple[str, dict[str, str], str]) -> None:
    token, _, _ = company_account

    analysis_response = client.post(
        "/api/analyze",
        headers=_auth_headers(token),
        json={"situation": "Litige commercial sur une prestation.", "domain": "conso"},
    )
    analysis = analysis_response.json()

    plan_response = client.post(
        "/api/plan",
        headers=_auth_headers(token),
        json={"analysisId": analysis["analysis_id"], "goals": ["Formaliser la contestation"]},
    )
    assert plan_response.status_code == 200
    plan = plan_response.json()
    assert plan["audience_focus"].startswith("Priorité entreprise")
    assert "Service juridique" in plan["steps"][0]["authority"]

