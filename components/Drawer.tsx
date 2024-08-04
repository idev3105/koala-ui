'use client'

import { useRef } from 'react'
import Menu from './Menu'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Drawer() {
  const checkBoxRef = useRef<HTMLInputElement>(null)

  return (
    <div className="drawer drawer-end">
      <input ref={checkBoxRef} id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-circle btn-ghost drawer-button">
          <Bars3Icon className="w-4" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <div className="menu min-h-full w-80 bg-base-200 p-0">
          <Menu
            onMenuClick={(name) =>
              checkBoxRef.current?.checked ? (checkBoxRef.current.checked = false) : {}
            }
          />
        </div>
      </div>
    </div>
  )
}
