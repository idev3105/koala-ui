'use server'

import { cookies } from 'next/headers'
import { Locale, i18n_config } from '@/i18n_config'
import { revalidatePath } from 'next/cache'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE'

const { defaultLocale } = i18n_config

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale)
  revalidatePath('/')
}
