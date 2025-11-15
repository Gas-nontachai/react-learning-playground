import Link from 'next/link';
import type { ReactNode } from 'react';
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
          {lesson.section}
        </span>
        <ProgressAction slug={lesson.slug} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{lesson.section}</p>
            <h1 className="text-3xl font-bold">{lesson.title[locale]}</h1>
            <p className="text-slate-600 dark:text-slate-300">{lesson.summary[locale]}</p>
          </header>
          <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>
          <nav className="flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800 md:flex-row md:items-center md:justify-between">
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
        </article>
        <div className="min-h-[520px]">
          <Playground code={lesson.defaultCode} />
        </div>
      </div>
    </div>
  );
}
