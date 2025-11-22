"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, FileCheck2, Lightbulb, ScanLine, Shield } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { fetchEvents } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const tips = [
  "Ajoutez vos justificatifs dans le coffre pour les partager en un clic.",
  "Planifiez vos échéances directement depuis l’analyse IA.",
  "Le chat IA reste ouvert même en changeant de page : posez vos questions en continu.",
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents(user?.uid).then(setEvents);
  }, [user?.uid]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8">
        <GlassCard className="gradient-hero text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[#f4d77b]">Bienvenue</p>
            <h2 className="text-3xl md:text-4xl font-bold">AdminCopilote simplifie toutes vos démarches</h2>
            <p className="text-lg text-white/80">
              Centralisez vos documents, suivez vos échéances et laissez l’IA préparer vos dossiers selon les sources officielles françaises.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton icon={ScanLine} onClick={() => window.location.assign("/inbox")}>Scanner mon premier document</PrimaryButton>
              <Link
                href="/assistant"
                className="rounded-3xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Poser une question à l’IA
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="rounded-3xl bg-white/20 px-5 py-4 text-sm text-white/90 shadow-inner">
              <p className="font-semibold text-white">Sécurité renforcée</p>
              <p>Authentification Firebase, stockage chiffré et audit trail.</p>
            </div>
          </div>
        </GlassCard>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            {
              title: "Documents en attente",
              value: "6",
              icon: FileCheck2,
              desc: "Scannez et classez en moins d’une minute.",
            },
            {
              title: "Deadlines proches",
              value: "3",
              icon: CalendarDays,
              desc: "Synchronisé avec votre calendrier sécurisé.",
            },
            {
              title: "Dossiers complétés",
              value: "18",
              icon: Shield,
              desc: "Archivés dans le coffre chiffré.",
            },
          ].map((card, idx) => (
            <motion.div key={card.title} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}>
              <GlassCard>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[#003366]/10 p-3 text-[#003366]">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <p className="text-2xl font-bold text-[#003366]">{card.value}</p>
                    <p className="text-xs text-slate-500">{card.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="mt-4">
          <div className="flex items-center gap-2 mb-4 text-[#003366]">
            <Lightbulb className="h-5 w-5 text-[#d4af37]" />
            <h3 className="text-lg font-semibold">Conseils IA personnalisés</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="rounded-2xl bg-white/70 p-3 text-sm text-slate-700 shadow-inner">
                {tip}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <GlassCard className="h-full">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase text-slate-500">Prochaines échéances</p>
              <h3 className="text-xl font-bold text-[#003366]">Rappels synchronisés</h3>
            </div>
            <Link href="/calendar" className="text-sm font-semibold text-[#d4af37]">Voir tout</Link>
          </div>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
            {events.map((ev) => (
              <div key={ev.id} className="rounded-2xl bg-white/80 p-3 shadow-sm border border-white/60">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#003366]">{ev.title}</p>
                  <span
                    className={
                      ev.priority === "haute"
                        ? "badge-urgency-high px-2 py-1 rounded-full text-xs"
                        : ev.priority === "normale"
                          ? "badge-urgency-medium px-2 py-1 rounded-full text-xs"
                          : "badge-urgency-low px-2 py-1 rounded-full text-xs"
                    }
                  >
                    {ev.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Échéance : {ev.date}</p>
              </div>
            ))}
            {events.length === 0 && <p className="text-sm text-slate-500">Aucune échéance pour le moment.</p>}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
