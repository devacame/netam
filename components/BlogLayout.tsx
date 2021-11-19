import SEO from '@/components/SEO'
import Nav from '@/components/Nav'
import ThemeToggleBtn from '@/components/ThemeToggleBtn'
import { useState, useEffect, ReactNode } from 'react'
import { BlogMeta } from '@/lib/types'

interface PageProps {
    children: ReactNode
    meta: BlogMeta
}

export default function BlogLayout({ children, meta }: PageProps) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <>
            <SEO meta={meta} />
            <div className='flex flex-row'>
                <Nav />
                <main
                    id='skip'
                    className='flex flex-col justify-center items-center lg:w-3/4 w-[95%] h-auto min-h-screen mx-auto pb-5 pl-5 pr-5 pt-3 bg-light dark:bg-dark'
                >
                    {children}
                </main>
            </div>
            <ThemeToggleBtn mounted={mounted} />
        </>
    )
}
