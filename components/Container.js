'use strict'

import SEO from '@/components/SEO'
import NavBar from '@/components/NavBar'
import ThemeToggleBtn from '@/components/ThemeToggleBtn'
import { useState, useEffect } from 'react'

export default function Container({ children, meta }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div>
      <SEO meta={meta} />
      <div className='flex flex-row'>
        <NavBar />
        <main
          id='skip'
          className='flex flex-col justify-center items-center w-2/3 pb-5 pl-20 pr-20 pt-3 mx-auto bg-light dark:bg-dark'
        >
          {children}
        </main>
      </div>
      <ThemeToggleBtn mounted={mounted} />
    </div>
  )
}
