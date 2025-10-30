"""API contract tests for Lexora backend."""
from __future__ import annotations

from fastapi.testclient import TestClient

from lexora.api.main import app

client = TestClient(app)


def test_healthcheck() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"


def test_analyze_returns_analysis() -> None:
    response = client.post(
        "/api/analyze",
        json={"situation": "Le vendeur refuse la garantie.", "domain": "conso"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["analysis_id"].startswith("analysis-")
    assert body["classification"]["branch"]
    assert len(body["citations"]) >= 1


def test_plan_requires_analysis_id() -> None:
    response = client.post(
        "/api/plan",
        json={"analysisId": "abc", "goals": ["Contacter le vendeur"]},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["plan_id"].startswith("plan-")


def test_document_generation() -> None:
    response = client.post(
        "/api/document",
        json={
            "planId": "plan-123",
            "templateId": "mise-en-demeure",
            "vars": {"domain": "conso", "claimant_name": "Test"},
        },
    )
    assert response.status_code == 200
    pdf_url = response.json()["pdfUrl"]
    assert pdf_url.startswith("plan-123-mise-en-demeure")


def test_sources_listing() -> None:
    response = client.get("/api/sources/plan-123")
    assert response.status_code == 200
    body = response.json()
    assert len(body["items"]) == 1
    assert body["items"][0]["eli"].startswith("eli/")

