import Link from 'next/link';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/lib/i18n';
import {orderedLessons} from '@/lib/lessons-config';
import {ProgressSummary} from '@/components/ProgressSummary';

export default async function LocaleHome({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'home'});
  const featured = orderedLessons.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-wide text-slate-500">React Learning Playground</p>
          <h1 className="text-4xl font-bold">{t('welcome')}</h1>
          <p className="text-slate-600 dark:text-slate-300">
            เรียนรู้ด้วยบทความภาษาไทยและภาษาอังกฤษ พร้อมตัวอย่างที่รันได้ทันที
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/lesson/${featured[0].slug}`}
              className="rounded-full bg-slate-900 px-6 py-3 text-white dark:bg-white dark:text-slate-900"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
        <ProgressSummary locale={locale} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Starter lessons</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/${locale}/lesson/${lesson.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">{lesson.section}</p>
              <h3 className="mt-2 text-xl font-semibold">{lesson.title[locale]}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{lesson.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
