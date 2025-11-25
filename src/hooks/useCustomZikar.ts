import { useState, useEffect } from "react";
import type { Zikar } from "@/components/ZikarSelector";

const STORAGE_KEY = "custom-zikars";

export const useCustomZikar = () => {
  const [customZikars, setCustomZikars] = useState<Zikar[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomZikars(parsed);
      }
    } catch (error) {
      console.error("Error loading custom zikars:", error);
    }
  }, []);

  // Save to localStorage whenever customZikars changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customZikars));
    } catch (error) {
      console.error("Error saving custom zikars:", error);
    }
  }, [customZikars]);

  const addCustomZikar = (zikar: Zikar) => {
    setCustomZikars((prev) => [...prev, zikar]);
  };

  const removeCustomZikar = (id: string) => {
    setCustomZikars((prev) => prev.filter((z) => z.id !== id));
  };

  const updateCustomZikar = (id: string, updates: Partial<Zikar>) => {
    setCustomZikars((prev) =>
      prev.map((z) => (z.id === id ? { ...z, ...updates } : z))
    );
  };

  return {
    customZikars,
    addCustomZikar,
    removeCustomZikar,
    updateCustomZikar,
  };
};
