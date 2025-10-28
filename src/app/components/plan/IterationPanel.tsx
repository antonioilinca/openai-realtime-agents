"use client";

import { FormEvent, useState } from "react";
import type { IterationMessage } from "@/app/types";

interface IterationPanelProps {
  conversation: IterationMessage[];
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
}

export default function IterationPanel({ conversation, onSend, isLoading }: IterationPanelProps) {
  const [draft, setDraft] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    await onSend(draft.trim());
    setDraft("");
  };

  return (
    <section className="glass-panel flex h-full flex-col justify-between gap-4 p-6">
      <div>
        <h2 className="text-lg font-semibold">Copilote IA</h2>
        <p className="text-sm text-primary-700">
          Demandez des ajustements, priorisez des actions ou explorez des scénarios.
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-[color:var(--border-muted)] bg-surface-muted/70 p-4">
        {conversation.length === 0 && (
          <p className="text-sm text-primary-700/70">
            La conversation démarrera après la première génération du plan.
          </p>
        )}
        {conversation.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${message.role === "assistant" ? "bg-white" : "bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]"}`}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-wide">
              <span>{message.role === "assistant" ? "Stratège IA" : "Vous"}</span>
              <span className="text-primary-700/60">
                {new Date(message.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-primary-900/90">{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="input-field min-h-[120px]"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ex : Peux-tu renforcer le plan d’acquisition sur LinkedIn et réduire le budget publicité ?"
        />
        <button
          type="submit"
          disabled={isLoading || !draft.trim()}
          className="w-full rounded-2xl bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(10,115,225,0.28)] transition hover:bg-[#085ec0] disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Analyse en cours…" : "Envoyer la consigne"}
        </button>
      </form>
    </section>
  );
}
