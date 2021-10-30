import { gql } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkPrism from 'remark-prism'
import remarkUnwrapImages from 'remark-unwrap-images'

export async function getPaths() {
    const {
        data: { metadatas: ids },
    } = await apolloClient.query({
        query: gql`
            query GetPostMetaData {
                metadatas {
                    id
                }
            }
        `,
    })
    const paths = ids.map((id) => ({
        params: {
            id: id.id,
        },
    }))
    return paths
}

export async function getPost(id) {
    const {
        data: {
            post: { content, ...metadatas },
        },
    } = await apolloClient.query({
        query: gql`
            query GetPublishedPost($postId: String!, filter: {published: true}) {
                post(id: $postId) {
                    id
                    title
                    date
                    description
                    coverImage
                    category
                    series
                    readingTime
                    content
                }
            }
        `,
        variables: { 'postId': id },
    })
    const serializedContent = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm,
                remarkMath,
                remarkPrism,
                remarkUnwrapImages,
            ],
            rehypePlugins: [rehypeKatex],
        },
    })
    return {
        meta: metadatas,
        serializedContent,
    }
}
