import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, getMessages, isLocale, locales} from './src/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  const candidateLocale = locale ?? defaultLocale;
  const activeLocale = isLocale(candidateLocale) ? candidateLocale : defaultLocale;
  const messages = await getMessages(activeLocale);

  return {
    locale: activeLocale,
    locales,
    defaultLocale,
    messages
  };
});
