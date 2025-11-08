"use client";

import React from "react";
import CodePlayground from "@/app/components/CodePlayground";
import Quiz from "@/app/components/Quiz";
import { ModuleDefinition, ProgressRecord } from "@/app/types";

interface ModuleContentProps {
  module: ModuleDefinition;
  progress: ProgressRecord;
  onMarkStep: (step: keyof ProgressRecord["steps"]) => void;
  onExerciseAttempt: (success: boolean) => void;
  onChallengeAttempt: (success: boolean) => void;
  onQuizAttempt: (success: boolean) => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  module,
  progress,
  onMarkStep,
  onExerciseAttempt,
  onChallengeAttempt,
  onQuizAttempt,
}) => {
  return (
    <div className="space-y-8">
      <section className="card-surface space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-600">
              Étape 1 · Introduction
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {module.concept.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{module.objective}</p>
          </div>
          <button
            type="button"
            onClick={() => onMarkStep("introduction")}
            className={`button-secondary ${
              progress.steps.introduction ? "pointer-events-none opacity-60" : ""
            }`}
          >
            {progress.steps.introduction
              ? "Introduction comprise"
              : "J'ai compris"}
          </button>
        </div>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          {module.concept.body.map((sentence) => (
            <li key={sentence} className="rounded-2xl bg-white/80 p-4 shadow-inner">
              {sentence}
            </li>
          ))}
        </ul>
        {module.concept.analogies && (
          <div className="rounded-2xl border border-dashed border-mint-500/50 bg-mint-100/40 p-4 text-sm text-slate-600">
            <p className="font-semibold text-mint-700">Image mentale</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {module.concept.analogies.map((analogy) => (
                <li key={analogy}>{analogy}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <CodePlayground
        label="Étape 2 · Démonstration interactive"
        description={module.demonstration.callToAction}
        initialCode={module.demonstration.code}
        runButtonLabel="Lancer la démo"
        onRun={() => onMarkStep("demonstration")}
        resettable={false}
      />

      <CodePlayground
        label="Étape 3 · Exercice guidé"
        description={module.exercise.instructions}
        initialCode={module.exercise.starterCode}
        tests={module.exercise.tests}
        successMessage={module.exercise.successMessage}
        hints={module.exercise.hints}
        attempts={progress.attempts.exercise}
        onAttempt={(success) => onExerciseAttempt(success)}
        onSuccess={() => onMarkStep("exercise")}
      />

      <CodePlayground
        label="Étape 4 · Mini-défi"
        description={module.challenge.instructions}
        initialCode={module.challenge.starterCode}
        tests={module.challenge.tests}
        successMessage={module.challenge.successMessage}
        hints={module.challenge.hints}
        attempts={progress.attempts.challenge}
        onAttempt={(success) => onChallengeAttempt(success)}
        onSuccess={() => onMarkStep("challenge")}
      />

      <section className="card-surface space-y-4">
        <Quiz
          quiz={module.quiz}
          onAttempt={(success) => onQuizAttempt(success)}
          onSuccess={() => onMarkStep("quiz")}
        />
      </section>

      <section className="card-surface space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Bonus inspiration : {module.bonus.title}
        </h3>
        <p className="text-sm text-slate-600">{module.bonus.description}</p>
        <div className="flex flex-wrap gap-3">
          {module.bonus.resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              className="button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              {resource.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          {module.challenge.reflection}
        </p>
      </section>
    </div>
  );
};

export default ModuleContent;
