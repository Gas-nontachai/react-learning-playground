import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';
import clsx from 'clsx';
import {CodeBlock} from '@/components/mdx/CodeBlock';

export type MDXComponents = Record<string, ComponentType<{ children?: ReactNode }>>;

type NativeProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

const baseComponents: MDXComponents = {
  h1: ({ className, ...props }: NativeProps<'h1'>) => (
    <h1
      {...props}
      className={clsx('text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100', className)}
    />
  ),
  h2: ({ className, ...props }: NativeProps<'h2'>) => (
    <h2
      {...props}
      className={clsx('text-2xl font-semibold text-slate-800 dark:text-slate-100', className)}
    />
  ),
  h3: ({ className, ...props }: NativeProps<'h3'>) => (
    <h3
      {...props}
      className={clsx('text-xl font-semibold text-slate-800 dark:text-slate-100', className)}
    />
  ),
  p: ({ className, ...props }: NativeProps<'p'>) => (
    <p {...props} className={clsx('leading-relaxed text-slate-600 dark:text-slate-300', className)} />
  ),
  br: ({ className, ...props }: NativeProps<'br'>) => <br {...props} className={clsx(className)} />,
  ul: ({ className, ...props }: NativeProps<'ul'>) => (
    <ul {...props} className={clsx('ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300', className)} />
  ),
  ol: ({ className, ...props }: NativeProps<'ol'>) => (
    <ol {...props} className={clsx('ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-300', className)} />
  ),
  li: ({ className, ...props }: NativeProps<'li'>) => (
    <li {...props} className={clsx('leading-relaxed text-slate-600 dark:text-slate-300', className)} />
  ),
  a: ({ className, ...props }: NativeProps<'a'>) => (
    <a
      {...props}
      className={clsx(
        'font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-300',
        className
      )}
    />
  ),
  code: ({ className, ...props }: NativeProps<'code'>) => (
    <code
      {...props}
      className={clsx(
        'inline-flex items-center rounded-md font-mono text-[0.875em] font-medium',
        'px-2 py-0.5 transition-colors duration-200',

        'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
        'text-purple-900',
        'shadow-sm shadow-purple-200/50',

        'dark:bg-gradient-to-br dark:from-purple-950 dark:via-fuchsia-950 dark:to-indigo-950',
        'dark:text-purple-100',
        'dark:shadow-purple-900/50',

        'hover:border-purple-300 hover:shadow-md hover:shadow-purple-300/30',
        'dark:hover:border-purple-600 dark:hover:shadow-purple-800/40',
        'hover:scale-[1.02]',

        'selection:bg-blue-200 dark:selection:bg-blue-800',

        className
      )}
    />
  ),
  pre: (props: NativeProps<'pre'>) => <CodeBlock {...props} />,
  blockquote: ({ className, ...props }: NativeProps<'blockquote'>) => (
    <blockquote
      {...props}
      className={clsx(
        'border-l-4 border-indigo-400 bg-indigo-50 px-4 py-2 italic text-slate-700 dark:border-indigo-500 dark:bg-slate-800 dark:text-slate-200',
        className
      )}
    />
  )
};

export function useMDXComponents(components: MDXComponents = {}) {
  return { ...baseComponents, ...components };
}
