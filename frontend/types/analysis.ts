// Types partagés entre le frontend et le backend pour représenter une analyse juridique.
export interface LegalArticle {
  code: string;
  article: string;
  titre: string;
  lien: string;
  resume?: string;
}

export interface AnalysisResponse {
  id: number;
  domain: string;
  keywords: string[];
  articles: LegalArticle[];
  summary: string;
  actions: string[];
  success_score: number;
  created_at: string;
  sources: string[];
}
