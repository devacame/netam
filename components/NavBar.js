'use strict'

import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='h-screen w-1/4 mr-4 bg-light sticky-nav dark:bg-dark'>
      <a href='#skip' className='skip-nav'>
        Skip to content
      </a>
      <div className='flex flex-col font-bold'>
        <Link href='/'>
          <a className='p-1 sm:p-4 text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            <h2>Home</h2>
          </a>
        </Link>
        <Link href='/blog'>
          <a className='p-1 sm:p-4 text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            <h2>Blog</h2>
          </a>
        </Link>
        <Link href='/about'>
          <a className='p-1 sm:p-4 text-bluePrime hover:text-blueSub dark:text-light dark:hover:text-opacity-30'>
            <h2>About</h2>
          </a>
        </Link>
      </div>
    </nav>
  )
}
