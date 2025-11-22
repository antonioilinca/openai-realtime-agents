"use client";

import { useState } from "react";
import { FolderLock, Download, Share2, Trash2, Upload } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { firebaseEnabled, getDownloadURL, getFirebaseServices, ref, uploadBytes } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface VaultFile {
  id: string;
  name: string;
  category: string;
  expiration?: string;
  url?: string;
}

const sampleFiles: VaultFile[] = [
  { id: "1", name: "Attestation CAF.pdf", category: "Logement", expiration: "2025-01-01" },
  { id: "2", name: "Contrat travail.pdf", category: "Emploi", expiration: "2026-05-10" },
];

export default function VaultPage() {
  const { user } = useAuth();
  const [files, setFiles] = useState<VaultFile[]>(sampleFiles);
  const [filter, setFilter] = useState<string>("Toutes");
  const [uploading, setUploading] = useState(false);

  const filtered = files.filter((f) => (filter === "Toutes" ? true : f.category === filter));

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      let url: string | undefined;
      if (firebaseEnabled && user) {
        const { storage } = getFirebaseServices();
        const storageRef = ref(storage, `vault/${user.uid}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        url = await getDownloadURL(storageRef);
      }
      const newFile: VaultFile = {
        id: `${Date.now()}`,
        name: file.name,
        category: "Autre",
        expiration: "",
        url,
      };
      setFiles((prev) => [newFile, ...prev]);
      toast.success("Document ajouté au coffre-fort");
    } catch {
      toast.error("Impossible d’ajouter le document");
    } finally {
      setUploading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="grid gap-6">
      <GlassCard className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <FolderLock className="h-6 w-6 text-[#d4af37]" />
          <div>
            <p className="text-xs uppercase text-slate-500">Coffre-fort chiffré</p>
            <h3 className="text-xl font-semibold text-[#003366]">Conservez, partagez, suivez les expirations</h3>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-3xl bg-[#003366] px-4 py-3 text-sm font-semibold text-white cursor-pointer shadow-lg">
            <Upload className="h-4 w-4" /> Importer un document
            <input type="file" className="hidden" onChange={handleInput} />
          </label>
          <p className="text-sm text-slate-600">Formats PDF ou image, stockage sécurisé Firebase Storage.</p>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase text-slate-500">Documents</p>
            <h3 className="text-lg font-semibold text-[#003366]">Vos fichiers classés</h3>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl bg-white/80 p-2 text-sm shadow-inner"
          >
            {['Toutes', 'Logement', 'Emploi', 'Impôts', 'Santé', 'Autre'].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="pb-2">Nom</th>
                <th className="pb-2">Catégorie</th>
                <th className="pb-2">Expiration</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60">
              {filtered.map((file) => (
                <tr key={file.id} className="hover:bg-white/60">
                  <td className="py-3 font-semibold text-[#003366]">{file.name}</td>
                  <td className="py-3">{file.category}</td>
                  <td className="py-3">{file.expiration || "N/A"}</td>
                  <td className="py-3 flex items-center gap-2">
                    <a
                      href={file.url || "#"}
                      className="rounded-full bg-white/80 p-2 text-[#003366] shadow"
                      download
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    <button className="rounded-full bg-white/80 p-2 text-[#003366] shadow">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-red-50 p-2 text-red-700 shadow">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    Aucun document pour ce filtre. Importez votre premier fichier.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {uploading && <p className="mt-3 text-sm text-slate-500">Téléversement en cours...</p>}
      </GlassCard>
    </div>
  );
}
