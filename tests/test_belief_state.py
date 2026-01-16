from datetime import datetime

from aion_core.belief_state import build_beliefs
from aion_core.models import DocumentRecord


def test_build_beliefs() -> None:
    doc = DocumentRecord(
        doc_id="doc-1",
        source_id="source",
        url="https://example.com",
        canonical_url="https://example.com",
        title="Test Title",
        author=None,
        published_at=None,
        ingested_at=datetime.utcnow(),
        language="en",
        content_hash="hash",
        summary_short="Short summary",
        summary_long="Long summary",
        tags=["ai"],
        raw_path="storage/raw/doc-1.txt",
        metadata={"source_quality": 0.8},
    )
    beliefs = build_beliefs([doc])
    assert beliefs[0].subject == "Test Title"
    assert beliefs[0].confidence == 0.8

