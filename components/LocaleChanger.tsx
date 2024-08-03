'use client'

import { i18n_config, type Locale } from '@/i18n_config'
import { setUserLocale } from '@/utils/locale'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function LocaleSwitcher() {
  const router = useRouter()
  const currentLocale = useLocale()
  const t = useTranslations('languages')

  const handleLocaleChange = async (locale: Locale) => {
    await setUserLocale(locale)
    router.refresh()
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleLocaleChange(e.target.value as Locale)
  }

  return (
    <div>
      <select
        className="select select-sm w-full"
        onChange={handleChange}
        defaultValue={currentLocale}
      >
        {i18n_config.locales.map((locale) => {
          return (
            <option key={locale} value={locale}>
              {t(locale)}
            </option>
          )
        })}
      </select>
    </div>
  )
}
