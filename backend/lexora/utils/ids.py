"""Helpers for generating stable identifiers."""
from __future__ import annotations

import hashlib
import uuid


def short_uuid() -> str:
    """Return a short, url-safe identifier."""

    return uuid.uuid4().hex[:12]


def hash_text(text: str) -> str:
    """Compute a deterministic SHA-256 hash for a text payload."""

    digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
    return digest[:32]

