import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {LocaleLayoutClient} from '@/components/LocaleLayoutClient';
import {getMessages, isLocale, locales, type Locale} from '@/lib/i18n';
import {siteMetadata} from '@/lib/site-metadata';

export const metadata = siteMetadata;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;

  if (!isLocale(locale)) {
    notFound();
  }
  const messages = await getMessages(locale);
  const appTitle = messages.app?.title ?? 'Playground';

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Bangkok">
      <LocaleLayoutClient locale={locale as Locale} appTitle={appTitle}>
        {children}
      </LocaleLayoutClient>
    </NextIntlClientProvider>
  );
}
