import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAnalysisForm, ProblemCategory } from "@/store/useAnalysisForm";
import api from "@/utils/api";
import { Loader2, ShieldCheck, FileText, Sparkles } from "lucide-react";

interface AnalyzePayload {
  text: string;
  subject: string;
  category: ProblemCategory;
  context: string;
  details: string;
}

// Page d'accueil : présentation du service et formulaire multi-étapes.
export default function HomePage() {
  const router = useRouter();
  const { step, subject, context, problemType, details, setSubject, setContext, setProblemType, setDetails, nextStep, previousStep, reset } =
    useAnalysisForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => (step / 4) * 100, [step]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!subject || !details) {
      setError("Veuillez renseigner au minimum l'objet et les détails de votre situation.");
      return;
    }

    const payload: AnalyzePayload = {
      text: `${subject}\n${context}\n${details}`.trim(),
      subject,
      category: problemType,
      context,
      details
    };

    setLoading(true);
    try {
      const { data } = await api.post("/analyze", payload);
      reset();
      await router.push({ pathname: "/result", query: { id: data.id } });
    } catch (err) {
      setError("Impossible de traiter l'analyse pour le moment. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Sujet principal</span>
              <input
                className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                placeholder="Ex: Litige avec mon propriétaire"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </label>
            <p className="text-xs text-slate-500">
              Décrivez en une phrase le thème principal pour aider l'IA à cibler le domaine juridique.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Contexte</span>
              <textarea
                className="min-h-[150px] rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                placeholder="Précisez les parties concernées, les dates, les montants, etc."
                value={context}
                onChange={(event) => setContext(event.target.value)}
              />
            </label>
            <p className="text-xs text-slate-500">Le contexte permet d'identifier les entités et délais importants.</p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium">Quel est le type de problème ?</span>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {["civil", "pénal", "travail", "immobilier", "administratif", "commercial", "fiscal", "autre"].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setProblemType(category as ProblemCategory)}
                  className={`rounded-xl border px-3 py-3 text-sm capitalize transition ${
                    problemType === category
                      ? "border-primary bg-primary text-white"
                      : "border-primary/20 bg-white text-primary hover:border-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Détails précis</span>
              <textarea
                className="min-h-[200px] rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                placeholder="Expliquez tous les faits, pièces, échanges, délais, sommes dues, etc."
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              />
            </label>
            <p className="text-xs text-slate-500">
              Plus vous fournissez de détails concrets, plus la réponse sera pertinente. Évitez toutefois les données sensibles inutiles.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-xl dark:bg-slate-900">
          <h1 className="text-3xl font-bold text-primary">Assistant juridique LexaIA</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Décrivez votre situation, recevez une analyse claire citant les textes applicables, des actions concrètes et une estimation de vos chances.
          </p>
          <div className="mt-6 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
            {renderStep()}
            {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={step === 1 || loading}
                  onClick={previousStep}
                  className="rounded-xl border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Étape précédente
                </button>
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                  >
                    Étape suivante
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Lancer l'analyse
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="text-xs text-slate-500">
                Vos données sont chiffrées en transit et stockées en Europe conformément au RGPD.
              </div>
            </div>
          </form>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-md dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-primary">Sécurité & conformité</h2>
              <p className="text-xs text-slate-500">Authentification chiffrée, audit des accès et hébergement en France.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-md dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <FileText className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-primary">Rapports PDF</h2>
              <p className="text-xs text-slate-500">Téléchargez un dossier complet prêt à être transmis à un avocat ou une administration.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-md dark:bg-slate-900">
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>
              LexaIA interroge en temps réel la base Légifrance pour identifier les textes officiels correspondant à votre situation.
            </p>
            <p>
              Chaque réponse est rédigée en français clair par GPT-5, avec une estimation des chances de succès selon la jurisprudence disponible.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
