import { useEffect, useState } from "react";
import api from "@/utils/api";
import { AnalysisResponse } from "@/types/analysis";
import Link from "next/link";
import { Calendar, Filter } from "lucide-react";

// Tableau de bord historique des analyses utilisateur.
export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisResponse[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/history", { params: { domain: filter || undefined } });
        setHistory(data);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Historique des analyses</h1>
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-4 py-2 text-sm shadow-sm">
          <Filter size={16} className="text-primary" />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="bg-transparent text-sm focus:outline-none"
          >
            <option value="">Tous les domaines</option>
            {"civil pénal travail immobilier administratif commercial fiscal".split(" ").map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <p className="text-sm text-slate-500">Chargement de l'historique...</p>
      ) : (
        <div className="grid gap-4">
          {history.map((entry) => (
            <Link
              key={entry.id}
              href={{ pathname: "/result", query: { id: entry.id } }}
              className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition hover:border-primary hover:shadow-lg dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-primary">{entry.summary.slice(0, 120)}...</p>
                  <p className="text-xs text-slate-500">{entry.domain.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={16} /> {new Date(entry.created_at).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </Link>
          ))}
          {history.length === 0 && <p className="text-sm text-slate-500">Aucune analyse enregistrée pour le moment.</p>}
        </div>
      )}
    </div>
  );
}
