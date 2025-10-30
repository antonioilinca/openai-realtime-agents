from __future__ import annotations

import logging
from typing import Any, Dict, List

import httpx

from backend.core.config import get_settings

# Client asynchrone minimal pour l'API Légifrance.

logger = logging.getLogger(__name__)

LEGIFRANCE_ENDPOINT = "https://api.piste.gouv.fr/dila/legifrance-beta/lf-engine-app/consult/reference"


async def fetch_articles(keywords: List[str]) -> List[Dict[str, Any]]:
  settings = get_settings()
  if not settings.legifrance_api_key:
    logger.warning("Aucune clé Légifrance fournie, renvoi de données vides.")
    return []

  payload = {
    "pageNumber": 1,
    "pageSize": 5,
    "query": " ".join(keywords)[:512]
  }

  async with httpx.AsyncClient(timeout=20) as client:
    try:
      response = await client.post(
        LEGIFRANCE_ENDPOINT,
        json=payload,
        headers={"Authorization": f"Bearer {settings.legifrance_api_key}"}
      )
      response.raise_for_status()
      data = response.json()
      results = []
      for item in data.get("results", [])[:5]:
        results.append(
          {
            "code": item.get("sourceName", ""),
            "article": item.get("cid", ""),
            "titre": item.get("title", ""),
            "lien": item.get("url", ""),
            "resume": item.get("abstract", "")
          }
        )
      return results
    except httpx.HTTPError as exc:
      logger.error("Erreur API Légifrance : %s", exc)
      return []
