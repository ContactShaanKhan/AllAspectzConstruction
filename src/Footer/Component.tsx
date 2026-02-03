import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-palDarkBlue dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className='flex flex-row gap-3'>
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <span className="text-sm flex items-center justify-center">
            © {year}
            <Link
              href="/"
              className="hover:underline text-gray-300 font-semibold underline decoration-pal-blue-light underline-offset-2 ms-1"
            >
              {process.env.COMPANY_NAME}
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          {/* <ThemeSelector /> */}
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} appearance={'admin'} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
