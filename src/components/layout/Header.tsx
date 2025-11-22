"use client";

import { Bell, LogOut, Search, UserCircle2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "../ui/cn";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/inbox": "Inbox & Scan",
  "/library": "Bibliothèque administrative",
  "/calendar": "Calendrier & Rappels",
  "/vault": "Coffre-fort sécurisé",
  "/assistant": "Assistant IA",
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");

  const requestNotifications = async () => {
    if (typeof window === "undefined") return;
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("AdminCopilote", { body: "Les rappels seront affichés ici." });
    }
  };

  return (
    <header
      className={cn(
        "glass-panel soft-shadow fixed left-[290px] right-5 top-5 z-20",
        "rounded-3xl px-6 py-4 flex items-center justify-between",
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Vue actuelle</p>
        <h1 className="text-2xl font-bold text-[#003366]">{titles[pathname] || "AdminCopilote"}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un document, une démarche, une date"
            className="rounded-full bg-white/70 pl-9 pr-4 py-2 text-sm text-slate-700 shadow-inner w-80"
          />
        </div>
        <button
          onClick={requestNotifications}
          className="rounded-full border border-white/40 bg-white/60 p-3 text-[#003366] hover:shadow"
          title="Activer les notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-3 py-2 shadow">
          <UserCircle2 className="h-8 w-8 text-[#d4af37]" />
          <div>
            <p className="text-sm font-semibold">{user?.displayName || user?.email || "Mon espace"}</p>
            <p className="text-xs text-slate-500">Accès sécurisé</p>
          </div>
          <button
            onClick={() => {
              logout().then(() => router.push("/login"));
            }}
            className="ml-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
