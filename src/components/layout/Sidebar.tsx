"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Library,
  Calendar,
  Shield,
  MessageSquareText,
  Settings,
} from "lucide-react";
import { cn } from "../ui/cn";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox & Scan", icon: Inbox },
  { href: "/library", label: "Bibliothèque", icon: Library },
  { href: "/calendar", label: "Calendrier", icon: Calendar },
  { href: "/vault", label: "Coffre-fort", icon: Shield },
  { href: "/assistant", label: "Assistant IA", icon: MessageSquareText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel soft-shadow fixed left-5 top-5 bottom-5 w-64 rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b88a1d] flex items-center justify-center text-xl font-black text-[#003366] shadow-inner">
            A
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">Assistant premium</p>
            <p className="text-xl font-bold text-[#003366]">AdminCopilote</p>
          </div>
        </div>
        <nav className="space-y-2">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition",
                    "hover:bg-white/80 hover:shadow-md",
                    active && "bg-white/90 border-l-4 border-[#d4af37] text-[#003366]",
                  )}
                >
                  <item.icon className="h-5 w-5 text-[#d4af37]" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="pt-6 border-t border-white/40">
        <Link href="/assistant" className="flex items-center gap-2 text-sm font-semibold text-[#003366] hover:text-[#b88a1d]">
          <Settings className="h-4 w-4" />
          Paramètres & Profil
        </Link>
      </div>
    </aside>
  );
}
