'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { type ReactNode, useRef, useState } from 'react';
import { Playground } from './Playground';
import type { Lesson } from '@/lib/lessons-config';
import type { Locale } from '@/lib/i18n';
import { ProgressAction } from './ProgressAction';
import { TextToSpeechControl } from './TextToSpeechControl';
import { ExpandIcon } from '@/components/icon/ExpandIcon';

interface LessonLayoutProps {
  locale: Locale;
  lesson: Lesson;
  children: ReactNode;
  previous: Lesson | null;
  next: Lesson | null;
}

export function LessonLayout({ locale, lesson, children, previous, next }: LessonLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapsed = () => setIsCollapsed((current) => !current);
  const playgroundCode = lesson.defaultCode;
  const hasPlayground = Boolean(playgroundCode);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/50 lg:flex-row lg:items-center lg:justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {lesson.section}
        </span>
        <ProgressAction slug={lesson.slug} />
      </div>

      <nav className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
        {previous ? (
          <Link
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            href={`/${locale}/lesson/${previous.slug}`}
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="font-medium">{previous.title[locale]}</span>
          </Link>
        ) : (
          <div className="px-3 py-2" />
        )}
        {next ? (
          <Link
            className="group inline-flex items-center justify-end gap-2 rounded-lg px-3 py-2 text-right text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            href={`/${locale}/lesson/${next.slug}`}
          >
            <span className="font-medium">{next.title[locale]}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <div className="px-3 py-2" />
        )}
      </nav>

      <div className={clsx('flex flex-col gap-6 relative', hasPlayground && 'lg:flex-row')}>
        {hasPlayground && (
          <button
            type="button"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand lesson content' : 'Collapse lesson content'}
            title={isCollapsed ? 'Expand lesson content' : 'Collapse lesson content'}
            onClick={toggleCollapsed}
            className="absolute -left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md transition-all hover:scale-110 hover:border-slate-400 hover:bg-slate-50 hover:shadow-lg active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            <ExpandIcon
              className={clsx(
                'h-5 w-5 transition-transform duration-300 ease-out',
                isCollapsed ? 'rotate-0' : 'rotate-45'
              )}
            />
          </button>
        )}

        <article
          className={clsx(
            'relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out dark:border-slate-800 dark:bg-slate-900',
            hasPlayground && 'lg:flex-[0_0_440px]',
            isCollapsed && hasPlayground
              ? 'flex-[0_0_0px] opacity-0 lg:flex-[0_0_0px]'
              : 'p-6 opacity-100 space-y-4'
          )}
          aria-hidden={isCollapsed}
        >
          {!isCollapsed && (
            <>
              <header className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lesson.section}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-slate-50">
                  {lesson.title[locale]}
                </h1>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {lesson.summary[locale]}
                </p>
                <div className="pt-2">
                  <TextToSpeechControl contentRef={contentRef} locale={locale} />
                </div>
              </header>
              <div ref={contentRef} className="prose prose-slate mt-4 max-w-none dark:prose-invert">
                {children}
              </div>
            </>
          )}
        </article>

        {playgroundCode && (
          <div
            className={clsx(
              'min-h-[520px] flex-1 rounded-2xl transition-all duration-300 ease-out',
              isCollapsed && 'lg:ml-6'
            )}
          >
            <Playground code={playgroundCode} />
          </div>
        )}
      </div>
    </div>
  );
}
