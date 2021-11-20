import { gql } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import type { PostFormData } from '@/lib/types'

export async function getPaths(attr: string) {
    const {
        data: { metadatas: pathData },
    } = await apolloClient.query({
        query: gql`
            query GetPostMetaData {
                metadatas {
                    ${attr === 'id' ? 'id' : 'series'}
                }
            }
        `,
    })
    let paths: any[] = []
    if (attr === 'id') {
        paths = pathData.map((id: { id: string }) => ({
            params: {
                id: id.id,
            },
        }))
    } else if (attr === 'series') {
        paths = pathData.map((series: { series: string }) => ({
            params: {
                series: series.series,
            },
        }))
        paths = paths
            .slice()
            .reverse()
            .filter(
                (v, i, a) =>
                    a.findIndex((t) => t.params.series === v.params.series) ===
                    i
            )
            .reverse()
    }
    return paths
}

export async function getPost(
    id: string
): Promise<{ content: string; metadatas: Partial<PostFormData> }> {
    const {
        data: {
            post: { content: encodedContent, ...metadatas },
        },
    } = await apolloClient.query({
        query: gql`
            query GetPublishedPost($postId: String!) {
                post(id: $postId) {
                    id
                    title
                    date
                    description
                    category
                    series
                    coverImage
                    readingTime
                    content
                    published
                }
            }
        `,
        variables: { postId: id },
    })
    const contentBuff = Buffer.from(encodedContent, 'base64')
    const content = contentBuff.toString('utf-8')
    return { content, metadatas }
}

export async function createPost(postData: PostFormData) {
    const contentBuff = Buffer.from(postData.content, 'utf-8')
    const encodedContent = contentBuff.toString('base64')
    apolloClient
        .mutate({
            mutation: gql`
                mutation Mutation(
                    $id: String!
                    $title: String!
                    $description: String!
                    $coverImage: String!
                    $category: [String]!
                    $series: String!
                    $date: String!
                    $readingTime: Int!
                    $content: String!
                    $published: Boolean!
                ) {
                    createPost(
                        id: $id
                        title: $title
                        description: $description
                        coverImage: $coverImage
                        category: $category
                        series: $series
                        date: $date
                        readingTime: $readingTime
                        content: $content
                        published: $published
                    ) {
                        id
                        title
                        description
                        coverImage
                        date
                        category
                        content
                        readingTime
                        series
                        published
                    }
                }
            `,
            variables: { ...postData, content: encodedContent },
        })
        .catch((e) => {
            console.error(e)
        })
}

export async function updatePost(postData: PostFormData) {
    const contentBuff = Buffer.from(postData.content, 'utf-8')
    const encodedContent = contentBuff.toString('base64')
    apolloClient
        .mutate({
            mutation: gql`
                mutation Mutation(
                    $id: String!
                    $title: String!
                    $description: String!
                    $coverImage: String!
                    $category: [String]!
                    $series: String!
                    $date: String!
                    $readingTime: Int!
                    $content: String!
                    $published: Boolean!
                ) {
                    updatePost(
                        id: $id
                        title: $title
                        description: $description
                        coverImage: $coverImage
                        category: $category
                        series: $series
                        date: $date
                        readingTime: $readingTime
                        content: $content
                        published: $published
                    ) {
                        id
                        title
                        description
                        coverImage
                        date
                        category
                        content
                        readingTime
                        series
                        published
                    }
                }
            `,
            variables: { ...postData, content: encodedContent },
        })
        .catch((e) => {
            console.error(e)
        })
}
