import Drawer from './Drawer'
import ThemeChanger from './ThemeChanger'
import Avatar from './Avatar'
import LocaleSwitcher from './LocaleChanger'
import { getTranslations } from 'next-intl/server'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'

export default async function TopBar() {
  const t = await getTranslations('common')

  return (
    <nav className="navbar">
      <div className="flex-1">
        <div>Koala</div>
      </div>
      <div>
        <div>
          <button className="btn btn-circle btn-ghost">
            <MagnifyingGlassIcon className="w-4" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Bars3Icon className="w-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
