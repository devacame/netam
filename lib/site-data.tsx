// https://www.daan.fyi/writings/rss for Feed Generation Code

import { Feed, Item } from 'feed'
import { mkdirSync, writeFileSync, readdirSync } from 'fs'
import ReactDOMServer from 'react-dom/server'
import { stripHtml } from 'string-strip-html'
import { getPaths, getPost } from '@/lib/PostData'
import { postContent } from '@/lib/markdown'
import MDXRemote from '@/components/MDXRemote'
import { BlogMeta, PostData } from '@/lib/types'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const buildFeed = (): Feed => {
    return new Feed({
        title: 'VESOC 블로그',
        description: 'VESOC 블로그의 RSS 피드',
        id: 'https://www.vesoc.dev/',
        link: 'https://www.vesoc.dev/',
        language: 'ko',
        image: `${baseUrl}/icons/LOGO.png`,
        favicon: `${baseUrl}/icons/favicon.ico`,
        copyright: `Copyright © ${new Date().getFullYear()} VESOC`,
        generator: 'NextJS + feed package',
        feedLinks: {
            json: `${baseUrl}/feeds/feed.json`,
            atom: `${baseUrl}/feeds/atom.xml`,
            rss2: `${baseUrl}/feeds/feed.xml`,
        },
        author: {
            name: 'VESOC',
            email: 'contact@vesoc.dev',
            link: 'https://www.vesoc.dev',
        },
    })
}

const makeItem = async (post: Partial<PostData>): Promise<Item> => {
    const url = `${baseUrl}/writings/${post.id}`
    const { serializedContent } = await postContent(post.content)
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <MDXRemote content={serializedContent} />
    )
        .replace(/href="\/#/g, `href="${url}#`)
        .replace(/href="\//g, `href="${baseUrl}/`)
        .replace(/src="\//g, `src="${baseUrl}/`)
    const cleanHtmlContent = stripHtml(htmlContent, {
        onlyStripTags: ['script', 'style'],
        stripTogetherWithTheirContents: ['script', 'style'],
    }).result
    return {
        title: post.title!,
        link: url,
        id: url,
        date: new Date(post.date!),
        description: post.description,
        content: cleanHtmlContent,
    }
}

export const generateMainFeeds = async (
    contents: string[],
    metadatas: BlogMeta[]
): Promise<void> => {
    const feed = buildFeed()
    for (let i = 0; i < contents.length; i++) {
        feed.addItem(await makeItem({ ...metadatas[i], content: contents[i] }))
    }
    mkdirSync('./public/feeds/', { recursive: true })
    writeFileSync('./public/feeds/feed.xml', feed.rss2())
    writeFileSync('./public/feeds/feed.json', feed.json1())
    writeFileSync('./public/feeds/atom.xml', feed.atom1())
}

const generateCache = async (metadata: BlogMeta[]): Promise<void> => {
    try {
        readdirSync('cache')
    } catch (error) {
        mkdirSync('cache')
    }
    const dataString =
        'const postData = [' +
        metadata.map((post) => JSON.stringify(post)).join(', ') +
        ']\nexport default postData'
    writeFileSync('./cache/data.js', dataString)
}

export const generateCacheNFeeds = async (): Promise<void> => {
    const postPaths = await getPaths('id')
    let contents: string[] = [],
        metadatas: BlogMeta[] = []
    for (const postPath of postPaths) {
        // for (let i = 0; i < postPaths.length; i++) {
        const { content, metadatas: metadata } = await getPost(
            postPath.params.id
        )
        contents.push(content)
        metadatas.push(metadata)
    }
    try {
        await generateCache(metadatas)
        await generateMainFeeds(contents, metadatas)
    } catch (e) {
        console.log(e)
    }
}

export default generateCacheNFeeds
