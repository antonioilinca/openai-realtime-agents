"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  getFirebaseServices,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  firebaseEnabled,
} from "@/lib/firebase";
import toast from "react-hot-toast";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (payload: { email: string; password: string; prenom: string; nom: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUser = {
  uid: "demo-user",
  email: "demo@admincopilote.fr",
  displayName: "Alexis Demo",
} as User;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseEnabled) {
      setUser(demoUser);
      setLoading(false);
      return;
    }
    const { auth } = getFirebaseServices();
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = async ({ email, password, prenom, nom }: { email: string; password: string; prenom: string; nom: string }) => {
    if (!firebaseEnabled) {
      setUser({ ...demoUser, email, displayName: `${prenom} ${nom}` } as User);
      toast.success("Mode démo actif : profil créé localement");
      return;
    }
    const { auth, db } = getFirebaseServices();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "Users"), {
      uid: cred.user.uid,
      prenom,
      nom,
      email,
      createdAt: new Date().toISOString(),
    });
    setUser(cred.user);
  };

  const login = async (email: string, password: string) => {
    if (!firebaseEnabled) {
      setUser({ ...demoUser, email });
      toast.success("Connecté en mode démo");
      return;
    }
    const { auth } = getFirebaseServices();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!firebaseEnabled) {
      setUser(demoUser);
      toast.success("Connecté avec Google (démo)");
      return;
    }
    const { auth } = getFirebaseServices();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (!firebaseEnabled) {
      setUser(null);
      return;
    }
    const { auth } = getFirebaseServices();
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (!firebaseEnabled) {
      toast.success("Lien de réinitialisation simulé envoyé");
      return;
    }
    const { auth } = getFirebaseServices();
    await sendPasswordResetEmail(auth, email);
    toast.success("Email de réinitialisation envoyé");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
