"""Web scraping utilities for the OSINT detective system."""
from __future__ import annotations

import asyncio
import logging
import re
import time
from dataclasses import dataclass
from html import unescape
from typing import Iterable, List, Optional
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import aiohttp
from bs4 import BeautifulSoup, Comment

logger = logging.getLogger(__name__)


@dataclass
class ScrapedDocument:
    """Representation of scraped page content."""

    url: str
    title: str
    text: str
    fetched_at: float


class RobotsCache:
    """Cache robots.txt lookups to avoid redundant network calls."""

    def __init__(self) -> None:
        self._cache: dict[str, RobotFileParser] = {}

    async def allowed(self, session: aiohttp.ClientSession, url: str, user_agent: str) -> bool:
        parsed = urlparse(url)
        base = f"{parsed.scheme}://{parsed.netloc}"
        if base not in self._cache:
            robots_url = f"{base}/robots.txt"
            try:
                async with session.get(robots_url, timeout=10) as resp:
                    text = await resp.text()
            except Exception:  # noqa: BLE001 - fallback to allowing access when robots.txt missing
                logger.debug("Robots fetch failed for %s", robots_url, exc_info=True)
                parser = RobotFileParser()
                parser.parse("")
                self._cache[base] = parser
            else:
                parser = RobotFileParser()
                parser.parse(text.splitlines())
                parser.modified()
                self._cache[base] = parser
        parser = self._cache[base]
        return parser.can_fetch(user_agent, url)


class Scraper:
    """Asynchronous scraper with basic cleaning capabilities."""

    def __init__(self, user_agent: str, timeout: int = 20, allowed_domains: Optional[Iterable[str]] = None,
                 disallowed_domains: Optional[Iterable[str]] = None) -> None:
        self.user_agent = user_agent
        self.timeout = timeout
        self.allowed_domains = set(allowed_domains or [])
        self.disallowed_domains = set(disallowed_domains or [])
        self._robots_cache = RobotsCache()

    async def fetch_many(self, urls: Iterable[str]) -> List[ScrapedDocument]:
        """Fetch multiple URLs concurrently."""

        tasks = []
        connector = aiohttp.TCPConnector(limit=10)
        headers = {"User-Agent": self.user_agent, "Accept-Language": "en-US,en;q=0.9"}
        async with aiohttp.ClientSession(connector=connector, headers=headers) as session:
            for url in urls:
                tasks.append(asyncio.create_task(self._fetch_single(session, url)))
            results = await asyncio.gather(*tasks, return_exceptions=True)
        documents: List[ScrapedDocument] = []
        for result in results:
            if isinstance(result, ScrapedDocument):
                documents.append(result)
            elif isinstance(result, Exception):
                logger.warning("Scrape failed: %s", result)
        return documents

    async def _fetch_single(self, session: aiohttp.ClientSession, url: str) -> ScrapedDocument:
        parsed = urlparse(url)
        if self.allowed_domains and parsed.netloc not in self.allowed_domains:
            raise ValueError(f"Domain not allowed: {parsed.netloc}")
        if parsed.netloc in self.disallowed_domains:
            raise ValueError(f"Domain explicitly disallowed: {parsed.netloc}")
        allowed = await self._robots_cache.allowed(session, url, self.user_agent)
        if not allowed:
            raise PermissionError(f"Robots.txt disallows fetching {url}")
        start = time.time()
        async with session.get(url, timeout=self.timeout, allow_redirects=True) as resp:
            resp.raise_for_status()
            html = await resp.text()
        text, title = self._clean_html(html, url)
        return ScrapedDocument(url=url, title=title, text=text, fetched_at=start)

    def _clean_html(self, html: str, url: str) -> tuple[str, str]:
        soup = BeautifulSoup(html, "html.parser")
        for element in soup(["script", "style", "noscript", "header", "footer", "svg", "iframe"]):
            element.decompose()
        for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
            comment.extract()
        text = soup.get_text(separator=" ")
        text = unescape(text)
        text = re.sub(r"\s+", " ", text)
        text = text.strip()
        title = soup.title.string.strip() if soup.title and soup.title.string else url
        return text, title


def chunk_text(text: str, max_length: int = 2000) -> List[str]:
    """Split text into manageable chunks for downstream processing."""

    tokens = text.split()
    chunks: List[str] = []
    current: List[str] = []
    for token in tokens:
        current.append(token)
        if len(current) >= max_length:
            chunks.append(" ".join(current))
            current = []
    if current:
        chunks.append(" ".join(current))
    return chunks
