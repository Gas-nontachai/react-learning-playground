'use client';

import { Sandpack } from "@codesandbox/sandpack-react";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface PlaygroundProps {
  code: string;
}

export function Playground({ code }: PlaygroundProps) {
  const t = useTranslations('playground');
  const [resetKey, setResetKey] = useState(0);
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
    setResetKey((key) => key + 1);
  }, [code]);

  const handleReset = () => {
    setCurrentCode(code);
    setResetKey((key) => key + 1);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('title')}</p>
        <button
          onClick={handleReset}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {t('reset')}
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Sandpack
          theme="light"
          key={resetKey}
          template="react-ts"
          files={{
            '/App.tsx': currentCode,
            '/styles.css': `body { font-family: 'Inter', sans-serif; padding: 1rem; background: #f8fafc; }
main { display: flex; flex-direction: column; gap: 1rem; }
button { cursor: pointer; }
`
          }}
          customSetup={{
            dependencies: {
              react: '18.2.0',
              'react-dom': '18.2.0'
            }
          }}
          options={{
            autorun: true,
            showConsole: true,
            showInlineErrors: true,
            editorHeight: 480,
            externalResources: ['https://cdn.jsdelivr.net/npm/tailwindcss@3.4.10/dist/tailwind.min.css']
          }}
        />
      </div>
    </div>
  );
}
