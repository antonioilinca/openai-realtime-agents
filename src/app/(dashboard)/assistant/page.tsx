"use client";

import { useState } from "react";
import { MessageSquareText, Send, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { chatWithGemini } from "@/lib/gemini";
import toast from "react-hot-toast";

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Je suis AdminCopilote, spécialisé dans les démarches françaises. Posez vos questions ou glissez un contexte et je vous guide avec des liens officiels.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const updated = [...messages, { role: "user" as const, content: input }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const answer = await chatWithGemini(
        updated.map((m) => ({ role: m.role === "assistant" ? "model" : "user", content: m.content })),
      );
      setMessages([...updated, { role: "assistant", content: answer }]);
    } catch {
      toast.error("Gemini non configuré. Ajoutez NEXT_PUBLIC_GEMINI_API_KEY");
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: "Mode démo : l’IA sera disponible après ajout de la clé Gemini.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-4">
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareText className="h-5 w-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#003366]">Assistant administratif</h3>
          </div>
          <div className="h-[520px] overflow-y-auto rounded-3xl bg-white/70 p-4 space-y-3 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-3xl rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "assistant" ? "bg-[#003366] text-white" : "ml-auto bg-white text-slate-800 border border-white/60"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              className="w-full rounded-3xl bg-white/80 p-4 text-sm shadow-inner"
              placeholder="Décrivez votre situation administrative..."
            />
            <PrimaryButton onClick={send} disabled={loading} icon={Send}>
              {loading ? "Réponse en cours" : "Envoyer"}
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-[#003366]" />
            <h3 className="text-lg font-semibold text-[#003366]">Prompt système</h3>
          </div>
          <p className="text-sm text-slate-700">
            « Tu es AdminCopilote, expert administratif français. Tu t’appuies sur service-public.fr, impots.gouv.fr, ameli.fr. Tu
            proposes des étapes claires, des liens officiels et des rappels de délais. »
          </p>
          <p className="mt-3 text-xs text-slate-500">Toutes les conversations sont historisées dans Firestore lorsqu’il est configuré.</p>
        </GlassCard>
      </div>
    </div>
  );
}
