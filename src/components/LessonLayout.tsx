'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import { Playground } from './Playground';
import type { Lesson } from '@/lib/lessons-config';
import type { Locale } from '@/lib/i18n';
import { ProgressAction } from './ProgressAction';

interface LessonLayoutProps {
  locale: Locale;
  lesson: Lesson;
  children: ReactNode;
  previous: Lesson | null;
  next: Lesson | null;
}

export function LessonLayout({ locale, lesson, children, previous, next }: LessonLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => setIsCollapsed((current) => !current);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
          {lesson.section}
        </span>
        <ProgressAction slug={lesson.slug} />
      </div>

      <nav className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
        {previous ? (
          <Link className="text-slate-600 hover:text-slate-900 dark:text-slate-300" href={`/${locale}/lesson/${previous.slug}`}>
            ← {previous.title[locale]}
          </Link>
        ) : (
          <span className="text-slate-400">—</span>
        )}
        {next ? (
          <Link className="text-right text-slate-600 hover:text-slate-900 dark:text-slate-300" href={`/${locale}/lesson/${next.slug}`}>
            {next.title[locale]} →
          </Link>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </nav>

      <div className="flex flex-col gap-6 lg:flex-row">
        <article
          className={clsx(
            'relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900',
            'space-y-4',
            isCollapsed
              ? 'lg:flex-[0_0_120px] lg:p-4'
              : 'lg:flex-[0_0_440px] lg:p-6'
          )}
        >
          <button
            type="button"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand lesson content' : 'Collapse lesson content'}
            title={isCollapsed ? 'Expand lesson content' : 'Collapse lesson content'}
            onClick={toggleCollapsed}
            className="absolute -right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <ExpandIcon className={clsx('h-5 w-5 transition-transform duration-300', isCollapsed ? 'rotate-0' : 'rotate-45')} />
          </button>
          <div
            className={clsx(
              'overflow-hidden transition-[opacity,max-height] duration-300 ease-in-out',
              isCollapsed ? 'pointer-events-none max-h-0 opacity-0' : 'max-h-[4000px] opacity-100'
            )}
          >
            <header className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{lesson.section}</p>
              <h1 className="text-3xl font-bold">{lesson.title[locale]}</h1>
              <p className="text-slate-600 dark:text-slate-300">{lesson.summary[locale]}</p>
            </header>
            <div className="prose prose-slate mt-4 max-w-none dark:prose-invert">{children}</div>
          </div>
        </article>
        <div className="min-h-[520px] flex-1 transition-all duration-300">
          <Playground code={lesson.defaultCode} />
        </div>
      </div>
    </div>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15.5 3.5h5v5" />
      <path d="M21 3l-6 6" />
      <path d="M8.5 20.5h-5v-5" />
      <path d="M3 21l6-6" />
    </svg>
  );
}
