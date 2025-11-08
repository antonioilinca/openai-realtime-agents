"use client";

import React, { useEffect, useMemo, useState } from "react";
import ModuleSidebar from "@/app/components/ModuleSidebar";
import MotivationBanner from "@/app/components/MotivationBanner";
import ModuleContent from "@/app/components/ModuleContent";
import { modules } from "@/app/data/modules";
import { LearnerProfile, ProgressRecord } from "@/app/types";

const STORAGE_KEY = "codex-python-day-camp-progress-v1";

const defaultProgress: ProgressRecord[] = modules.map((module) => ({
  moduleId: module.id,
  steps: {
    introduction: false,
    demonstration: false,
    exercise: false,
    challenge: false,
    quiz: false,
  },
  attempts: {
    exercise: 0,
    challenge: 0,
  },
}));

function computeProfile(records: ProgressRecord[]): LearnerProfile {
  const totalSteps = records.length * 5;
  const totalCompleted = records.reduce(
    (sum, record) => sum + Object.values(record.steps).filter(Boolean).length,
    0,
  );

  const strugglingExercise = records.find(
    (record) => !record.steps.exercise && record.attempts.exercise >= 3,
  );
  const strugglingChallenge = records.find(
    (record) => !record.steps.challenge && record.attempts.challenge >= 3,
  );

  let focusArea = "Continue de suivre les modules dans l'ordre : chaque étape consolide la précédente.";
  if (strugglingExercise) {
    const moduleDef = modules.find((item) => item.id === strugglingExercise.moduleId);
    if (moduleDef) {
      focusArea = `Reviens sur l'exercice guidé du module « ${moduleDef.title} » et relis les indices.`;
    }
  } else if (strugglingChallenge) {
    const moduleDef = modules.find((item) => item.id === strugglingChallenge.moduleId);
    if (moduleDef) {
      focusArea = `Ton mini-défi de « ${moduleDef.title} » mérite une deuxième tentative : simplifie le problème et avance pas à pas.`;
    }
  } else if (totalCompleted / totalSteps >= 0.6) {
    focusArea = "Tu avances vite ! Explore les bonus si tu as envie d'aller encore plus loin.";
  }

  let momentumMessage = "Chaque module débloque une compétence nouvelle. Tu es sur la bonne trajectoire !";
  if (totalCompleted === 0) {
    momentumMessage = "Commence par exécuter la démo du premier module : tu seras déjà en train de coder.";
  } else if (totalCompleted >= totalSteps) {
    momentumMessage = "Mission accomplie ! Lance maintenant ton mini-projet personnalisé ou partage ta calculatrice.";
  } else if (totalCompleted >= totalSteps * 0.8) {
    momentumMessage = "Plus que quelques étapes avant de conclure ce parcours. Garde cette énergie !";
  } else if (totalCompleted >= totalSteps * 0.4) {
    momentumMessage = "Tu as validé la moitié du camp d'entraînement. Les prochains modules consolident ce que tu viens d'apprendre.";
  }

  return {
    focusArea,
    momentumMessage,
    totalCompleted,
  };
}

export default function Page() {
  const [progress, setProgress] = useState<ProgressRecord[]>(defaultProgress);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ProgressRecord[];
        if (Array.isArray(parsed) && parsed.length === modules.length) {
          setProgress(parsed);
        }
      } catch (error) {
        console.warn("Impossible de charger la progression locale", error);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [isReady, progress]);

  const activeModule = modules[currentModuleIndex];
  const activeProgress = progress.find((record) => record.moduleId === activeModule.id)!;

  const profile = useMemo(() => computeProfile(progress), [progress]);

  const overallPercent = useMemo(() => {
    const totalSteps = progress.length * 5;
    const completed = progress.reduce(
      (sum, record) => sum + Object.values(record.steps).filter(Boolean).length,
      0,
    );
    return Math.round((completed / totalSteps) * 100);
  }, [progress]);

  const updateStep = (moduleId: string, step: keyof ProgressRecord["steps"]) => {
    setProgress((previous) =>
      previous.map((record) => {
        if (record.moduleId !== moduleId) return record;
        if (record.steps[step]) return record;
        return {
          ...record,
          steps: {
            ...record.steps,
            [step]: true,
          },
        };
      }),
    );
  };

  const registerAttempt = (
    moduleId: string,
    key: keyof ProgressRecord["attempts"],
    success: boolean,
  ) => {
    setProgress((previous) =>
      previous.map((record) => {
        if (record.moduleId !== moduleId) return record;
        return {
          ...record,
          attempts: {
            ...record.attempts,
            [key]: record.attempts[key] + 1,
          },
          steps: success
            ? {
                ...record.steps,
                [key === "exercise" ? "exercise" : "challenge"]: true,
              }
            : record.steps,
        };
      }),
    );
  };

  const handleExerciseAttempt = (success: boolean) => {
    registerAttempt(activeModule.id, "exercise", success);
  };

  const handleChallengeAttempt = (success: boolean) => {
    registerAttempt(activeModule.id, "challenge", success);
  };

  const handleQuizAttempt = (success: boolean) => {
    if (success) {
      updateStep(activeModule.id, "quiz");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row md:px-8">
      <ModuleSidebar
        modules={modules}
        progress={progress}
        activeIndex={currentModuleIndex}
        onSelect={setCurrentModuleIndex}
      />

      <section className="flex-1 space-y-8 pb-16">
        <MotivationBanner
          profile={profile}
          overallPercent={overallPercent}
          activeModuleTitle={activeModule.title}
        />

        <ModuleContent
          module={activeModule}
          progress={activeProgress}
          onMarkStep={(step) => updateStep(activeModule.id, step)}
          onExerciseAttempt={handleExerciseAttempt}
          onChallengeAttempt={handleChallengeAttempt}
          onQuizAttempt={handleQuizAttempt}
        />
      </section>
    </main>
  );
}
