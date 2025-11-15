import '../styles/globals.css';
import type {Metadata} from 'next';
import {Providers} from '../components/Providers';

export const metadata: Metadata = {
  title: 'React Learning Playground',
  description: 'Bilingual React learning path with sandbox playground for Thai beginners.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
