import { GetStaticProps } from 'next'
import generateCacheNFeeds from '@/lib/site-data'
import Link from 'next/link'
import SEO from '@/components/SEO'
import { SEOData } from '@/lib/types'

export default function Index() {
    const meta: SEOData = {
        title: 'Feeds',
        description: 'Feed Page including XML, JSON, and Atom',
        date: '2022-01-01',
        coverImage: 'icons/LOGO.png',
    }
    return (
        <div className='w-screen h-screen flex flex-col bg-gray-100 dark:bg-darkBody'>
            <SEO meta={meta} />
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Link href='/feeds/feed.xml' passHref>
                    <a className='text-3xl text-sky-100'>Feed XML</a>
                </Link>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Link href='/feeds/feed.json' passHref>
                    <a className='text-3xl text-sky-100'>Feed JSON</a>
                </Link>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Link href='/feeds/atom.xml' passHref>
                    <a className='text-3xl text-sky-100'>Atom</a>
                </Link>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    generateCacheNFeeds()
    return {
        props: {},
        revalidate: 7 * 24 * 60 * 60,
    }
}
