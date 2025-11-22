import React from "react";
import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003366] via-[#0b2c5f] to-[#0f172a] text-white p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:block space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b88a1d] flex items-center justify-center text-xl font-black text-[#003366] shadow-inner">
            A
          </div>
          <h1 className="text-3xl font-bold">AdminCopilote</h1>
          <p className="text-white/80">
            L’assistant administratif premium pour les citoyens français : coffre-fort sécurisé, analyse IA Gemini, rappels connectés au calendrier.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• Authentification email + Google OAuth</li>
            <li>• Coffre-fort chiffré Firebase Storage</li>
            <li>• Analyse documentaire automatisée</li>
          </ul>
        </div>
        <div className="glass-panel rounded-3xl p-8 bg-white/10 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
