import '../styles/globals.css';
import {siteMetadata, siteDescription, siteName, siteUrl} from '@/lib/site-metadata';
import {Providers} from '../components/Providers';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  inLanguage: ['th-TH', 'en-US'],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'beginner'
  },
  provider: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl
  },
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'THB',
    availability: 'https://schema.org/InStock'
  }
};

export const metadata = siteMetadata;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
      </head>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
