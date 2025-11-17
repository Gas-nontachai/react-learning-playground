'use client';

import {ComponentPropsWithoutRef, ReactNode, isValidElement, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'>;

const getNodeText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (isValidElement(node)) {
    return getNodeText(node.props.children);
  }

  return '';
};

export function CodeBlock({children, className, style, ...props}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeString = useMemo(() => getNodeText(children), [children]);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    if (!codeString) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(codeString);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = codeString;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy code block', error);
    }
  };

  return (
    <div className="group relative">
      <pre
        {...props}
        style={{overflowX: 'auto', ...style}}
        className={clsx(
          'rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100 dark:border-slate-700',
          className
        )}
      >
        {children}
      </pre>
      <button
        type="button"
        aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        onClick={handleCopy}
        disabled={!codeString}
        className={clsx(
          'absolute right-3 top-3 inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium transition',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400',
          'disabled:cursor-not-allowed disabled:opacity-40',
          copied
            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
            : 'border-slate-700 bg-slate-800/80 text-slate-100 hover:bg-slate-700'
        )}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
