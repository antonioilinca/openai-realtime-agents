from __future__ import annotations

from datetime import datetime, timezone
from urllib.parse import urlparse

from aion_core.config import SourceQualityConfig


def score_source(url: str, published_at: datetime | None, config: SourceQualityConfig) -> float:
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    score = config.base_scores.get("default", 0.5)

    for key, value in config.base_scores.items():
        if key != "default" and domain.endswith(key):
            score = max(score, value)

    if domain in config.domain_overrides:
        score = max(score, config.domain_overrides[domain])

    if published_at:
        age_days = (datetime.now(timezone.utc) - published_at.replace(tzinfo=timezone.utc)).days
        if age_days < 7:
            score += 0.1
        elif age_days > 180:
            score -= 0.1

    return max(0.0, min(1.0, score))

