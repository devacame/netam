import SEO from '@/components/SEO'
import Nav from '@/components/Nav'
import ThemeToggleBtn from '@/components/ThemeToggleBtn'
import { useState, useEffect, ReactNode } from 'react'

interface PageProps {
    children: ReactNode
}

export default function AdminLayout({ children }: PageProps) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <>
            <SEO />
            <div className='flex flex-row'>
                <Nav />
                <main
                    id='skip'
                    className='flex flex-col justify-center items-center lg:w-3/4 w-[95%] sm:mt-14 md:mt-14 h-auto min-h-screen mx-auto pb-5 pl-5 pr-5 pt-3 bg-light dark:bg-dark'
                >
                    {children}
                </main>
            </div>
            <ThemeToggleBtn mounted={mounted} />
        </>
    )
}
