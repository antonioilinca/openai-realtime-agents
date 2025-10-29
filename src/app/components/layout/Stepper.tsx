"use client";

import clsx from "clsx";

interface StepperProps {
  steps: { id: number; label: string; description: string }[];
  activeStep: number;
  onStepChange: (id: number) => void;
}

export default function Stepper({ steps, activeStep, onStepChange }: StepperProps) {
  return (
    <nav className="glass-panel flex flex-wrap gap-4 p-4">
      {steps.map((step) => {
        const isActive = step.id === activeStep;
        const isCompleted = step.id < activeStep;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepChange(step.id)}
            className={clsx(
              "flex-1 min-w-[180px] rounded-2xl border px-4 py-3 text-left transition",
              isActive
                ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]"
                : isCompleted
                  ? "border-[color:var(--accent-primary)]/40 bg-white text-primary-900"
                  : "border-[color:var(--border-muted)] bg-white text-primary-700 hover:border-[color:var(--accent-primary)]/30"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{`Étape ${step.id}`}</span>
              {isCompleted && (
                <span className="badge border-none bg-[color:var(--accent-primary)]/20 text-[color:var(--accent-primary)]">
                  Validé
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-medium">{step.label}</p>
            <p className="text-xs text-primary-700/70">{step.description}</p>
          </button>
        );
      })}
    </nav>
  );
}
