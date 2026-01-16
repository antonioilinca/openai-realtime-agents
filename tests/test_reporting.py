from datetime import datetime

from aion_core.models import DocumentRecord
from aion_core.reporting import build_daily_brief


def test_build_daily_brief() -> None:
    doc = DocumentRecord(
        doc_id="doc-1",
        source_id="source",
        url="https://example.com",
        canonical_url="https://example.com",
        title="Title",
        author=None,
        published_at=None,
        ingested_at=datetime.utcnow(),
        language=None,
        content_hash="hash",
        summary_short="Short",
        summary_long="Long",
        tags=[],
        raw_path="storage/raw/doc-1.txt",
        metadata={},
    )
    brief = build_daily_brief([doc])
    assert brief["items"][0]["title"] == "Title"

