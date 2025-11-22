"use client";

import { useState } from "react";
import { MessageSquareText, Send } from "lucide-react";
import { chatWithGemini } from "@/lib/gemini";
import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";
import { cn } from "../ui/cn";
import toast from "react-hot-toast";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis AdminCopilote. Je peux analyser vos documents, planifier vos échéances et vous guider étape par étape.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const answer = await chatWithGemini(
        newMessages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", content: m.content })),
      );
      setMessages([...newMessages, { role: "assistant", content: answer }]);
    } catch {
      toast.error("Impossible d’appeler Gemini. Mode réponse locale activé.");
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Gemini n’est pas configuré pour le moment. Ajoutez la variable NEXT_PUBLIC_GEMINI_API_KEY pour activer l’IA en direct.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mb-3 w-[360px] max-h-[520px] overflow-hidden">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase text-slate-500">Assistant IA</p>
                <p className="text-lg font-semibold text-[#003366]">Chat temps réel</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Fermer
              </button>
            </div>
            <div className="rounded-2xl bg-white/70 p-3 h-64 overflow-y-auto space-y-3 scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm shadow-sm", 
                    m.role === "assistant" ? "bg-[#003366]/90 text-white" : "bg-white text-slate-800 border border-slate-100",
                  )}
                >
                  {m.content}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="w-full rounded-2xl bg-white/80 p-3 text-sm shadow-inner"
                placeholder="Posez une question administrative..."
              />
              <PrimaryButton onClick={sendMessage} disabled={loading} icon={Send}>
                Envoyer
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      )}
      <button
        onClick={() => setOpen((p) => !p)}
        className="glass-panel soft-shadow flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[#003366] hover:shadow-xl"
      >
        <MessageSquareText className="h-5 w-5 text-[#d4af37]" />
        Chat IA
      </button>
    </div>
  );
}
