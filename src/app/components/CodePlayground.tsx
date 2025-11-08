"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CodeTest, Exercise } from "@/app/types";

type ExecutionTestResult = {
  index: number;
  description?: string;
  status: "passed" | "failed";
  message?: string;
};

type ExecutionResult = {
  success: boolean;
  output: string;
  tests: ExecutionTestResult[];
  friendly_message?: string;
  error_type?: string;
  error_message?: string;
  traceback?: string;
};

interface CodePlaygroundProps {
  label: string;
  description?: string;
  initialCode: string;
  tests?: CodeTest[];
  successMessage?: string;
  hints?: Exercise["hints"];
  attempts?: number;
  onAttempt?: (success: boolean, result: ExecutionResult) => void;
  onSuccess?: () => void;
  onRun?: () => void;
  lockEditing?: boolean;
  runButtonLabel?: string;
  resettable?: boolean;
  anchorId?: string;
}

const defaultResult: ExecutionResult = {
  success: false,
  output: "",
  tests: [],
};

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  label,
  description,
  initialCode,
  tests = [],
  successMessage,
  hints,
  attempts = 0,
  onAttempt,
  onSuccess,
  onRun,
  lockEditing = false,
  runButtonLabel = "Exécuter",
  resettable = true,
  anchorId,
}) => {
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">(
    "idle",
  );
  const [result, setResult] = useState<ExecutionResult>(defaultResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasRunAtLeastOnce, setHasRunAtLeastOnce] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setStatus("idle");
    setResult(defaultResult);
    setErrorMessage(null);
    setHasRunAtLeastOnce(false);
  }, [initialCode]);

  const hintToDisplay = useMemo(() => {
    if (!hints) return null;
    if (status === "success" && attempts <= 1) {
      return hints.advanced;
    }
    if (status !== "success" && attempts >= 2) {
      return hints.remedial;
    }
    return hints.baseline;
  }, [attempts, hints, status]);

  const runCode = async () => {
    setStatus("running");
    setErrorMessage(null);
    setHasRunAtLeastOnce(true);
    onRun?.();
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          tests,
          userCode: code,
        }),
      });

      const data: ExecutionResult = await response.json();

      if (!response.ok) {
        throw new Error(data?.error_message || "Exécution impossible");
      }

      setResult(data);

      if (data.success) {
        setStatus("success");
        setErrorMessage(null);
        onAttempt?.(true, data);
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(
          data.friendly_message ||
            data.error_message ||
            "Le test n'a pas encore été validé. Regarde les indices ci-dessous.",
        );
        onAttempt?.(false, data);
      }
    } catch (error: any) {
      setStatus("error");
      const fallback =
        error?.message ||
        "Le serveur Python n'a pas répondu. Réessaie dans un instant.";
      setErrorMessage(fallback);
      onAttempt?.(false, {
        ...defaultResult,
        success: false,
        output: result.output,
        tests: result.tests,
        friendly_message: fallback,
      });
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setStatus("idle");
    setResult(defaultResult);
    setErrorMessage(null);
    setHasRunAtLeastOnce(false);
  };

  return (
    <section id={anchorId} className="card-surface space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mint-600">
            {label}
          </p>
          {description && (
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
          )}
        </div>
        {resettable && (
          <button
            type="button"
            onClick={resetCode}
            className="text-xs font-semibold text-mint-600 underline-offset-4 hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div className="rounded-2xl bg-slate-900/95 p-4 text-sm text-slate-100 shadow-inner">
        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="h-48 w-full resize-y rounded-xl border border-slate-700 bg-slate-900/60 p-3 font-mono text-sm text-white focus:border-mint-500 focus:outline-none"
          spellCheck={false}
          readOnly={lockEditing}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={runCode}
            disabled={status === "running"}
            className="button-primary"
          >
            {status === "running" ? "Exécution en cours…" : runButtonLabel}
          </button>
          {status === "success" && successMessage && (
            <span className="text-sm font-semibold text-mint-100">
              {successMessage}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white/80 p-4 text-sm shadow-inner">
        <h4 className="text-sm font-semibold text-slate-700">Console Python</h4>
        <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-600">
          {result.output.trim() ? result.output : "(En attente d'exécution...)"}
        </pre>
      </div>

      {tests.length > 0 && hasRunAtLeastOnce && (
        <div className="rounded-2xl border border-sand-200 bg-white/70 p-4">
          <h4 className="text-sm font-semibold text-slate-700">Tests automatiques</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {tests.map((test, index) => {
              const outcome = result.tests.find((item) => item.index === index);
              const statusLabel = outcome?.status || "pending";
              const color =
                statusLabel === "passed"
                  ? "text-mint-600"
                  : statusLabel === "failed"
                  ? "text-accent-berry"
                  : "text-slate-400";
              return (
                <li key={test.description + index} className={`flex items-start gap-2 ${color}`}>
                  <span>{statusLabel === "passed" ? "✔" : statusLabel === "failed" ? "✖" : "•"}</span>
                  <span>
                    {test.description}
                    {outcome?.message && (
                      <span className="block text-xs text-slate-500">
                        {outcome.message}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {(errorMessage || hintToDisplay) && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            status === "success"
              ? "border-mint-500/40 bg-mint-100/40 text-mint-700"
              : "border-accent-berry/30 bg-white text-accent-berry"
          }`}
        >
          {errorMessage && <p className="font-semibold">{errorMessage}</p>}
          {hintToDisplay && (
            <p className="mt-2 text-slate-600">
              <span className="font-semibold text-slate-700">Indice :</span> {hintToDisplay}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default CodePlayground;
