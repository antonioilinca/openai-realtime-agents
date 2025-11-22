import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AdminCopilote · Assistant administratif premium",
  description:
    "AdminCopilote centralise vos démarches, documents et échéances avec l'IA Gemini et un coffre-fort sécurisé Firebase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#f2f2f2] text-slate-900">
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
