export const i18n_config = {
  defaultLocale: 'en',
  locales: ['en', 'vn'],
} as const

export type Locale = (typeof i18n_config)['locales'][number]
