"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { LogIn, Mail, Lock, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("demo@admincopilote.fr");
  const [password, setPassword] = useState("demo-demo");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    router.push("/");
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-center gap-3">
        <LogIn className="h-5 w-5 text-[#d4af37]" />
        <div>
          <p className="text-xs uppercase text-white/60">Connexion sécurisée</p>
          <h2 className="text-2xl font-bold">AdminCopilote</h2>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/80 flex items-center gap-2"><Mail className="h-4 w-4" /> Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl bg-white/90 p-3 text-slate-800"
          placeholder="prenom.nom@email.fr"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/80 flex items-center gap-2"><Lock className="h-4 w-4" /> Mot de passe</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full rounded-2xl bg-white/90 p-3 text-slate-800"
          placeholder="••••••"
        />
      </div>
      <PrimaryButton type="submit" className="w-full justify-center" icon={ShieldCheck}>
        {loading ? "Connexion..." : "Se connecter"}
      </PrimaryButton>
      <button
        type="button"
        onClick={() => loginWithGoogle().then(() => router.push("/"))}
        className="w-full rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-[#003366] shadow-inner"
      >
        Connexion avec Google
      </button>
      <div className="flex items-center justify-between text-sm text-white/80">
        <Link href="/register" className="underline">Créer un compte</Link>
        <Link href="/reset" className="underline">Mot de passe oublié</Link>
      </div>
    </form>
  );
}
