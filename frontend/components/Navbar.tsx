import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// Barre de navigation principale avec thème clair/sombre et rappel légal.
export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b border-primary/20 bg-white/80 backdrop-blur dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          LexaIA
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/history" className="hover:text-primary">
            Historique
          </Link>
          <Link href="/" className="hover:text-primary">
            Nouvelle analyse
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold text-primary shadow-sm transition hover:bg-primary hover:text-white"
          >
            {mounted && resolvedTheme === "dark" ? (
              <>
                <Sun size={16} /> Thème clair
              </>
            ) : (
              <>
                <Moon size={16} /> Thème sombre
              </>
            )}
          </button>
        </nav>
      </div>
      <div className="bg-accent/20 py-2 text-center text-xs font-medium text-primary">
        Cet outil ne remplace pas un avocat. Consultez un professionnel pour un avis juridique personnalisé.
      </div>
    </header>
  );
}
