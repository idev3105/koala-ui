'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { HomeIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

interface MenuProps {
  onMenuClick?: (name: string) => void
}

export default function Menu({ onMenuClick }: MenuProps) {
  const t = useTranslations('common')
  const session = useSession()

  // Show session in browser console, you can get token from here to debug
  console.log('Debug session', session)

  const handleSignIn = () => {
    const options = {
      callbackUrl: '/',
    }
    signIn('keycloak', options)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="h-full w-full">
      {session.data?.user && (
        <div className="mt-8 px-2 text-lg text-secondary">
          {t('hello') + ', ' + session.data?.user?.name}
        </div>
      )}
      <ul className="main_menu p-2">
        <li>
          <Link href="/" onClick={(e) => onMenuClick && onMenuClick('home')}>
            <HomeIcon className="size-6" />
            <div>{t('home')}</div>
          </Link>
        </li>
      </ul>
      {session.data?.user ? (
        <div className="absolute bottom-0 mb-4 w-full px-4">
          <button className="btn btn-outline btn-error w-full" onClick={handleSignOut}>
            {t('signOut')}
          </button>
        </div>
      ) : (
        <div className="absolute bottom-0 mb-4 w-full px-4">
          <button className="btn btn-primary w-full" onClick={handleSignIn}>
            {t('signIn')}
          </button>
        </div>
      )}
    </div>
  )
}
