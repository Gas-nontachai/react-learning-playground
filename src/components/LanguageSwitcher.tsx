'use client';

import clsx from 'clsx';
import {usePathname, useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import type {Locale} from '@/lib/i18n';
import {locales} from '@/lib/i18n';

export function LanguageSwitcher({locale}: {locale: Locale}) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');

  const buildHref = (target: Locale) => {
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    if (!segments.length) return `/${target}`;
    segments[0] = target;
    return `/${segments.join('/')}`;
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 p-1 text-sm dark:border-slate-700">
      {locales.map((candidate) => (
        <button
          key={candidate}
          className={clsx(
            'rounded-full px-3 py-1 transition-all',
            candidate === locale
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
          )}
          onClick={() => router.push(buildHref(candidate))}
          disabled={candidate === locale}
        >
          {t(candidate)}
        </button>
      ))}
    </div>
  );
}
