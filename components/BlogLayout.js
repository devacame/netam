'use strict'

import SEO from '@/components/SEO'
import Nav from '@/components/Nav'
import ThemeToggleBtn from '@/components/ThemeToggleBtn'
import { useState, useEffect } from 'react'

export default function BaseLayout({ children, meta }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div>
      <SEO meta={meta} />
      <div className='flex flex-row'>
        <Nav />
        <main
          id='skip'
          className='lg:mt-0 mt-14 flex flex-col justify-center items-center lg:w-3/4 w-4/5 mx-auto pb-5 pl-10 pr-10 pt-3 bg-light dark:bg-dark'
        >
          {children}
        </main>
      </div>
      <ThemeToggleBtn mounted={mounted} />
    </div>
  )
}
