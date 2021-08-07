import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='md:h-screen w-1/4 sm:h-1/6 mr-4 bg-light sticky-nav dark:bg-darkTheme dark:text-gray-100'>
      <a href='#skip' className='skip-nav'>
        Skip to content
      </a>
      <div className='flex flex-col'>
        <Link href='/'>
          <a className='p-1 text-primary hover:text-secondary sm:p-4 dark:text-light dark:hover:text-opacity-30'>
            <h2>Home</h2>
          </a>
        </Link>
        <Link href='/blog'>
          <a className='p-1 text-primary hover:text-secondary sm:p-4 dark:text-light dark:hover:text-opacity-30'>
            <h2>Blog</h2>
          </a>
        </Link>
        <Link href='/about'>
          <a className='p-1 text-primary hover:text-secondary sm:p-4 dark:text-light dark:hover:text-opacity-30'>
            <h2>About</h2>
          </a>
        </Link>
      </div>
    </nav>
  )
}
