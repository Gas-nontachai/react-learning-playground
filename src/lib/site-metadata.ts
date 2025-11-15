import type {Metadata} from 'next';
import {locales} from './i18n';

const FALLBACK_URL = 'https://react-learning-playground.dev';
export const siteName = 'React Learning Playground';
export const siteDescription = 'Bilingual React learning path with sandbox playground for Thai beginners.';

function resolveSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!envUrl) {
    return FALLBACK_URL;
  }

  try {
    const parsed = new URL(envUrl);
    return parsed.origin;
  } catch {
    return `https://${envUrl.replace(/^https?:\/\//, '')}`;
  }
}

export const siteUrl = resolveSiteUrl();

const languageAlternates = locales.reduce<Record<string, string>>((acc, locale) => {
  const localeTag = locale === 'th' ? 'th-TH' : 'en-US';
  acc[localeTag] = `/${locale}`;
  return acc;
}, {});
languageAlternates['x-default'] = '/';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    'React course',
    'Thai React tutorial',
    'Interactive React exercises',
    'Frontend sandbox',
    'Learn React in Thai'
  ],
  authors: [{name: siteName}],
  creator: siteName,
  publisher: siteName,
  category: 'technology',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: '/',
    languages: languageAlternates
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: 'th_TH',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'React Learning Playground preview card'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'เรียน React แบบสองภาษา พร้อม Sandpack ให้ลองเล่นโค้ดได้ทันที',
    images: ['/opengraph-image']
  }
};
