import SEO from '@/components/SEO'
import NavBar from '@/components/NavBar'
import ThemeToggleBtn from '@/components/ThemeToggleBtn'

export default function Container({ children, meta }) {
  return (
    <div>
      <SEO meta={meta} />
      <div className='w-screen h-screen flex flex-row'>
        <NavBar />
        <main
          id='skip'
          className='flex justify-center items-center h-full w-3/4 sm:w-full p-5 bg-light dark:bg-dark'
        >
          {children}
        </main>
      </div>
      <ThemeToggleBtn />
    </div>
  )
}
