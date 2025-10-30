"""Generate procedural plans based on analysis outcomes."""
from __future__ import annotations

from datetime import date, timedelta
from typing import Iterable

from lexora.models.schemas import AccountType, PlanResponse, PlanStep
from lexora.utils.ids import short_uuid


class ProcedureEngine:
    """Deterministic rule engine that converts analyses into action plans."""

    def __init__(self, *, today: date | None = None) -> None:
        self._today = today or date.today()

    def build_plan(
        self,
        *,
        analysis_id: str,
        goals: Iterable[str],
        citations: Iterable[str],
        account_type: AccountType,
    ) -> PlanResponse:
        """Return a procedural plan aligned with the provided goals."""

        steps: list[PlanStep] = []
        focus_text = (
            "Priorité entreprise : sécuriser les obligations légales et la traçabilité des décisions."
            if account_type == "company"
            else "Priorité particulier : protéger vos droits et conserver les preuves essentielles."
        )

        authority = (
            "Service juridique interne / Conseil externe"
            if account_type == "company"
            else "Lettre recommandée avec AR"
        )
        default_docs = (
            ["Contrat", "Echanges commerciaux", "Tableau de suivi interne"]
            if account_type == "company"
            else ["Justificatifs", "Pièces jointes pertinentes"]
        )

        for idx, goal in enumerate(goals or ["Mettre en demeure la partie adverse"]):
            deadline = self._today + timedelta(days=15 + idx * 5)
            steps.append(
                PlanStep(
                    step=f"Étape {idx + 1} – {goal}",
                    legal_basis=list(citations),
                    deadline=deadline.strftime("%d/%m/%Y"),
                    authority=authority,
                    cost=(
                        "Budget assistance juridique / frais postaux"
                        if account_type == "company"
                        else "Frais postaux"
                    ),
                    required_docs=list(default_docs),
                )
            )

        deadlines = [step.deadline for step in steps if step.deadline]
        authorities = sorted({step.authority for step in steps if step.authority})
        costs = sorted({step.cost for step in steps if step.cost})
        return PlanResponse(
            plan_id=f"plan-{short_uuid()}",
            steps=steps,
            deadlines=deadlines,
            costs=list(costs),
            authorities=list(authorities),
            kpis={"next_deadline": deadlines[0] if deadlines else None},
            audience_focus=focus_text,
        )

