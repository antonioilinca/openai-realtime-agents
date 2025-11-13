"""Top-level package for the autonomous OSINT detective system."""

from .config import Settings
from .detective import run_detective

__all__ = ["Settings", "run_detective"]
