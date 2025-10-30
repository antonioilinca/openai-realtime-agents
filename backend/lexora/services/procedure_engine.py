"""Generate procedural plans based on analysis outcomes."""
from __future__ import annotations

from datetime import date, timedelta
from typing import Iterable

from lexora.models.schemas import PlanResponse, PlanStep


class ProcedureEngine:
    """Deterministic rule engine that converts analyses into action plans."""

    def __init__(self, *, today: date | None = None) -> None:
        self._today = today or date.today()

    def build_plan(self, *, analysis_id: str, goals: Iterable[str], citations: Iterable[str]) -> PlanResponse:
        """Return a procedural plan aligned with the provided goals."""

        steps: list[PlanStep] = []
        for idx, goal in enumerate(goals or ["Mettre en demeure la partie adverse"]):
            deadline = self._today + timedelta(days=15 + idx * 5)
            steps.append(
                PlanStep(
                    step=f"Étape {idx + 1} – {goal}",
                    legal_basis=list(citations),
                    deadline=deadline.strftime("%d/%m/%Y"),
                    authority="Lettre recommandée avec AR",
                    cost="Frais postaux",  # Placeholder cost
                    required_docs=["Justificatifs", "Pièces jointes pertinentes"],
                )
            )

        deadlines = [step.deadline for step in steps if step.deadline]
        authorities = sorted({step.authority for step in steps if step.authority})
        costs = sorted({step.cost for step in steps if step.cost})
        return PlanResponse(
            plan_id=f"plan-{analysis_id}",
            steps=steps,
            deadlines=deadlines,
            costs=list(costs),
            authorities=list(authorities),
            kpis={"next_deadline": deadlines[0] if deadlines else None},
        )

