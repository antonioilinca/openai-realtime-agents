from __future__ import annotations

from typing import Any


def summarize(text: str, max_sentences: int = 3) -> tuple[str, str]:
    sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]
    short = ". ".join(sentences[:1])[:280]
    long = ". ".join(sentences[:max_sentences])[:1200]
    return short, long


def extract_claims(text: str) -> list[dict[str, Any]]:
    claims: list[dict[str, Any]] = []
    sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]
    for sentence in sentences[:5]:
        claims.append(
            {
                "kind": "fact",
                "text": sentence,
                "confidence": 0.6,
            }
        )
    return claims


def classify_topics(text: str, fallback_topics: list[str]) -> list[str]:
    topics = set(fallback_topics)
    if "health" in text.lower():
        topics.add("health")
    if "econom" in text.lower():
        topics.add("economy")
    if "policy" in text.lower():
        topics.add("policy")
    return sorted(topics)


def detect_contradictions(claims: list[dict[str, Any]]) -> list[dict[str, Any]]:
    contradictions: list[dict[str, Any]] = []
    for claim in claims:
        if "not" in claim["text"].lower():
            contradictions.append(
                {
                    "claim": claim["text"],
                    "reason": "Negation detected in claim text.",
                }
            )
    return contradictions

