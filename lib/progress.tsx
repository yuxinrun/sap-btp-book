'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { learningStages } from '@/data/learning-path';

export interface RecentItem {
  id: string;
  title: string;
  href: string;
  at: number;
}

interface ProgressState {
  completed: string[];
  favorites: string[];
  recent: RecentItem[];
}

interface ProgressContextValue extends ProgressState {
  ready: boolean;
  isCompleted: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  markRead: (item: Omit<RecentItem, 'at'>) => void;
  stageProgress: (stageId: number) => { done: number; total: number; percent: number };
  totalCompleted: number;
}

const STORAGE_KEY = 'sap-btp-cn:learning-progress:v1';
const EMPTY: ProgressState = { completed: [], favorites: [], recent: [] };
const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
        setState({
          completed: Array.isArray(parsed.completed) ? parsed.completed : [],
          favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
          recent: Array.isArray(parsed.recent) ? parsed.recent.slice(0, 20) : [],
        });
      }
    } catch {
      // 存储损坏时保持空状态，不影响阅读
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // 隐私模式下 localStorage 可能不可写，忽略
    }
  }, [state, ready]);

  const toggleCompleted = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      completed: prev.completed.includes(id) ? prev.completed.filter((x) => x !== id) : [...prev.completed, id],
    }));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(id) ? prev.favorites.filter((x) => x !== id) : [...prev.favorites, id],
    }));
  }, []);

  const markRead = useCallback((item: Omit<RecentItem, 'at'>) => {
    setState((prev) => ({
      ...prev,
      recent: [{ ...item, at: Date.now() }, ...prev.recent.filter((r) => r.id !== item.id)].slice(0, 20),
    }));
  }, []);

  const value = useMemo<ProgressContextValue>(() => ({
    ...state,
    ready,
    isCompleted: (id) => state.completed.includes(id),
    isFavorite: (id) => state.favorites.includes(id),
    toggleCompleted,
    toggleFavorite,
    markRead,
    stageProgress: (stageId) => {
      const stage = learningStages.find((s) => s.id === stageId);
      if (!stage) return { done: 0, total: 0, percent: 0 };
      const done = stage.tutorialIds.filter((id) => state.completed.includes(id)).length;
      const total = stage.tutorialIds.length;
      return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
    },
    totalCompleted: state.completed.length,
  }), [state, ready, toggleCompleted, toggleFavorite, markRead]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress 必须在 ProgressProvider 中使用');
  return ctx;
}
