import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import ResultCard from "@/components/ResultCard";
import { AnalysisResponse } from "@/types/analysis";
import { Download, Loader2 } from "lucide-react";

// Page de visualisation de résultat d'analyse.
export default function ResultPage() {
  const router = useRouter();
  const { id } = router.query;
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/history/${id}`);
        setAnalysis(data);
      } catch (err) {
        setError("Analyse introuvable ou indisponible.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  const handleDownload = async () => {
    if (!id) return;
    try {
      const { data } = await api.get(`/pdf/${id}`, { responseType: "blob" });
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `lexaia-rapport-${id}.pdf`;
      link.click();
    } catch (err) {
      setError("Le téléchargement du PDF a échoué. Veuillez réessayer.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-slate-500">Chargement de votre analyse...</p>
      </div>
    );
  }

  if (error) {
    return <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>;
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analyse juridique</h1>
          <p className="text-xs text-slate-500">Domaine identifié : {analysis.domain.toUpperCase()}</p>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary shadow transition hover:bg-accent/90"
        >
          <Download size={16} /> Télécharger le rapport PDF
        </button>
      </div>
      <ResultCard title="Résumé du problème" defaultOpen>
        <p>{analysis.summary}</p>
      </ResultCard>
      <ResultCard title="Articles applicables">
        <ul className="space-y-2">
          {analysis.articles.map((article) => (
            <li key={article.article} className="rounded-lg border border-primary/10 p-4">
              <p className="text-sm font-semibold text-primary">
                {article.code} – {article.article}
              </p>
              <p className="text-sm text-slate-600">{article.titre}</p>
              {article.resume && <p className="text-xs text-slate-500">{article.resume}</p>}
              <a
                href={article.lien}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-primary underline"
              >
                Consulter sur Légifrance
              </a>
            </li>
          ))}
        </ul>
      </ResultCard>
      <ResultCard title="Recours possibles" description="Trois pistes d'action concrètes.">
        <ol className="list-decimal space-y-2 pl-6 text-sm">
          {analysis.actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ol>
      </ResultCard>
      <ResultCard title="Probabilité de succès">
        <p className="text-5xl font-bold text-primary">{Math.round(analysis.success_score)}%</p>
        <p className="text-xs text-slate-500">
          Estimation basée sur les décisions judiciaires récentes et les points forts/faibles identifiés.
        </p>
      </ResultCard>
      <ResultCard title="Sources officielles">
        <ul className="list-disc space-y-1 pl-6 text-sm">
          {analysis.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </ResultCard>
    </div>
  );
}
