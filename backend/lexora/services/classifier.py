"""Rule-based bootstrap classifier for Lexora."""
from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Iterable

from lexora.models.schemas import ClassificationEntities, ClassificationResult, Domain


@dataclass(frozen=True)
class KeywordRule:
    branch: str
    sub_branch: str
    keywords: tuple[str, ...]

    def matches(self, text: str) -> bool:
        lowered = text.lower()
        return any(keyword in lowered for keyword in self.keywords)


CONSUMER_RULES: tuple[KeywordRule, ...] = (
    KeywordRule("Droit de la consommation", "Garantie légale", ("garantie", "vice", "conformit")),
    KeywordRule("Droit de la consommation", "Litige e-commerce", ("commande", "livraison", "retour")),
)

HOUSING_RULES: tuple[KeywordRule, ...] = (
    KeywordRule("Logement", "Dépôt de garantie", ("caution", "dépôt de garantie", "retenue")),
    KeywordRule("Logement", "Charges locatives", ("charges", "répartition", "regularisation")),
)

LABOUR_RULES: tuple[KeywordRule, ...] = (
    KeywordRule("Travail", "Heures supplémentaires", ("heures", "supplémentaires", "pointage")),
    KeywordRule("Travail", "Fin de contrat", ("solde", "certificat", "attestation")),
)


RULES_BY_DOMAIN: dict[Domain, tuple[KeywordRule, ...]] = {
    "conso": CONSUMER_RULES,
    "logement": HOUSING_RULES,
    "travail": LABOUR_RULES,
}


AMOUNT_PATTERN = re.compile(r"(?P<amount>\d+[\s\u00A0]*[\.,]?[\d]{0,2})\s?€")
DATE_PATTERN = re.compile(r"\b(\d{1,2}/\d{1,2}/\d{2,4})\b")
PARTY_PATTERN = re.compile(r"\b(locataire|bailleur|employeur|salari\w+|vendeur|consommateur)\b", re.IGNORECASE)


def extract_entities(text: str) -> ClassificationEntities:
    """Extract lightweight entities from the raw situation text."""

    amounts = [float(amount.replace(" ", "").replace("\u00a0", "").replace(",", ".")) for amount in AMOUNT_PATTERN.findall(text)]
    dates = DATE_PATTERN.findall(text)
    parties = sorted({match.lower() for match in PARTY_PATTERN.findall(text)})
    return ClassificationEntities(dates=dates, amounts=amounts, parties=list(parties))


CLARIFYING_TEMPLATES: dict[Domain, list[str]] = {
    "conso": [
        "Quelle est la date d'achat ou de livraison du bien ?",
        "Avez-vous déjà mis le vendeur en demeure par écrit ?",
    ],
    "logement": [
        "Quand le logement a-t-il été restitué ?",
        "Disposez-vous de l'état des lieux de sortie ?",
    ],
    "travail": [
        "Combien d'heures supplémentaires estimez-vous non payées ?",
        "Avez-vous conservé des preuves (emails, plannings) ?",
    ],
}


def classify(domain: Domain, text: str) -> ClassificationResult:
    """Apply keyword-based heuristics as a bootstrap classifier."""

    rules = RULES_BY_DOMAIN[domain]
    for rule in rules:
        if rule.matches(text):
            entities = extract_entities(text)
            return ClassificationResult(
                branch=rule.branch,
                sub_branch=rule.sub_branch,
                entities=entities,
                clarifying_questions=[],
            )

    # No rule matched; provide clarifying questions to disambiguate.
    entities = extract_entities(text)
    return ClassificationResult(
        branch=domain.capitalize(),
        sub_branch="À préciser",
        entities=entities,
        clarifying_questions=CLARIFYING_TEMPLATES.get(domain, []),
    )


def list_supported_branches() -> Iterable[str]:
    """Expose supported branches for documentation and telemetry."""

    for domain_rules in RULES_BY_DOMAIN.values():
        for rule in domain_rules:
            yield f"{rule.branch}::{rule.sub_branch}"
