from __future__ import annotations

import hashlib
import json
from datetime import datetime
from typing import Any
from urllib.parse import urlparse

import trafilatura


def canonicalize_url(url: str) -> str:
    parsed = urlparse(url)
    return parsed._replace(fragment="", query="").geturl()


def extract_text(html: str) -> dict[str, Any]:
    extracted = trafilatura.extract(
        html,
        include_comments=False,
        include_tables=False,
        favor_precision=True,
        output_format="json",
    )
    if not extracted:
        return {
            "text": "",
            "title": None,
            "author": None,
            "date": None,
            "language": None,
        }
    payload = json.loads(extracted)
    data = trafilatura.extract_metadata(html)
    return {
        "text": payload.get("text", ""),
        "title": payload.get("title") or (data.title if data else None),
        "author": payload.get("author") or (data.author if data else None),
        "date": payload.get("date") or (data.date if data else None),
        "language": payload.get("language") or (data.language if data else None),
    }


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def parse_date(date_str: str | None) -> datetime | None:
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str)
    except ValueError:
        return None

