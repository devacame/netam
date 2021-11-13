import { gql } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import type { PostFormData } from '@/lib/types'

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
    const paths = ids.map((id: { id: string }) => ({
        params: {
            id: id.id,
        },
    }))
    return paths
}

export async function getPost(
    id: string
): Promise<{ content: string; metadatas: Partial<PostFormData> }> {
    const {
        data: {
            post: { content, ...metadatas },
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
    return { content, metadatas }
}

export async function createPost(postData: PostFormData) {
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
            variables: postData,
        })
        .catch((e) => {
            console.error(e)
        })
}

export async function updatePost(postData: PostFormData) {
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
            variables: postData,
        })
        .catch((e) => {
            console.error(e)
        })
}
