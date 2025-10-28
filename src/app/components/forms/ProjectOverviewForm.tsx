"use client";

import { v4 as uuidv4 } from "uuid";
import type { Objective, ProjectOverview, StageLevel } from "@/app/types";

const stageOptions: StageLevel[] = [
  "Idée",
  "Prototype",
  "Lancement",
  "Croissance",
  "Relance",
];

interface ProjectOverviewFormProps {
  data: ProjectOverview;
  onChange: (value: Partial<ProjectOverview>) => void;
}

export default function ProjectOverviewForm({ data, onChange }: ProjectOverviewFormProps) {
  const updateField = (field: keyof ProjectOverview, value: string) => {
    onChange({ [field]: value } as Partial<ProjectOverview>);
  };

  const updateObjective = (objective: Objective, index: number) => {
    const nextObjectives = [...data.objectives];
    nextObjectives[index] = objective;
    onChange({ objectives: nextObjectives });
  };

  const addObjective = (horizon: Objective["horizon"]) => {
    onChange({
      objectives: [
        ...data.objectives,
        {
          id: uuidv4(),
          label: "",
          horizon,
        },
      ],
    });
  };

  const removeObjective = (id: string) => {
    onChange({ objectives: data.objectives.filter((objective) => objective.id !== id) });
  };

  return (
    <div className="step-card space-y-6">
      <header className="flex flex-col gap-2">
        <span className="badge">Profil du projet</span>
        <h2 className="section-title">Fondamentaux et ambition</h2>
        <p className="text-sm text-primary-700">
          Décrivez votre initiative. Les informations guideront l’IA pour calibrer le niveau
          d’ambition et les recommandations.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Nom du projet</label>
          <input
            className="input-field"
            value={data.projectName}
            onChange={(event) => updateField("projectName", event.target.value)}
            placeholder="Nom commercial ou code projet"
          />
        </div>
        <div>
          <label className="label">Slogan / promesse courte</label>
          <input
            className="input-field"
            value={data.slogan}
            onChange={(event) => updateField("slogan", event.target.value)}
            placeholder="Une phrase impactante"
          />
        </div>
        <div>
          <label className="label">Fondateur·rice / contact</label>
          <input
            className="input-field"
            value={data.founderName}
            onChange={(event) => updateField("founderName", event.target.value)}
            placeholder="Nom et prénom"
          />
        </div>
        <div>
          <label className="label">Email de suivi</label>
          <input
            className="input-field"
            type="email"
            value={data.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="adresse@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Secteur principal</label>
          <input
            className="input-field"
            value={data.sector}
            onChange={(event) => updateField("sector", event.target.value)}
            placeholder="Ex : SaaS, restauration, e-commerce"
          />
        </div>
        <div>
          <label className="label">Segment / niche</label>
          <input
            className="input-field"
            value={data.subSector}
            onChange={(event) => updateField("subSector", event.target.value)}
            placeholder="Ex : B2B RH, coffee shop, consulting marketing"
          />
        </div>
        <div>
          <label className="label">Stade d’avancement</label>
          <select
            className="input-field"
            value={data.stage}
            onChange={(event) => updateField("stage", event.target.value)}
          >
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Zone géographique</label>
          <input
            className="input-field"
            value={data.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="Pays / ville / zone"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Vision à 3 ans</label>
          <textarea
            className="input-field min-h-[120px]"
            value={data.vision}
            onChange={(event) => updateField("vision", event.target.value)}
            placeholder="Racontez le futur souhaité (impact, chiffre d’affaires, expansion…)"
          />
        </div>
        <div>
          <label className="label">Mission actuelle</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.mission}
            onChange={(event) => updateField("mission", event.target.value)}
            placeholder="Que faites-vous concrètement aujourd’hui ?"
          />
        </div>
        <div>
          <label className="label">Facteur différenciant</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.differentiator}
            onChange={(event) => updateField("differentiator", event.target.value)}
            placeholder="Pourquoi vous choisit-on ?"
          />
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold">Objectifs clés</h3>
            <p className="text-xs text-primary-700">
              Ajoutez 1 à 3 objectifs par horizon (30/60/90 jours, long terme).
            </p>
          </div>
          <div className="flex gap-2">
            {(["30j", "60j", "90j", "Long terme"] as Objective["horizon"][]).map((horizon) => (
              <button
                key={horizon}
                type="button"
                onClick={() => addObjective(horizon)}
                className="rounded-full border border-[color:var(--accent-primary)]/40 px-3 py-1 text-xs font-medium text-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary)]/10"
              >
                + {horizon}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {data.objectives.length === 0 && (
            <p className="text-sm text-primary-700/80">
              Aucun objectif enregistré. Ajoutez au moins une priorité pour affiner les recommandations.
            </p>
          )}
          {data.objectives.map((objective, index) => (
            <div
              key={objective.id}
              className="rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted px-4 py-3"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <label className="label">{objective.horizon}</label>
                  <input
                    className="input-field mt-1"
                    value={objective.label}
                    onChange={(event) =>
                      updateObjective(
                        { ...objective, label: event.target.value },
                        index
                      )
                    }
                    placeholder="Décrivez l’objectif"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjective(objective.id)}
                  className="mt-2 rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
