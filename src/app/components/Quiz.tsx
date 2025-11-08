"use client";

import React, { useMemo, useState } from "react";
import { Quiz as QuizType } from "@/app/types";

interface QuizProps {
  quiz: QuizType;
  onAttempt?: (success: boolean) => void;
  disabled?: boolean;
  onSuccess?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onAttempt, disabled = false, onSuccess }) => {
  const [answers, setAnswers] = useState<number[]>(() =>
    Array.from({ length: quiz.questions.length }, () => -1),
  );
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const allAnswered = useMemo(
    () => answers.every((answer) => answer !== -1),
    [answers],
  );

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (disabled) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      setFeedback([
        "Réponds à toutes les questions avant de valider. Tu peux le faire !",
      ]);
      setStatus("error");
      return;
    }

    const newFeedback = quiz.questions.map((question, index) => {
      if (answers[index] === question.answerIndex) {
        return "Parfait !";
      }
      return question.explanation;
    });

    const success = newFeedback.every((message) => message === "Parfait !");
    setFeedback(newFeedback);
    setAttempts((value) => value + 1);
    setStatus(success ? "success" : "error");
    onAttempt?.(success);

    if (success) {
      onSuccess?.();
    }
  };

  const helperMessage = useMemo(() => {
    if (status === "success") {
      return "Bravo ! Tu maîtrises ce concept.";
    }
    if (attempts >= 2 && status === "error") {
      return "Lis bien les explications sous chaque réponse pour consolider la notion.";
    }
    return "Choisis la meilleure réponse pour chaque question.";
  }, [attempts, status]);

  return (
    <section className="card-surface space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mint-600">
            Quiz éclair
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{quiz.title}</h3>
        </div>
        <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-600">
          {quiz.questions.length} questions
        </span>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, questionIndex) => (
          <div key={question.id} className="rounded-2xl border border-sand-200 bg-white/70 p-4">
            <p className="text-sm font-semibold text-slate-700">
              {questionIndex + 1}. {question.prompt}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[questionIndex] === optionIndex;
                const isCorrect = optionIndex === question.answerIndex;
                const showState = status !== "idle";
                const stateClasses = showState
                  ? isCorrect
                    ? "border-mint-500 bg-mint-100/80 text-mint-700"
                    : isSelected
                    ? "border-accent-berry/40 bg-white text-accent-berry"
                    : ""
                  : "";

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(questionIndex, optionIndex)}
                    className={`rounded-xl border p-3 text-left text-sm transition-all ${
                      isSelected && status === "idle"
                        ? "border-mint-500 bg-mint-100/60"
                        : "border-sand-200 bg-white hover:border-mint-500/60"
                    } ${stateClasses}`}
                    disabled={disabled}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {feedback[questionIndex] && status !== "idle" && (
              <p
                className={`mt-3 text-sm ${
                  feedback[questionIndex] === "Parfait !"
                    ? "text-mint-600"
                    : "text-accent-berry"
                }`}
              >
                {feedback[questionIndex] === "Parfait !"
                  ? "Réponse exacte !"
                  : feedback[questionIndex]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="button-secondary"
          disabled={disabled}
        >
          Valider mes réponses
        </button>
        <span className="text-sm text-slate-500">{helperMessage}</span>
      </div>
    </section>
  );
};

export default Quiz;
