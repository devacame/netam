import { GetStaticProps } from 'next'
import generateCacheNFeeds from '@/lib/site-data'
import Link from 'next/link'

export default function Index() {
    return (
        <div className='w-screen h-screen flex flex-col bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600'>
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
