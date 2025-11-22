"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { MailCheck, RotateCcw } from "lucide-react";

export default function ResetPage() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("demo@admincopilote.fr");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    router.push("/login");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-center gap-3">
        <RotateCcw className="h-5 w-5 text-[#d4af37]" />
        <div>
          <p className="text-xs uppercase text-white/60">Réinitialisation</p>
          <h2 className="text-2xl font-bold">Mot de passe oublié</h2>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/80 flex items-center gap-2"><MailCheck className="h-4 w-4" /> Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl bg-white/90 p-3 text-slate-800"
          placeholder="prenom.nom@email.fr"
        />
      </div>
      <PrimaryButton type="submit" className="w-full justify-center" icon={RotateCcw}>
        {loading ? "Envoi..." : "Envoyer le lien"}
      </PrimaryButton>
      <div className="text-sm text-white/80">
        <Link href="/login" className="underline">Retour connexion</Link>
      </div>
    </form>
  );
}
