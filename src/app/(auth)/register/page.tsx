"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { UserPlus, Mail, Lock, BadgeCheck } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(form);
    router.push("/");
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-5 w-5 text-[#d4af37]" />
        <div>
          <p className="text-xs uppercase text-white/60">Créer un compte</p>
          <h2 className="text-2xl font-bold">Accès AdminCopilote</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          value={form.prenom}
          onChange={(e) => setForm((p) => ({ ...p, prenom: e.target.value }))}
          placeholder="Prénom"
          className="rounded-2xl bg-white/90 p-3 text-slate-800"
        />
        <input
          value={form.nom}
          onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
          placeholder="Nom"
          className="rounded-2xl bg-white/90 p-3 text-slate-800"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/80 flex items-center gap-2"><Mail className="h-4 w-4" /> Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-2xl bg-white/90 p-3 text-slate-800"
          placeholder="prenom.nom@email.fr"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/80 flex items-center gap-2"><Lock className="h-4 w-4" /> Mot de passe</label>
        <input
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          type="password"
          className="w-full rounded-2xl bg-white/90 p-3 text-slate-800"
          placeholder="••••••"
        />
      </div>
      <PrimaryButton type="submit" className="w-full justify-center" icon={BadgeCheck}>
        {loading ? "Création..." : "Créer mon compte"}
      </PrimaryButton>
      <div className="text-sm text-white/80">
        Déjà inscrit ? <Link href="/login" className="underline">Se connecter</Link>
      </div>
    </form>
  );
}
