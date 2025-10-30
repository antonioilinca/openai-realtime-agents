"""Initial ingestion pipeline for Légifrance content."""
from __future__ import annotations

import logging

from lexora.core.config import settings
from lexora.utils.ids import hash_text

logger = logging.getLogger(__name__)


def run() -> None:
    """Placeholder ingestion routine that validates configuration."""

    logger.info("Starting initial ingestion")
    sensitive_keys = {
        "piste_client_id": settings.piste_client_id[:4] + "…",
        "opensearch_url": settings.opensearch_url,
    }
    logger.info("Configuration subset: %s", sensitive_keys)
    payload = "Initial ingestion executed"
    logger.info("Computed checksum: %s", hash_text(payload))
    logger.info("Ingestion completed")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run()
