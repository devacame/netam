'use strict'

import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='sticky-nav w-1/6 bg-light dark:bg-dark'>
      <a href='#skip' className='skip-nav'>
        Skip to content
      </a>
      <div className='flex flex-col font-bold'>
        <Link href='/'>
          <a className='p-1 sm:p-4 text-xl text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            Home
          </a>
        </Link>
        <Link href='/blog'>
          <a className='p-1 sm:p-4 text-xl text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            Blog
          </a>
        </Link>
        <Link href='/about'>
          <a className='p-1 sm:p-4 text-xl text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            About
          </a>
        </Link>
      </div>
    </nav>
  )
}
