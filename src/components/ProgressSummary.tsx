'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {useProgress} from '@/lib/progress';
import type {Locale} from '@/lib/i18n';
import {orderedLessons} from '@/lib/lessons-config';

export function ProgressSummary({locale}: {locale: Locale}) {
  const {completed} = useProgress();
  const t = useTranslations('home');
  const percent = Math.round((completed.length / orderedLessons.length) * 100);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
      <p className="text-sm font-semibold">{t('progress')}</p>
      <p className="text-3xl font-bold">{percent}%</p>
      <p className="text-sm">{completed.length} / {orderedLessons.length}</p>
      <Link
        href={`/${locale}/lesson/${orderedLessons[0].slug}`}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
      >
        {t('cta')} →
      </Link>
    </div>
  );
}
