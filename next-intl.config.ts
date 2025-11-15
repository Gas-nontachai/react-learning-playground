import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, getMessages, isLocale, locales} from './src/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const messages = await getMessages(activeLocale);

  return {
    locale: activeLocale,
    locales,
    defaultLocale,
    messages
  };
});
