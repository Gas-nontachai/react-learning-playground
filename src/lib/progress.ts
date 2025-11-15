'use client';

import {useCallback, useEffect, useState} from 'react';

export const PROGRESS_STORAGE_KEY = 'progress';

export function readProgressFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(readProgressFromStorage());
  }, []);

  const update = useCallback((next: string[] | ((prev: string[]) => string[])) => {
    setCompleted((prev) => {
      const value = typeof next === 'function' ? (next as (prev: string[]) => string[])(prev) : next;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(value));
      }
      return value;
    });
  }, []);

  const markCompleted = useCallback(
    (slug: string) => {
      update((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    },
    [update]
  );

  const toggleCompleted = useCallback(
    (slug: string) => {
      update((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
    },
    [update]
  );

  const resetProgress = useCallback(() => update([]), [update]);

  return {
    completed,
    isCompleted: (slug: string) => completed.includes(slug),
    markCompleted,
    toggleCompleted,
    resetProgress
  };
}
