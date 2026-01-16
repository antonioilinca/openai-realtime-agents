from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

from aion_core.models import DocumentRecord


def build_daily_brief(documents: list[DocumentRecord]) -> dict[str, Any]:
    items = []
    for doc in documents:
        items.append(
            {
                "title": doc.title,
                "summary": doc.summary_short,
                "url": doc.url,
                "published_at": doc.published_at.isoformat() if doc.published_at else None,
                "ingested_at": doc.ingested_at.isoformat(),
                "hash": doc.content_hash,
                "tags": doc.tags,
                "facts": doc.metadata.get("facts", []),
                "interpretations": doc.metadata.get("interpretations", []),
                "hypotheses": doc.metadata.get("hypotheses", []),
            }
        )
    return {
        "generated_at": datetime.utcnow().isoformat(),
        "items": items,
    }


def render_daily_brief_md(brief: dict[str, Any]) -> str:
    lines = ["# Daily Brief", "", f"Generated at: {brief['generated_at']}", ""]
    for item in brief["items"]:
        lines.append(f"## {item['title']}")
        lines.append(f"- Summary: {item['summary']}")
        lines.append(f"- URL: {item['url']}")
        lines.append(f"- Published: {item['published_at']}")
        lines.append(f"- Ingested: {item['ingested_at']}")
        lines.append(f"- Hash: {item['hash']}")
        lines.append("")
    return "\n".join(lines)


def save_report(reports_path: Path, brief: dict[str, Any]) -> tuple[Path, Path]:
    reports_path.mkdir(parents=True, exist_ok=True)
    date_str = datetime.utcnow().strftime("%Y-%m-%d")
    json_path = reports_path / f"daily_brief_{date_str}.json"
    md_path = reports_path / f"daily_brief_{date_str}.md"

    json_path.write_text(json.dumps(brief, indent=2), encoding="utf-8")
    md_path.write_text(render_daily_brief_md(brief), encoding="utf-8")
    return json_path, md_path

