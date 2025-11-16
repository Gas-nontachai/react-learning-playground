'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import type { Locale } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import LogoImg from '@/app/icon.svg';

type LocaleLayoutClientProps = {
  locale: Locale;
  appTitle: string;
  children: ReactNode;
};

export function LocaleLayoutClient({ locale, appTitle, children }: LocaleLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 lg:flex-row">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        locale={locale}
        id="sidebar-panel"
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-72 transform bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-slate-900 lg:static lg:block lg:translate-x-0 lg:shadow-none',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900 flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-panel"
              onClick={toggleSidebar}
              className="flex-shrink-0 flex items-center gap-2 rounded-md  bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            >
              {isSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <div className='hidden lg:block'>
              <p className="text-sm text-slate-500 dark:text-slate-400">React Learning Playground</p>
              <p className="text-lg font-semibold cursor-pointer hover:underline"
                onClick={() => router.push(`/${locale}`)}
              >{appTitle}</p>
            </div>
            <div className='block lg:hidden'>
              <Image
                className='cursor-pointer'
                src={LogoImg}
                width={30}
                height={30}
                alt="React Learning Playground Logo"
                onClick={() => router.push(`/${locale}`)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
