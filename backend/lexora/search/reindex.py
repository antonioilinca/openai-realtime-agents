"""Trigger a search index rebuild."""
from __future__ import annotations

import logging

from lexora.core.config import settings

logger = logging.getLogger(__name__)


def run() -> None:
    """Simulate a reindex job for OpenSearch."""

    logger.info("Connecting to OpenSearch at %s", settings.opensearch_url)
    logger.info("Reindex job scheduled")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run()
