export const locales = ['th', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'th';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'th':
      return (await import('../messages/th.json')).default;
    case 'en':
      return (await import('../messages/en.json')).default;
    default:
      return (await import('../messages/en.json')).default;
  }
}
