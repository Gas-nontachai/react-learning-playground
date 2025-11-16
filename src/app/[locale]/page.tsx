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
  const totalLessons = orderedLessons.length;

  const stats = [
    {value: `${totalLessons}+`, label: t('statLessonsLabel')},
    {value: '6', label: t('statMiniProjectsLabel')},
    {value: t('statMinutesValue'), label: t('statMinutesLabel')}
  ];

  const features = [
    {
      title: t('featureHandsOnTitle'),
      description: t('featureHandsOnDescription'),
      accent: 'from-sky-500/40 via-sky-500/10 to-transparent',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path
            d="M5 7h6m8 0h-6m-8 10h6m8 0h-6m-2-4 3.5-5L21 17"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: t('featureThaiTitle'),
      description: t('featureThaiDescription'),
      accent: 'from-amber-500/40 via-orange-500/10 to-transparent',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path
            d="M5 7h14M5 12h9m-9 5h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16.5 10.25 20 7v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: t('featureRoadmapTitle'),
      description: t('featureRoadmapDescription'),
      accent: 'from-emerald-500/40 via-emerald-500/10 to-transparent',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path
            d="M5 5v14m0-10 4-2 6 4 4-2v10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: t('featurePlaygroundTitle'),
      description: t('featurePlaygroundDescription'),
      accent: 'from-indigo-500/40 via-indigo-500/10 to-transparent',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path
            d="M5 7h14v10H5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m8.5 12 2 2-2 2m5-4h2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  const checklist = [t('seoChecklistGuided'), t('seoChecklistThai'), t('seoChecklistPortfolio')];
  const keywordChips =
    locale === 'th'
      ? ['เรียน React', 'สอนเขียนเว็บ', 'พอร์ตโฟลิโอ']
      : ['React basics', 'Thai tutorial', 'web portfolio'];

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-slate-300/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              {t('heroTagline')}
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">{t('welcome')}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">{t('heroDescription')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/lesson/${featured[0].slug}`}
                className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
              >
                {t('cta')}
              </Link>
              <a
                href="#starter-lessons"
                className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-white dark:border-slate-700 dark:bg-transparent dark:text-slate-200"
              >
                {t('secondaryCta')}
              </a>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/80 p-4 text-slate-900 shadow-sm dark:bg-slate-900/80 dark:text-white"
                >
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</dt>
                  <dd className="text-3xl font-bold md:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-sky-500/40 via-indigo-500/20 to-transparent blur-3xl" aria-hidden="true" />
            <div className="relative isolate overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900/95 p-6 text-slate-50 shadow-2xl dark:border-slate-800">
              <div className="space-y-6">
                <div className="rounded-2xl bg-black/40 p-5 font-mono text-sm leading-relaxed text-slate-100 shadow-inner">
                  <p><span className="text-sky-300">function</span> HeroCard() {'{'}</p>
                  <p className="pl-4 text-slate-200">return {'('}</p>
                  <p className="pl-8 text-slate-100">{'<Playground accent="sky" />'}</p>
                  <p className="pl-4 text-slate-200">{')'}</p>
                  <p>{'}'}</p>
                  <p className="pt-4 text-emerald-300">{'// ลองแก้โค้ดแล้วดูผลทันที'}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Live preview</p>
                    <p className="mt-2 text-lg font-semibold text-white">Landing Card</p>
                    <div className="mt-4 h-16 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Checklist</p>
                    <ul className="mt-3 space-y-3 text-sm text-slate-200">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" /> State hooks
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-sky-400" /> Props
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-400" /> Tailwind UI
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500 dark:text-sky-300">{t('featureEyebrow')}</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('featureHeading')}</h2>
            <p className="text-base text-slate-600 dark:text-slate-300">{t('featureDescription')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} text-slate-900 dark:text-white`}>
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-emerald-50 via-white to-white p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
          <ProgressSummary locale={locale} />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500 dark:text-sky-300">{t('seoSectionEyebrow')}</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('seoSectionTitle')}</h2>
            <p className="text-base text-slate-600 dark:text-slate-300">{t('seoSectionDescription')}</p>
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-200">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
                      <path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">SEO Copy Example</p>
            <div className="mt-4 space-y-4 text-slate-700 dark:text-slate-100">
              <p className="rounded-2xl bg-white p-4 text-base font-semibold shadow-sm dark:bg-slate-900">
                {locale === 'th'
                  ? '“สร้างเว็บ React ภาษาไทยที่พร้อมใส่พอร์ต โดยรู้จัก hooks และ component pattern ที่ใช้จริง”'
                  : '“Build Thai-friendly React pages ready for your portfolio while mastering hooks and UI patterns.”'}
              </p>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">Keyword focus</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordChips.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {keyword}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  {locale === 'th'
                    ? 'ใช้คำค้นหาที่คนไทยเสิร์ชบ่อย เพื่อให้เว็บเพจของคุณเจอได้จริง'
                    : 'Blend Thai search intent with global keywords so your pages get discovered.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="starter-lessons" className="scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('starterTitle')}</h2>
          <p className="text-base text-slate-600 dark:text-slate-300">{t('starterSubtitle')}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/${locale}/lesson/${lesson.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">{lesson.section}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{lesson.title[locale]}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{lesson.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
