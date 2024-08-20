import Link from 'next/link'

export default function Footer() {
  return (
    <div className="h-full w-full">
      <div className="inline-flex w-full gap-2 sm:justify-end">
        <Link className="underline" href="/">
          {/* TODO: use i18n */}
          Home
        </Link>
        <div>/</div>
        <Link className="underline" href="/about">
          About
        </Link>
      </div>
      <div className="w-full sm:justify-between md:inline-flex">
        <div className="inline-flex w-full justify-between gap-6 sm:w-fit sm:justify-start">
          <Link className="underline" href="/">
            {/* TODO: use i18n */}
            Privacy Policy
          </Link>
          <Link className="underline" href="/about">
            {/* TODO: use i18n */}
            Terms of Service
          </Link>
          <Link className="underline" href="/about">
            {/* TODO: use i18n */}
            Language
          </Link>
        </div>
        {/* TODO: use i18n */}
        <div className="h-fit">Copyright © idev</div>
      </div>
    </div>
  )
}
