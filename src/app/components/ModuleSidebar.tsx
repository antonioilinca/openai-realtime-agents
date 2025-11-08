"use client";

import React from "react";
import { ModuleDefinition, ProgressRecord } from "@/app/types";

interface ModuleSidebarProps {
  modules: ModuleDefinition[];
  progress: ProgressRecord[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const StepLabels: { key: keyof ProgressRecord["steps"]; label: string }[] = [
  { key: "introduction", label: "Concept" },
  { key: "demonstration", label: "Demo" },
  { key: "exercise", label: "Exo" },
  { key: "challenge", label: "Défi" },
  { key: "quiz", label: "Quiz" },
];

function computeStepPercent(record: ProgressRecord) {
  const completed = Object.values(record.steps).filter(Boolean).length;
  return Math.round((completed / StepLabels.length) * 100);
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  progress,
  activeIndex,
  onSelect,
}) => {
  return (
    <aside className="w-full max-w-xs rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur-md">
      <div className="mb-6">
        <div className="badge">Parcours express</div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          Ton itinéraire Python
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Avance module par module, coche chaque étape et vois ta progression
          décoller.
        </p>
      </div>
      <nav className="space-y-3">
        {modules.map((module, index) => {
          const record = progress.find((item) => item.moduleId === module.id);
          if (!record) return null;
          const percent = computeStepPercent(record);
          const isActive = index === activeIndex;

          return (
            <button
              key={module.id}
              onClick={() => onSelect(index)}
              className={`w-full rounded-2xl border transition-all ${
                isActive
                  ? "border-transparent bg-mint-100/90 shadow-soft"
                  : "border-transparent bg-white hover:border-mint-500/20 hover:shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <div className="text-left">
                  <p className="text-sm font-semibold uppercase tracking-wide text-mint-600">
                    Module {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {module.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {module.duration} · {module.objective}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {percent}%
                  </span>
                  <div className="h-2.5 w-20 overflow-hidden rounded-full bg-sand-200">
                    <div
                      className="h-full rounded-full bg-mint-500 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-sand-100 px-4 py-3 text-xs text-slate-500">
                {StepLabels.map((step) => (
                  <span
                    key={step.key}
                    className={`font-medium ${
                      record.steps[step.key]
                        ? "text-mint-600"
                        : "text-slate-400"
                    }`}
                  >
                    {record.steps[step.key] ? "●" : "○"} {step.label}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default ModuleSidebar;
