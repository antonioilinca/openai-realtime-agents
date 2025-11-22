"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { addEvent, deleteEvent, fetchEvents, EventItem } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export default function CalendarPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState({ title: "", date: "", priority: "normale" as EventItem["priority"] });

  const refresh = async () => {
    const data = await fetchEvents(user?.uid);
    setEvents(data);
  };

  useEffect(() => {
    refresh();
  }, [user?.uid]);

  const save = async () => {
    if (!form.title || !form.date) {
      toast.error("Titre et date requis");
      return;
    }
    await addEvent(user?.uid || "demo", form);
    toast.success("Événement enregistré");
    setForm({ title: "", date: "", priority: "normale" });
    refresh();
  };

  const remove = async (id?: string) => {
    if (!id) return;
    await deleteEvent(id);
    refresh();
  };

  const agenda = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-[#003366]">Ajouter une échéance</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Titre"
              className="rounded-2xl bg-white/80 p-3 text-sm shadow-inner"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              className="rounded-2xl bg-white/80 p-3 text-sm shadow-inner"
            />
            <select
              value={form.priority}
              onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value as any }))}
              className="rounded-2xl bg-white/80 p-3 text-sm shadow-inner"
            >
              <option value="haute">Haute</option>
              <option value="normale">Normale</option>
              <option value="basse">Basse</option>
            </select>
          </div>
          <div className="mt-3">
            <PrimaryButton icon={Plus} onClick={save}>
              Ajouter l’événement
            </PrimaryButton>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-[#003366]" />
            <h3 className="text-lg font-semibold text-[#003366]">Agenda</h3>
          </div>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
            {agenda.map((ev) => (
              <div key={ev.id || ev.title} className="rounded-2xl bg-white/80 p-3 shadow-sm border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{ev.title}</p>
                    <p className="text-xs text-slate-500">{format(parseISO(ev.date), "PPP", { locale: fr })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        ev.priority === "haute"
                          ? "badge-urgency-high"
                          : ev.priority === "normale"
                            ? "badge-urgency-medium"
                            : "badge-urgency-low"
                      }`}
                    >
                      {ev.priority}
                    </span>
                    <button
                      onClick={() => remove(ev.id)}
                      className="rounded-full bg-red-50 p-2 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {agenda.length === 0 && <p className="text-sm text-slate-500">Aucun rappel encore. Ajoutez votre première échéance.</p>}
          </div>
        </GlassCard>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <GlassCard className="h-full">
          <p className="text-xs uppercase text-slate-500">Vue calendrier</p>
          <h3 className="text-xl font-bold text-[#003366] mb-3">Synthèse mensuelle</h3>
          <div className="rounded-3xl bg-white/70 p-4 shadow-inner grid grid-cols-7 gap-2">
            {[...Array(28)].map((_, idx) => {
              const day = idx + 1;
              const hasEvent = events.some((ev) => parseInt(ev.date.split("-")[2] || "0") === day);
              return (
                <div
                  key={day}
                  className={`flex h-12 flex-col items-center justify-center rounded-2xl border text-sm ${
                    hasEvent ? "border-[#d4af37] bg-[#d4af37]/20 text-[#003366]" : "border-white/50 bg-white"
                  }`}
                >
                  <span>{day}</span>
                  {hasEvent && <span className="text-[10px] text-[#003366]">rappel</span>}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
