import Drawer from './Drawer'
import { getTranslations } from 'next-intl/server'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default async function TopBar() {
  const t = await getTranslations('common')

  return (
    <nav className="navbar pr-0">
      <div className="flex-1">
        <div>Koala</div>
      </div>
      <div>
        <div className="flex">
          <button className="btn btn-circle btn-ghost">
            <MagnifyingGlassIcon className="w-4" />
          </button>
          <Drawer />
        </div>
      </div>
    </nav>
  )
}
