"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingChat from "../features/FloatingChat";
import ScrollToTop from "../features/ScrollToTop";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />
      <Header />
      <main className="pt-28 pb-10 pl-[300px] pr-6">
        <div className="grid gap-6">{children}</div>
      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  );
}
