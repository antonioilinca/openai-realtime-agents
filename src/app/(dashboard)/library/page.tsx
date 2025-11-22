"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { BookOpenCheck } from "lucide-react";

const categories = [
  "Naturalisation",
  "Carte Grise",
  "Logement",
  "Santé",
  "Impôts",
  "Emploi",
  "Études",
  "Justice",
  "Voyage",
];

export default function LibraryPage() {
  return (
    <div className="grid gap-6">
      <GlassCard className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <BookOpenCheck className="h-6 w-6 text-[#d4af37]" />
          <div>
            <p className="text-xs uppercase text-slate-500">Guides officiels</p>
            <h3 className="text-xl font-semibold text-[#003366]">Bibliothèque administrative</h3>
          </div>
        </div>
        <p className="text-sm text-slate-600">Consultez les fiches pratiques validées par des juristes et reliées aux sources officielles françaises.</p>
      </GlassCard>
      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <motion.div key={cat} whileHover={{ y: -4 }}>
            <GlassCard className="p-5 group transition">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#003366]">{cat}</h4>
                <span className="rounded-full bg-[#003366]/10 px-3 py-1 text-xs font-semibold text-[#003366]">Guide</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">Conseils pas à pas, documents nécessaires, délais, coûts.</p>
              <Link
                href={`/library/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="mt-4 inline-flex items-center rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-[#003366] shadow-sm opacity-0 group-hover:opacity-100"
              >
                Consulter le guide
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
