import type {ComponentPropsWithoutRef, ComponentType, ReactNode} from 'react';
import clsx from 'clsx';

export type MDXComponents = Record<string, ComponentType<{children?: ReactNode}>>;

type NativeProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

const baseComponents: MDXComponents = {
  h1: ({className, ...props}: NativeProps<'h1'>) => (
    <h1
      {...props}
      className={clsx('text-3xl font-bold tracking-tight text-slate-900 dark:text-white', className)}
    />
  ),
  h2: ({className, ...props}: NativeProps<'h2'>) => (
    <h2
      {...props}
      className={clsx('text-2xl font-semibold text-slate-800 dark:text-slate-100', className)}
    />
  ),
  h3: ({className, ...props}: NativeProps<'h3'>) => (
    <h3
      {...props}
      className={clsx('text-xl font-semibold text-slate-800 dark:text-slate-100', className)}
    />
  ),
  p: ({className, ...props}: NativeProps<'p'>) => (
    <p {...props} className={clsx('leading-relaxed text-slate-600 dark:text-slate-300', className)} />
  ),
  ul: ({className, ...props}: NativeProps<'ul'>) => (
    <ul {...props} className={clsx('ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300', className)} />
  ),
  ol: ({className, ...props}: NativeProps<'ol'>) => (
    <ol {...props} className={clsx('ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-300', className)} />
  ),
  li: ({className, ...props}: NativeProps<'li'>) => (
    <li {...props} className={clsx('leading-relaxed text-slate-600 dark:text-slate-300', className)} />
  ),
  a: ({className, ...props}: NativeProps<'a'>) => (
    <a
      {...props}
      className={clsx(
        'font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-300',
        className
      )}
    />
  ),
  code: ({className, ...props}: NativeProps<'code'>) => (
    <code
      {...props}
      className={clsx(
        'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200',
        className
      )}
    />
  ),
  pre: ({className, ...props}: NativeProps<'pre'>) => (
    <pre
      {...props}
      className={clsx(
        'overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100 dark:border-slate-700',
        className
      )}
    />
  ),
  blockquote: ({className, ...props}: NativeProps<'blockquote'>) => (
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
  return {...baseComponents, ...components};
}
