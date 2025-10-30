from __future__ import annotations

import json
import logging
from typing import Any, Dict, List

from openai import AsyncOpenAI, APIConnectionError, RateLimitError
from mistralai.async_client import MistralAsyncClient

from backend.core.config import get_settings

# Orchestration des appels aux modèles GPT-5 et Mistral.

logger = logging.getLogger(__name__)

CLASSIFICATION_PROMPT = """
Tu es un assistant juridique français. Identifie le domaine juridique principal du texte utilisateur parmi : civil, pénal, travail, immobilier, administratif, commercial, fiscal, consommation, propriété intellectuelle. Réponds uniquement par le domaine.
"""

REASONING_PROMPT = """
Tu es LexaIA, juriste numérique. Analyse la situation fournie en français et produis un JSON respectant le schéma suivant :
{
  "domain": "domaine identifié",
  "keywords": ["mot-clé"],
  "articles": [
    {"code": "Code civil", "article": "Article 1240", "titre": "Titre", "lien": "https://...", "resume": "Résumé vulgarisé"}
  ],
  "summary": "Synthèse claire",
  "actions": ["Première action", "Deuxième action", "Troisième action"],
  "success_score": 0-100,
  "sources": ["Source"]
}
Explique en langage courant, cite les articles fournis et propose trois actions concrètes.
"""


class GPTLegalEngine:
  """Gestionnaire des appels IA avec repli Mistral."""

  def __init__(self) -> None:
    settings = get_settings()
    self._openai_client = AsyncOpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None
    self._mistral_client = (
      MistralAsyncClient(api_key=settings.mistral_api_key) if settings.mistral_api_key else None
    )

  async def classify_domain(self, text: str) -> str:
    if not self._openai_client:
      return "civil"
    try:
      response = await self._openai_client.responses.create(
        model="gpt-5-classic",
        input=[{"role": "system", "content": CLASSIFICATION_PROMPT}, {"role": "user", "content": text}]
      )
      content = response.output[0].content[0].text.strip().lower()
      return content.split()[0]
    except (APIConnectionError, RateLimitError) as exc:
      logger.warning("Echec classification GPT-5 : %s", exc)
      if self._mistral_client:
        mistral = await self._mistral_client.chat.complete(
          model="mistral-small-latest",
          messages=[{"role": "system", "content": CLASSIFICATION_PROMPT}, {"role": "user", "content": text}]
        )
        return mistral.choices[0].message.content.strip().lower()
      return "civil"

  async def generate_analysis(self, text: str, suggested_articles: List[Dict[str, str]]) -> Dict[str, Any]:
    payload = {
      "role": "user",
      "content": json.dumps({"situation": text, "articles": suggested_articles}, ensure_ascii=False)
    }
    if not self._openai_client:
      return self._fallback_response(suggested_articles)
    try:
      response = await self._openai_client.responses.create(
        model="gpt-5-classic",
        input=[{"role": "system", "content": REASONING_PROMPT}, payload]
      )
      text_response = response.output[0].content[0].text
      return json.loads(text_response)
    except Exception as exc:  # noqa: BLE001 - log et fallback
      logger.error("Echec génération GPT-5 : %s", exc)
      if self._mistral_client:
        mistral = await self._mistral_client.chat.complete(
          model="mistral-medium-latest",
          messages=[{"role": "system", "content": REASONING_PROMPT}, payload]
        )
        try:
          return json.loads(mistral.choices[0].message.content)
        except json.JSONDecodeError:
          logger.exception("Réponse Mistral invalide")
      return self._fallback_response(suggested_articles)

  def _fallback_response(self, articles: List[Dict[str, str]]) -> Dict[str, Any]:
    return {
      "domain": "civil",
      "keywords": ["litige", "droit"],
      "articles": articles,
      "summary": "Nous n'avons pas pu interroger le modèle GPT-5. Veuillez réessayer plus tard.",
      "actions": [
        "Contacter un avocat spécialisé pour confirmer la stratégie.",
        "Réunir toutes les pièces justificatives (contrats, courriers, justificatifs).",
        "Tenter une résolution amiable avant toute action contentieuse."
      ],
      "success_score": 50,
      "sources": [article.get("lien", "") for article in articles if article.get("lien")]
    }
