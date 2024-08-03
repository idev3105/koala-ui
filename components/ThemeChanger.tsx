'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { ChangeEvent, useEffect, useRef } from 'react'

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme()
  const checkBoxRef = useRef<HTMLInputElement>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    setTheme(e.target.checked ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'dark') {
      checkBoxRef.current ? (checkBoxRef.current.checked = true) : {}
    }
  }, [theme])

  return (
    <div>
      <label className="grid cursor-pointer place-items-center">
        <input
          ref={checkBoxRef}
          type="checkbox"
          value="dark"
          className="theme-controller toggle col-span-2 col-start-1 row-start-1 bg-base-content"
          onChange={onChange}
        />
        <SunIcon
          className="col-start-1 row-start-1 fill-base-100 stroke-base-100"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <MoonIcon
          className="col-start-2 row-start-1 fill-base-100 stroke-base-100"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </label>
    </div>
  )
}
