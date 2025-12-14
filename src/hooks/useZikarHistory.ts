import { useState, useEffect } from "react";

export interface ZikarHistoryEntry {
  id: string;
  zikarName: string;
  zikarArabic: string;
  count: number;
  target: number;
  completedAt: string; // ISO date string
}

const STORAGE_KEY = "zikar-history";

export const useZikarHistory = () => {
  const [history, setHistory] = useState<ZikarHistoryEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading zikar history:", error);
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving zikar history:", error);
    }
  }, [history]);

  const addHistoryEntry = (entry: Omit<ZikarHistoryEntry, "id" | "completedAt">) => {
    const newEntry: ZikarHistoryEntry = {
      ...entry,
      id: `history-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
  };
};
