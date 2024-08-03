'use client'

import { useRef } from 'react'
import Menu from './Menu'

export default function Drawer() {
  const checkBoxRef = useRef<HTMLInputElement>(null)

  return (
    <div className="drawer">
      <input ref={checkBoxRef} id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="h-[36px] w-[36px] p-1">
          <label
            htmlFor="my-drawer"
            className="drawer-button flex h-full w-full items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <div className="menu min-h-full w-80 bg-base-200 p-4">
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
