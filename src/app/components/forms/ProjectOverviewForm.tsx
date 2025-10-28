"use client";

import { v4 as uuidv4 } from "uuid";

import type { Objective, ProjectOverview, StageLevel } from "@/app/types";

const stageOptions: StageLevel[] = ["Idée", "Prototype", "Lancement", "Croissance", "Relance"];

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
        <h2 className="section-title">Essentiels et ambition</h2>
        <p className="text-sm text-primary-700">
          Fournissez l’ADN du projet : Atlas IA comblera le reste pour livrer un plan spectaculaire.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Nom du projet</label>
          <input
            className="input-field"
            value={data.projectName}
            onChange={(event) => updateField("projectName", event.target.value)}
            placeholder="Nom commercial ou code projet"
          />
        </div>
        <div>
          <label className="label">Secteur</label>
          <input
            className="input-field"
            value={data.sector}
            onChange={(event) => updateField("sector", event.target.value)}
            placeholder="Ex : SaaS, restauration, formation..."
          />
        </div>
        <div>
          <label className="label">Stade</label>
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
      </div>

      <div className="grid gap-4">
        <div>
          <label className="label">Pitch éclair</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.elevatorPitch}
            onChange={(event) => updateField("elevatorPitch", event.target.value)}
            placeholder="En 3 phrases : qui vous êtes, ce que vous proposez et pour qui."
          />
        </div>
        <div>
          <label className="label">Vision à 3 ans</label>
          <textarea
            className="input-field min-h-[110px]"
            value={data.vision}
            onChange={(event) => updateField("vision", event.target.value)}
            placeholder="Impact visé, traction espérée, changements majeurs..."
          />
        </div>
        <div>
          <label className="label">Signature différenciante</label>
          <textarea
            className="input-field min-h-[90px]"
            value={data.differentiator}
            onChange={(event) => updateField("differentiator", event.target.value)}
            placeholder="Ce qui vous rend inimitable (approche, techno, communauté...)."
          />
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold">Objectifs phares</h3>
            <p className="text-xs text-primary-700">
              Priorités 30/60/90 jours ou long terme. Trois objectifs percutants suffisent.
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
              Ajoutez au moins une priorité pour que l’IA orchestre les jalons clés.
            </p>
          )}
          {data.objectives.map((objective, index) => (
            <div key={objective.id} className="rounded-2xl border border-[color:var(--border-muted)] bg-white/60 p-4">
              <div className="flex items-center justify-between">
                <span className="badge badge-subtle">{objective.horizon}</span>
                <button
                  type="button"
                  onClick={() => removeObjective(objective.id)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Retirer
                </button>
              </div>
              <textarea
                className="mt-3 input-field min-h-[70px]"
                value={objective.label}
                onChange={(event) =>
                  updateObjective(
                    {
                      ...objective,
                      label: event.target.value,
                    },
                    index,
                  )
                }
                placeholder="Ex : boucler 5 ventes pilotes, lancer un partenariat majeur..."
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
