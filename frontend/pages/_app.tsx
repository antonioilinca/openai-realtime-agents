import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

// Fournit le thème clair/sombre et la barre de navigation à toute l'application.
export default function LexaIAApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-background text-text transition-colors">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
