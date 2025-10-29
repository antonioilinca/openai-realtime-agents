"use client";

import { useCallback, useEffect, useRef } from "react";

export function useAutoSave<T>(key: string, state: T, delay = 1500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstRenderRef = useRef(true);

  const persist = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = JSON.stringify(state);
      localStorage.setItem(key, payload);
    } catch (error) {
      console.warn("Impossible de sauvegarder localement", error);
    }
  }, [key, state]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      persist();
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(persist, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, persist]);
}

export function restoreAutoSavedState<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.warn("Impossible de restaurer l’état", error);
    return null;
  }
}
