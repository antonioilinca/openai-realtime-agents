import numpy as np

from aion_core.config import IndexConfig
from aion_core.dedupe import find_near_duplicates


def test_find_near_duplicates() -> None:
    config = IndexConfig(embedding_dim=4, similarity_threshold=0.9, max_near_duplicates=2)
    existing = [
        np.array([1.0, 0.0, 0.0, 0.0]),
        np.array([0.0, 1.0, 0.0, 0.0]),
    ]
    candidate = np.array([0.99, 0.01, 0.0, 0.0])
    matches = find_near_duplicates(existing, candidate, config)
    assert matches == [0]

