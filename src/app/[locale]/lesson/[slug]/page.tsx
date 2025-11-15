import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/lib/i18n';
import {isLocale, locales} from '@/lib/i18n';
import {getAdjacentLessons, getLessonBySlug} from '@/lib/lessons-config';
import {lessonContent} from '@/lessons/registry';
import {LessonLayout} from '@/components/LessonLayout';

export function generateStaticParams() {
  const lessonSlugs = Object.keys(lessonContent.en);
  return locales.flatMap((locale) => lessonSlugs.map((slug) => ({locale, slug})));
}

export default async function LessonPage({
  params
}: {
  params: Promise<{locale: Locale; slug: string}>;
}) {
  const {locale, slug} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const lesson = getLessonBySlug(slug);
  if (!lesson) {
    notFound();
  }

  setRequestLocale(locale);

  const Content = lessonContent[locale][slug];

  if (!Content) {
    notFound();
  }

  const adjacent = getAdjacentLessons(slug);

  return (
    <LessonLayout locale={locale} lesson={lesson} previous={adjacent.previous} next={adjacent.next}>
      <Content />
    </LessonLayout>
  );
}
