import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexora — Assistant d'information juridique",
  description:
    "Lexora transforme une situation décrite en plan d'actions procédural avec citations juridiques sourcées.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-background text-slate-100">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-surface/60 bg-surface/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-primary">LEXORA</h1>
                <p className="text-sm text-muted">
                  Information juridique générale. Pour un conseil personnalisé ou une représentation, contactez un avocat.
                </p>
              </div>
              <a
                href="https://www.cnb.avocat.fr/annuaire-avocats"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-lexora transition hover:bg-primary/80"
              >
                Parler à un avocat
              </a>
            </div>
          </header>
          <main className="flex-1 bg-background">{children}</main>
          <footer className="border-t border-surface/60 bg-surface/80">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>&copy; {new Date().getFullYear()} Lexora.</span>
              <div className="flex gap-4">
                <a href="#">Politique de confidentialité</a>
                <a href="#">Conditions d'utilisation</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
