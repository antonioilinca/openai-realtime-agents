import type { ReactElement } from "react";

const highlights = [
  {
    title: "Studio créatif & production musicale",
    description:
      "Direction artistique complète, de l'idée à la sortie, avec un suivi expert sur chaque étape clé.",
  },
  {
    title: "Identité visuelle intelligente",
    description:
      "Branding, cover art, motion design et templates sociaux pensés pour amplifier votre univers.",
  },
  {
    title: "Stratégie IA & data",
    description:
      "Automatisation des campagnes, analyse des performances et optimisation en continu.",
  },
];

const services = [
  {
    title: "Création artistique",
    items: [
      "Direction artistique",
      "Composition & songwriting",
      "Sound design & scoring",
      "Enregistrement & coaching",
    ],
  },
  {
    title: "Production & mix",
    items: [
      "Production complète",
      "Mix & mastering",
      "Sessions live hybride",
      "Livrables multi-plateformes",
    ],
  },
  {
    title: "Image & contenu",
    items: [
      "Branding & identité",
      "Packs social media",
      "Motion & clip IA",
      "UI/UX pour artistes",
    ],
  },
  {
    title: "Growth & diffusion",
    items: [
      "Stratégie de sortie",
      "Campagnes ads",
      "Automation IA",
      "Reporting & KPIs",
    ],
  },
];

const steps = [
  {
    title: "Immersion",
    description:
      "On capture votre vision, vos inspirations et vos objectifs pour créer une feuille de route sur-mesure.",
  },
  {
    title: "Conception",
    description:
      "Moodboards, prototypes et concepts IA pour valider l'univers avant production.",
  },
  {
    title: "Production",
    description:
      "En studio ou à distance, on assemble musique, image et stratégie dans un flux agile.",
  },
  {
    title: "Lancement",
    description:
      "Distribution, activations digitales et optimisation continue pour maximiser l'impact.",
  },
];

const showcase = [
  {
    title: "Nebula Sessions",
    description: "EP immersive, storytelling visuel et campagne social media automatisée.",
  },
  {
    title: "Echo City",
    description: "Identité visuelle complète et stratégie de diffusion multi-plateformes.",
  },
  {
    title: "Pulse Agency",
    description: "Direction artistique et production sonore pour une marque lifestyle.",
  },
];

const testimonials = [
  {
    name: "Maya R.",
    role: "Artiste indépendante",
    quote:
      "Une équipe ultra créative, une méthode claire et des résultats visibles dès la première release.",
  },
  {
    name: "Studio Lumen",
    role: "Label",
    quote:
      "Leur approche IA nous a permis d'accélérer nos campagnes sans perdre l'ADN artistique.",
  },
  {
    name: "Kyan",
    role: "Producteur",
    quote:
      "Tout est aligné : direction, son, image, stratégie. C'est rare d'avoir cette cohérence.",
  },
];

const faqs = [
  {
    question: "Travaillez-vous avec des artistes émergents ?",
    answer:
      "Oui. Nous adaptons nos offres selon votre stade de développement, avec un focus sur l'impact rapide.",
  },
  {
    question: "Proposez-vous des services à la carte ?",
    answer:
      "Absolument. Vous pouvez choisir un module précis (mix, branding, stratégie) ou un package complet.",
  },
  {
    question: "Quel est le délai moyen d'un projet ?",
    answer:
      "Entre 2 et 8 semaines selon la taille du projet. Un planning détaillé est fourni dès le kick-off.",
  },
];

const stats = [
  { label: "Projets lancés", value: "120+" },
  { label: "Campagnes IA", value: "340k" },
  { label: "Partenaires créatifs", value: "45" },
  { label: "Satisfaction", value: "98%" },
];

const navItems = ["Studio", "Services", "Process", "Projets", "Contact"];

function GradientOrb({ className }: { className?: string }): ReactElement {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-60 ${className ?? ""}`}
      aria-hidden
    />
  );
}

export default function Page(): ReactElement {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <GradientOrb className="left-[-10%] top-[-20%] h-[380px] w-[380px] bg-gradient-to-br from-fuchsia-500/70 via-purple-500/60 to-sky-500/60" />
          <GradientOrb className="right-[-10%] top-[20%] h-[320px] w-[320px] bg-gradient-to-br from-emerald-400/60 via-cyan-400/50 to-blue-500/60" />
        </div>
        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="text-lg font-semibold tracking-[0.3em] text-white">
            DYSTRICT
          </div>
          <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-white/20 transition hover:-translate-y-0.5"
          >
            Planifier un call
          </a>
        </nav>
        <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              Studio créatif & AI record lab
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Faites rayonner votre musique avec un design IA ultra moderne.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Dystrict Record fusionne direction artistique, production sonore et marketing
              intelligent pour créer des expériences immersives et faire grandir votre audience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-fuchsia-500/30"
              >
                Démarrer un projet
              </a>
              <a
                href="#projets"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
              >
                Voir nos créations
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Aujourd'hui dans le studio
              </p>
              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/0 p-8 text-xs uppercase tracking-[0.4em] text-white/50">
              AI + Music + Design
            </div>
          </div>
        </section>
      </header>

      <main className="space-y-24 bg-slate-950 pb-24">
        <section id="studio" className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[0.6fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Notre studio
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Un laboratoire créatif où la technologie amplifie l'émotion.
              </h2>
            </div>
            <p className="text-lg text-white/70">
              Nous combinons expertise artistique, outils IA et design d'expérience pour construire des
              univers musicaux cohérents. Chaque projet bénéficie d'une équipe dédiée et d'un pilotage
              data-driven pour optimiser la performance.
            </p>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                  Services
                </p>
                <h2 className="mt-4 text-3xl font-semibold">
                  Tout ce dont vous avez besoin pour lancer une expérience musicale premium.
                </h2>
              </div>
              <a
                href="#contact"
                className="hidden rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/70 transition hover:border-white/60 hover:text-white md:inline-flex"
              >
                Télécharger notre deck
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[0.5fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Process
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Une méthode claire, agile et orientée résultat.
              </h2>
              <p className="mt-6 text-sm text-white/60">
                Chaque étape est co-construite avec vous pour garantir cohérence, qualité et rapidité.
              </p>
            </div>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="text-3xl font-semibold text-white/40">0{index + 1}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projets" className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Projets
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Des univers sur-mesure, pensés pour la scène et le digital.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {showcase.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6"
                >
                  <div className="h-40 rounded-2xl bg-gradient-to-br from-fuchsia-500/40 via-purple-500/30 to-sky-500/40" />
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
              >
                <p className="text-sm text-white/70">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-800 p-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Offres
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Packs flexibles pour accélérer vos sorties.
              </h2>
              <p className="mt-4 text-sm text-white/70">
                Choisissez un pack ou construisez une solution hybride avec notre équipe.
              </p>
            </div>
            <div className="space-y-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-base font-semibold text-white">Starter</h3>
                <p className="mt-2">Direction artistique + stratégie de sortie rapide.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-base font-semibold text-white">Signature</h3>
                <p className="mt-2">Production complète + branding + automation IA.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-base font-semibold text-white">Custom Lab</h3>
                <p className="mt-2">Studio sur-mesure pour labels, agences et marques.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold">Questions fréquentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-base font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-slate-900 to-slate-900/80 p-8 md:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Parlez-nous de votre projet, nous créons la suite.
              </h2>
              <p className="mt-4 text-sm text-white/70">
                Un membre de l'équipe Dystrict vous répond sous 24h avec une proposition claire.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <p>hello@dystrict-record.fr</p>
                <p>Paris · Remote</p>
                <p>+33 1 84 88 42 00</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Nom complet
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  placeholder="vous@email.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Projet
                </label>
                <textarea
                  className="mt-2 h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  placeholder="Dites-nous où vous en êtes"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Envoyer la demande
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-white">Dystrict Record</p>
            <p className="mt-2">Studio créatif & AI record lab.</p>
          </div>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#projets" className="hover:text-white">
              Projets
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
