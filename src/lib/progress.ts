'use client';

import {useCallback, useSyncExternalStore} from 'react';

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

type ProgressUpdater = string[] | ((prev: string[]) => string[]);

const listeners = new Set<() => void>();
let progressState: string[] = [];
let initialized = false;

function initializeProgress() {
  if (initialized) return;
  initialized = true;

  if (typeof window === 'undefined') return;

  progressState = readProgressFromStorage();

  window.addEventListener('storage', (event) => {
    if (event.key !== PROGRESS_STORAGE_KEY) return;
    progressState = event.newValue ? readProgressFromStorage() : [];
    emit();
  });
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  initializeProgress();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  initializeProgress();
  return progressState;
}

function setProgress(next: ProgressUpdater) {
  initializeProgress();
  const value = typeof next === 'function' ? (next as (prev: string[]) => string[])(progressState) : next;
  progressState = value;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(value));
  }
  emit();
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, () => []);

  const markCompleted = useCallback((slug: string) => {
    setProgress((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    setProgress((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
  }, []);

  const resetProgress = useCallback(() => setProgress([]), []);

  return {
    completed,
    isCompleted: (slug: string) => completed.includes(slug),
    markCompleted,
    toggleCompleted,
    resetProgress
  };
}
