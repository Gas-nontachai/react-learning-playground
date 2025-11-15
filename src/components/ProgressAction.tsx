'use client';

import {useTranslations} from 'next-intl';
import {useProgress} from '@/lib/progress';

interface ProgressActionProps {
  slug: string;
}

export function ProgressAction({slug}: ProgressActionProps) {
  const t = useTranslations('lesson');
  const {isCompleted, toggleCompleted} = useProgress();
  const completed = isCompleted(slug);

  return (
    <button
      onClick={() => toggleCompleted(slug)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        completed
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
          : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
      }`}
    >
      {completed ? t('completed') : t('markComplete')}
    </button>
  );
}
