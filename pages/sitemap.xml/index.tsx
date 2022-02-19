import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getPaths } from '@/lib/PostData'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const siteURL = process.env.NEXT_PUBLIC_BASE_URL
    const postPaths = await getPaths('id')
    const postURLs = postPaths.map(
        (postPath) => `${siteURL}/blog/${postPath.params.id}`
    )
    const seriesPaths = await getPaths('series')
    const seriesURLs = seriesPaths.map(
        (seriesPath) => `${siteURL}/blog/series/${seriesPath.params.series}`
    )
    const sitePaths = [
        '/',
        '/blog',
        '/404',
        '/500',
        '/invaliduser',
        '/feeds',
        '/feeds/feed.xml',
        '/feeds/feed.json',
        '/feeds/atom.xml',
    ].map((path) => `${siteURL}${path}`)
    const fields = [...sitePaths, ...postURLs, ...seriesURLs]

    return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {}
