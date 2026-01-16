from __future__ import annotations

import hashlib
import json
import time
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import feedparser
import httpx

from aion_core.config import Config


@dataclass
class FetchResult:
    url: str
    status_code: int
    content: str
    fetched_at: datetime


def normalize_url(url: str) -> str:
    parsed = urlparse(url)
    return parsed._replace(fragment="").geturl()


def hash_content(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def load_robot_parser(base_url: str, user_agent: str) -> RobotFileParser:
    parsed = urlparse(base_url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    parser = RobotFileParser()
    parser.set_url(robots_url)
    parser.read()
    parser.modified()
    return parser


def is_allowed(url: str, user_agent: str) -> bool:
    parser = load_robot_parser(url, user_agent)
    return parser.can_fetch(user_agent, url)


def fetch_url(client: httpx.Client, url: str, config: Config) -> FetchResult | None:
    if not is_allowed(url, config.app.user_agent):
        return None

    retries = 0
    while retries <= config.app.max_retries:
        try:
            response = client.get(url)
            if response.status_code == 200:
                return FetchResult(
                    url=url,
                    status_code=response.status_code,
                    content=response.text,
                    fetched_at=datetime.utcnow(),
                )
            if response.status_code in {429, 500, 502, 503, 504}:
                time.sleep(config.app.backoff_seconds * (retries + 1))
                retries += 1
                continue
            return FetchResult(
                url=url,
                status_code=response.status_code,
                content=response.text,
                fetched_at=datetime.utcnow(),
            )
        except httpx.RequestError:
            time.sleep(config.app.backoff_seconds * (retries + 1))
            retries += 1

    return None


def fetch_rss(source: dict[str, Any], config: Config) -> list[dict[str, Any]]:
    parser = feedparser.parse(source["url"])
    entries: list[dict[str, Any]] = []
    for entry in parser.entries:
        entries.append(
            {
                "title": entry.get("title"),
                "url": entry.get("link"),
                "published": entry.get("published"),
                "summary": entry.get("summary"),
                "author": entry.get("author"),
                "tags": [tag.get("term") for tag in entry.get("tags", [])],
            }
        )
    return entries


def cache_response(cache_path: Path, url: str, content: str) -> None:
    cache_path.mkdir(parents=True, exist_ok=True)
    filename = hash_content(url)
    payload = {
        "url": url,
        "cached_at": datetime.utcnow().isoformat(),
        "content": content,
    }
    (cache_path / f"{filename}.json").write_text(json.dumps(payload), encoding="utf-8")


