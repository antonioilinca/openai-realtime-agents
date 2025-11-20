/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";

const inboxHighlights = [
  {
    title: "Organisme détecté",
    description: "CAF, CPAM, Impôts, bailleur, assurance, préfecture…",
  },
  {
    title: "Infos critiques",
    description: "Deadline, montants, numéro de dossier, actions demandées.",
  },
  {
    title: "Risques & urgences",
    description: "Score d'urgence automatique et rappel intelligent.",
  },
];

const actionSteps = [
  {
    title: "Créer ou accéder à ton espace",
    detail: "Connexion sécurisée sur l'espace officiel avec guidage pas-à-pas.",
    time: "2 min",
    link: "caf.fr",
  },
  {
    title: "Uploader les justificatifs",
    detail: "Attestation employeur, justificatif de domicile, pièce d'identité.",
    time: "3 min",
    link: "documents sécurisés",
  },
  {
    title: "Envoyer la demande",
    detail: "Modèle de mail/lettre généré automatiquement, envoi en 1 clic.",
    time: "1 min",
    link: "modèle auto",
  },
  {
    title: "Suivre la validation",
    detail: "Notifications intelligentes, relances polies, calendrier synchronisé.",
    time: "continu",
    link: "rappels IA",
  },
];

const thematicCards = [
  "Naturalisation / nationalité",
  "Titre de séjour / renouvellement",
  "Permis de conduire",
  "Logement & dossier locatif",
  "APL & aides sociales",
  "CPAM / Carte Vitale / Mutuelle",
  "Alternance / apprentissage",
  "Impôts & première déclaration",
  "Auto-entrepreneur / URSSAF",
  "Litiges simples / résiliations",
];

const aiPillars = [
  "OCR Vision + extraction structurée",
  "Résumé contextuel en langage simple",
  "Génération de plans d'action",
  "Modèles de mails / lettres",
  "Suggestions personnalisées",
  "Chat IA spécialisé administratif",
];

const reminders = [
  {
    label: "Déclaration trimestrielle CAF",
    date: "15 mars",
    priority: "haute",
  },
  {
    label: "Renouvellement titre de séjour",
    date: "30 avril",
    priority: "critique",
  },
  {
    label: "Quitus de bail / état des lieux",
    date: "7 mai",
    priority: "standard",
  },
];

const documentVault = [
  "Identité (CNI, passeport)",
  "Contrats & baux",
  "Justificatifs de domicile",
  "Attestations employeur",
  "Relevés d'impôts & URSSAF",
];

export function AdminCopiloteLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(0,51,102,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.15),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(0,51,102,0.2),transparent_45%)] text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 sm:px-10 sm:py-16">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 text-xl font-semibold text-white shadow-lg shadow-blue-900/30">
              AC
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100/70">
                AdminCopilote FR
              </p>
              <h1 className="text-2xl font-semibold text-white">
                L'administration française en 5 minutes par jour
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/agents"
              className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Découvrir la démo agents
            </Link>
            <button className="rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5">
              Scanner / importer un document
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold text-blue-100/80">Copilote intelligent</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Analyse tes courriers, traduit en clair et génère un plan d'action immédiat.
            </h2>
            <p className="text-lg text-blue-50/80">
              Dossier CAF, CPAM, impôts, bail, inscription universitaire : l'IA détecte le sujet, calcule les deadlines et te guide avec des étapes courtes, modèles de réponse et rappels intelligents.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-4xl font-bold text-white">5 min</p>
                <p className="text-sm text-blue-50/70">par jour pour rester à jour</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-4xl font-bold text-white">IA</p>
                <p className="text-sm text-blue-50/70">Guidage contextualisé + modèles</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-4xl font-bold text-white">24/7</p>
                <p className="text-sm text-blue-50/70">Notifications et rappels discrets</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm font-semibold text-blue-100/70">Hub principal</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-wide text-blue-50/60">
                    Derniers documents
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Avis d'imposition, attestation employeur, quittance
                  </p>
                  <p className="mt-2 text-xs text-blue-50/60">Analysés il y a 2h</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-wide text-blue-50/60">
                    Deadlines
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">3 à venir</p>
                  <p className="mt-2 text-xs text-blue-50/60">CAF 15/03 · Préfecture 30/04</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-wide text-blue-50/60">
                    To-do
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">Checklist en cours</p>
                  <p className="mt-2 text-xs text-blue-50/60">3/5 étapes complétées</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-wide text-blue-50/60">
                    Conseils IA
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">Astuces sur mesure</p>
                  <p className="mt-2 text-xs text-blue-50/60">Modèles prêts à envoyer</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-700/60 p-5 shadow-lg shadow-blue-900/30">
              <p className="text-sm font-semibold text-blue-50">Scanner / importer</p>
              <p className="mt-2 text-lg text-blue-50/80">
                Ajoute une photo, un PDF ou transfère un mail. L'IA extrait automatiquement l'organisme, l'objet, les montants et la date limite.
              </p>
              <button className="mt-4 w-full rounded-2xl bg-white/90 px-4 py-3 text-center text-sm font-semibold text-blue-900 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5">
                Démarrer une analyse instantanée
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Inbox documentaire IA</h3>
              <span className="rounded-full bg-blue-900/60 px-3 py-1 text-xs font-semibold text-blue-50 ring-1 ring-blue-200/30">
                Vision + extraction
              </span>
            </div>
            <p className="mt-2 text-blue-50/80">
              Chaque courrier est décodé : type de document, organisme, action attendue, deadline et risques. Résumé clair + plan d'action prêt.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {inboxHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-blue-50/70">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-900/70 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">Exemple</p>
              <p className="mt-1 text-blue-50/70">
                "En résumé, ce courrier t'informe que ta déclaration trimestrielle doit être transmise avant le 15 mars. Tu dois télécharger ton attestation employeur et confirmer tes ressources. Risque : suspension de l'aide.".
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Plans d'action & checklists</h3>
              <span className="rounded-full bg-blue-900/60 px-3 py-1 text-xs font-semibold text-blue-50 ring-1 ring-blue-200/30">
                Guidage pas-à-pas
              </span>
            </div>
            <p className="mt-2 text-blue-50/80">
              Étapes ultra claires avec liens officiels, modèles automatiques et rappels. Marque comme fait, demande un rappel ou ouvre le site officiel.
            </p>
            <div className="mt-4 grid gap-3">
              {actionSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900/70 text-sm font-semibold text-blue-50 ring-1 ring-blue-200/30">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-white">{step.title}</p>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-blue-100">
                        {step.time}
                      </span>
                      <span className="rounded-full bg-blue-900/60 px-2 py-0.5 text-[11px] font-semibold text-blue-100 ring-1 ring-blue-200/30">
                        {step.link}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-blue-50/80">{step.detail}</p>
                  </div>
                  <button className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20">
                    ✔️ Fait
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">Bibliothèque de cartes administratives</h3>
              <p className="text-blue-50/80">
                Les démarches les plus populaires sont prêtes sous forme de cartes premium : définitions simples, conditions, documents requis, étapes clés, erreurs à éviter et liens officiels vérifiés.
              </p>
            </div>
            <button className="rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5">
              Explorer les cartes
            </button>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {thematicCards.map((card) => (
              <div
                key={card}
                className="flex flex-col gap-2 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10"
              >
                <p className="text-lg font-semibold text-white">{card}</p>
                <p className="text-sm text-blue-50/70">
                  Conditions, documents, étapes 1→2→3, délais moyens, astuces et liens officiels.
                </p>
                <div className="flex gap-2 text-xs font-semibold text-blue-100">
                  <span className="rounded-full bg-white/10 px-3 py-1">Checklist</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">Modèles</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">Contacts</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Explorateur d'aides & droits</h3>
              <span className="rounded-full bg-blue-900/60 px-3 py-1 text-xs font-semibold text-blue-50 ring-1 ring-blue-200/30">
                Questionnaire IA
              </span>
            </div>
            <p className="mt-2 text-blue-50/80">
              Questionnaire ultra simple. Score de probabilité pour chaque aide (APL, bourse, mobilité, santé, insertion, auto-entrepreneur). Checklists prêtes pour déposer les demandes.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {aiPillars.slice(0, 3).map((item) => (
                <div key={item} className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="mt-1 text-xs text-blue-50/70">Sur-mesure selon ton profil.</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-blue-900/60 p-5 ring-1 ring-blue-200/30">
              <p className="text-sm font-semibold text-white">Résultat exemple</p>
              <p className="mt-1 text-blue-50/80">
                APL (90%), Aide mobilité alternance (75%), Chèque énergie (65%). Plans d'action + modèles prêts à envoyer.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Calendrier & rappels IA</h4>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-blue-100">
                  Priorités
                </span>
              </div>
              <div className="mt-3 space-y-3">
                {reminders.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-3 py-3 ring-1 ring-white/10"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-blue-50/70">{item.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
                        item.priority === "critique"
                          ? "bg-red-400/20 text-red-100"
                          : item.priority === "haute"
                          ? "bg-orange-400/20 text-orange-100"
                          : "bg-blue-400/20 text-blue-100"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h4 className="text-lg font-semibold text-white">Espace documents sécurisé</h4>
              <p className="mt-2 text-blue-50/80">
                Coffre sécurisé, tags automatiques, rappel de renouvellement. Partage contrôlé, traçabilité et chiffrement.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {documentVault.map((doc) => (
                  <span
                    key={doc}
                    className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-blue-100"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">Composant IA (Gemini 3)</h3>
            <p className="mt-2 text-blue-50/80">
              Vision, extraction, résumé contextuel, plans d'action, modèles automatiques, suggestions personnalisées, chat IA spécialisé administratif, détection automatique du sujet d'après un PDF.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {aiPillars.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10"
                >
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="mt-1 text-xs text-blue-50/70">Assisté par rappels intelligents.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-blue-900/30 p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">Design & expérience</h3>
            <p className="mt-2 text-blue-50/80">
              Style inspiré de VisionOS et des codes institutionnels français : bleu profond, blanc crème, touches dorées discrètes, glassmorphism et micro-interactions.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-blue-50/80">
              <li>• Cartes arrondies radius 22px, ombres très douces.</li>
              <li>• Icônes minimalistes, boutons flottants avec halo léger.</li>
              <li>• Typo premium (SF Pro / Inter), ton calme, précis, rassurant.</li>
              <li>• Notifications intelligentes, pas de spam.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-900/70 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-blue-200/30">
                #003366
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-white/30">
                #FFFFFF
              </span>
              <span className="rounded-full bg-slate-200/60 px-3 py-1 text-xs font-semibold text-blue-900 ring-1 ring-white/20">
                #E9E9E9
              </span>
              <span className="rounded-full bg-amber-300/60 px-3 py-1 text-xs font-semibold text-blue-900 ring-1 ring-white/20">
                #D4AF37
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
          <h3 className="text-2xl font-semibold text-white">
            L'assistant administratif qui traduit, simplifie et guide toutes tes démarches officielles en France.
          </h3>
          <p className="mt-2 text-blue-50/80">
            Clair, structuré, rassurant, direct. Reste en règle sans stress.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5">
              Activer mon copilote administratif
            </button>
            <button className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/20">
              Consulter la bibliothèque de cartes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminCopiloteLanding;
