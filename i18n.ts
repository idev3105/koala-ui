import { getRequestConfig } from 'next-intl/server'
import { getUserLocale } from '@/utils/locale'
import { i18n_config, Locale } from '@/i18n_config'
import { getDictionary } from './utils/dictionary'

export default getRequestConfig(async () => {
  const { locales } = i18n_config

  let locale = (await getUserLocale()) as Locale

  if (!locales.includes(locale as any)) {
    locale = 'en'
  }

  return {
    locale,
    messages: await getDictionary(locale),
  }
})
