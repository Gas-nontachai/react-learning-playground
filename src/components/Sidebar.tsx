'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useMemo, useState} from 'react';
import clsx from 'clsx';
import {useTranslations} from 'next-intl';
import type {Locale} from '@/lib/i18n';
import {orderedLessons} from '@/lib/lessons-config';
import {useProgress} from '@/lib/progress';

export function Sidebar({locale}: {locale: Locale}) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const {completed, resetProgress} = useProgress();
  const tSidebar = useTranslations('sidebar');

  const activeSlug = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    return segments[1] === 'lesson' ? segments[2] : null;
  }, [pathname]);

  const filteredLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return orderedLessons.filter((lesson) => {
      if (!normalizedQuery) return true;
      return (
        lesson.slug.includes(normalizedQuery) ||
        lesson.title[locale].toLowerCase().includes(normalizedQuery)
      );
    });
  }, [locale, query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof filteredLessons>();
    filteredLessons.forEach((lesson) => {
      const existing = groups.get(lesson.section) ?? [];
      groups.set(lesson.section, [...existing, lesson]);
    });
    return Array.from(groups.entries());
  }, [filteredLessons]);

  return (
    <aside className="flex h-full flex-col gap-4 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:w-72 lg:border-b-0 lg:border-r">
      <div>
        <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {tSidebar('search')}
        </label>
        <input
          className="mt-2 w-full rounded border border-slate-300 bg-transparent p-2 text-sm dark:border-slate-700"
          placeholder={tSidebar('search')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        {grouped.map(([section, lessons]) => (
          <section key={section} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {section}
            </p>
            <ul className="space-y-1">
              {lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/${locale}/lesson/${lesson.slug}`}
                    className={clsx(
                      'flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors',
                      activeSlug === lesson.slug
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                    )}
                  >
                    <span className="truncate">{lesson.title[locale]}</span>
                    {completed.includes(lesson.slug) && <span className="text-xs">✅</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <button
        onClick={resetProgress}
        className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {tSidebar('completed')} · {completed.length}
      </button>
    </aside>
  );
}
