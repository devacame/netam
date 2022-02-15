import Head from 'next/head'
import { useRouter } from 'next/router'
import { SEOData } from '@/lib/types'

interface PageProps {
    meta?: SEOData
    nofollow?: boolean
}

export default function SEO({ meta, nofollow }: PageProps) {
    const router = useRouter()
    if (router.asPath.startsWith('/admin')) {
        return (
            <Head>
                <title>Admin Page</title>
                <meta name='robots' content={'nofollow, noindex'} />
            </Head>
        )
    }
    return (
        <Head>
            <meta
                name='robots'
                content={nofollow ? 'nofollow, noindex' : 'follow, index'}
            />
            <link
                rel='canonical'
                href={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
            />
            <title>{meta?.title}</title>
            <meta content={meta?.description} name='description' />
            <meta
                property='og:url'
                content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
            />
            <meta
                property='og:type'
                content={
                    router.asPath.startsWith('/blog') ? 'article' : 'website'
                }
            />
            <meta property='og:site_name' content='VESOC' />
            <meta property='og:description' content={meta?.description} />
            <meta property='og:locale' content='ko_KR' />
            <meta property='og:title' content={meta?.title} />
            {meta?.coverImage !== undefined && (
                <meta
                    property='og:image'
                    content={`${process.env.NEXT_PUBLIC_BASE_URL}${meta?.coverImage}`}
                />
            )}
            {meta?.date !== undefined && (
                <meta
                    property='article:published_time'
                    content={new Date(meta?.date).toISOString()}
                />
            )}
        </Head>
    )
}
