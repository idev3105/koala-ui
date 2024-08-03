'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowTrendingUpIcon, HomeIcon } from '@heroicons/react/24/outline'

interface MenuProps {
  onMenuClick?: (name: string) => void
}

export default function Menu({ onMenuClick }: MenuProps) {
  const t = useTranslations('common')

  return (
    <div>
      <ul className="main_menu">
        <li>
          <Link href="/" onClick={(e) => (onMenuClick ? onMenuClick('home') : {})}>
            <HomeIcon className="size-6" />
            <div>{t('home')}</div>
          </Link>
        </li>
        <li>
          <Link href="/popular" onClick={(e) => (onMenuClick ? onMenuClick('popular') : {})}>
            <ArrowTrendingUpIcon className="size-6" />
            <div>{t('popular')}</div>
          </Link>
        </li>
      </ul>
      <div className="divider m-0" />
    </div>
  )
}
