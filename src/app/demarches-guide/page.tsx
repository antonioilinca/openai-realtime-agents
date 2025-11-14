'use client';

import { useEffect, useMemo, useState } from 'react';
import { Inter } from 'next/font/google';

import './styles.css';
import { Procedure, procedures } from './data';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

type ProcedureList = Procedure[];

const highlightTerms = (text: string, terms: string[]): string => {
  if (!terms.length) {
    return text;
  }
  const escaped = terms
    .filter(Boolean)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!escaped.length) {
    return text;
  }
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export default function DemarchesGuidePage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(procedures[0]?.id ?? null);

  const normalizedTerms = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [query],
  );

  const filtered: ProcedureList = useMemo(() => {
    if (!normalizedTerms.length) {
      return procedures;
    }

    return procedures.filter((procedure) => {
      const haystack = `${procedure.title} ${procedure.category} ${procedure.shortDescription}`.toLowerCase();
      return normalizedTerms.every((term) => haystack.includes(term));
    });
  }, [normalizedTerms]);

  useEffect(() => {
    if (!filtered.length) {
      if (selectedId !== null) {
        setSelectedId(null);
      }
      return;
    }

    if (!selectedId || !filtered.some((procedure) => procedure.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selectedProcedure = useMemo(() => {
    if (!selectedId) {
      return null;
    }
    return procedures.find((procedure) => procedure.id === selectedId) ?? null;
  }, [selectedId]);

  return (
    <div className={`demarches-guide ${inter.className}`}>
      <div className="app-shell">
        <header className="page-header">
          <div className="header-text">
            <h1>Guide IA des Démarches Françaises</h1>
            <p className="subtitle">
              Choisissez une démarche administrative et laissez l’IA vous guider étape par étape.
            </p>
            <p className="reassurance">Infos structurées, liens officiels, contacts utiles. Pas de jargon inutile.</p>
          </div>
          <div className="search-wrapper">
            <label className="visually-hidden" htmlFor="demarches-search">
              Rechercher une démarche
            </label>
            <input
              id="demarches-search"
              className="search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une démarche (ex : naturalisation, CAF, titre de séjour…)"
              autoComplete="off"
            />
          </div>
        </header>

        <main className="layout">
          <section className="cards" aria-live="polite">
            {filtered.length === 0 ? (
              <div className="empty-state">
                Aucune démarche ne correspond à votre recherche pour le moment. Ajustez vos mots-clés ou explorez les catégories
                proposées.
              </div>
            ) : (
              filtered.map((procedure) => {
                const isActive = procedure.id === selectedId;
                const highlightedTitle = highlightTerms(procedure.title, normalizedTerms);
                const highlightedCategory = highlightTerms(procedure.category, normalizedTerms);

                return (
                  <button
                    key={procedure.id}
                    type="button"
                    className={`card${isActive ? ' card--active' : ''}`}
                    onClick={() => setSelectedId(procedure.id)}
                    aria-pressed={isActive}
                  >
                    <div className="card-header">
                      <span className="badge" dangerouslySetInnerHTML={{ __html: highlightedCategory }} />
                      <span className="authority">{procedure.mainAuthority}</span>
                    </div>
                    <h2 dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
                    <p>{procedure.shortDescription}</p>
                    <div className="card-meta">
                      <span>{procedure.difficulty}</span>
                      <span>{procedure.estimatedDuration}</span>
                    </div>
                    <div className="card-button">
                      <span>Voir le parcours</span>
                    </div>
                  </button>
                );
              })
            )}
          </section>

          <aside className="detail" aria-live="polite">
            {selectedProcedure ? (
              <article className="detail-content">
                <div className="detail-header">
                  <h2>{selectedProcedure.title}</h2>
                  <p>{selectedProcedure.subtitle}</p>
                  <div className="detail-tags">
                    <span className="badge">{selectedProcedure.category}</span>
                    <span>Difficulté : {selectedProcedure.difficulty}</span>
                    <span>Durée estimée : {selectedProcedure.estimatedDuration}</span>
                    <span>Autorité principale : {selectedProcedure.mainAuthority}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>En bref</h3>
                  <p>{selectedProcedure.summary}</p>
                </div>

                <div className="detail-section">
                  <h3>Qui est concerné ?</h3>
                  <ul>
                    {selectedProcedure.whoIsConcerned.map((item, index) => (
                      <li key={`${selectedProcedure.id}-who-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Pré-requis avant de commencer</h3>
                  <ul>
                    {selectedProcedure.prerequisites.map((item, index) => (
                      <li key={`${selectedProcedure.id}-prereq-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Étapes détaillées</h3>
                  <div className="steps">
                    {selectedProcedure.steps.map((step, index) => (
                      <div className="step" key={`${selectedProcedure.id}-step-${index}`}>
                        <h4>
                          Étape {index + 1} – {step.stepTitle}
                        </h4>
                        <p>{step.stepDescription}</p>
                        <div className="step-meta">
                          <span>Où : {step.whereToGo}</span>
                          <span>Délai estimé : {step.estimatedDelay}</span>
                        </div>
                        {step.requiredDocuments.length > 0 && (
                          <div>
                            <strong>Documents utiles :</strong>
                            <ul>
                              {step.requiredDocuments.map((doc, docIndex) => (
                                <li key={`${selectedProcedure.id}-step-${index}-doc-${docIndex}`}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {step.tips && (
                          <p>
                            <strong>Astuce :</strong> {step.tips}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Contacts utiles</h3>
                  <p>
                    <strong>Site officiel :</strong>{' '}
                    <a href={selectedProcedure.contacts.officialWebsite} target="_blank" rel="noopener noreferrer">
                      {selectedProcedure.contacts.officialWebsite}
                    </a>
                  </p>
                  <div>
                    <strong>Téléphone :</strong>
                    <ul>
                      {selectedProcedure.contacts.phoneNumbers.map((phone, index) => (
                        <li key={`${selectedProcedure.id}-phone-${index}`}>{phone}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Emails / formulaires :</strong>
                    <ul>
                      {selectedProcedure.contacts.emailsOrForms.map((item, index) => (
                        <li key={`${selectedProcedure.id}-contact-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {selectedProcedure.contacts.notes && <p className="note">{selectedProcedure.contacts.notes}</p>}
                </div>

                <div className="detail-section">
                  <h3>Erreurs fréquentes à éviter</h3>
                  <ul>
                    {selectedProcedure.commonMistakes.map((item, index) => (
                      <li key={`${selectedProcedure.id}-mistake-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Conseils pratiques</h3>
                  <ul>
                    {selectedProcedure.tips.map((item, index) => (
                      <li key={`${selectedProcedure.id}-tip-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                {selectedProcedure.templates.length > 0 && (
                  <div className="detail-section templates">
                    <h3>Modèles prêts à l’emploi</h3>
                    {selectedProcedure.templates.map((template, index) => (
                      <article key={`${selectedProcedure.id}-template-${index}`}>
                        <h4>{template.title}</h4>
                        <pre>{template.content}</pre>
                      </article>
                    ))}
                  </div>
                )}
              </article>
            ) : (
              <div className="detail-empty">
                <h2>Bienvenue 👋</h2>
                <p>
                  Sélectionnez une démarche pour afficher un guide complet avec étapes, documents, conseils et contacts utiles.
                </p>
              </div>
            )}
          </aside>
        </main>

        <footer className="page-footer">
          Les informations sont fournies à titre indicatif : vérifiez toujours les dernières mises à jour sur les sites officiels
          (service-public.fr, préfecture, CAF, etc.).
        </footer>
      </div>
    </div>
  );
}
