import useSWRInfinite from 'swr/infinite'
import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import { BlogMeta, PostsQueryData } from '@/lib/types'

const fetcher = async (query: DocumentNode, ...variableArr: []) => {
    const variables = {}
    for (let i = 0; i < variableArr.length; i += 2) {
        variables[variableArr[i]] = variableArr[i + 1]
    }
    const data: ApolloQueryResult<PostsQueryData> = await apolloClient.query({
        query,
        variables,
    })
    return { data }
}

const query = gql`
    query Post($first: Int!, $after: String, $all: Boolean!) {
        posts(first: $first, after: $after, all: $all) {
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                cursor
                node {
                    id
                    title
                    description
                    date
                    category
                    series
                    coverImage
                    readingTime
                    published
                }
            }
        }
    }
`

const getkeyPage = (pageIndex: any, previousPageData: PostsQueryData) => {
    if (
        previousPageData &&
        !previousPageData.data.data.posts.pageInfo.hasNextPage
    ) {
        return null
    }
    if (pageIndex === 0) return [query, 'first', 5, 'all', false]

    const { endCursor } = previousPageData.data.data.posts.pageInfo

    return [query, 'first', 5, 'after', endCursor, 'all', false]
}

const getkeyAdmin = (pageIndex: any, previousPageData: PostsQueryData) => {
    if (
        previousPageData &&
        !previousPageData.data.data.posts.pageInfo.hasNextPage
    ) {
        return null
    }
    if (pageIndex === 0) return [query, 'first', 5, 'all', true]

    const { endCursor } = previousPageData.data.data.posts.pageInfo

    return [query, 'first', 5, 'after', endCursor, 'all', true]
}

const extractData = (
    data:
        | {
              data: any
          }[]
        | undefined
) => {
    const mergeData = data?.flatMap((d) => {
        return d.data.data.posts.edges.flatMap(
            (e: { cursor: string; node: BlogMeta }) => e.node
        )
    })
    const hasNextPage: boolean =
        data?.at(-1)?.data.data.posts.pageInfo.hasNextPage

    return {
        data: mergeData,
        hasNextPage: hasNextPage,
    }
}

export default function usePostQuery() {
    const { data, size, setSize, error } = useSWRInfinite(getkeyPage, fetcher)
    const baseResult = extractData(data)
    return {
        ...baseResult,
        isLoading: !error && !data,
        isError: error,
        size: size,
        setSize: setSize,
    }
}

export function useAdminPostQuery() {
    const { data, size, setSize, error } = useSWRInfinite(getkeyAdmin, fetcher)
    const baseResult = extractData(data)
    return {
        ...baseResult,
        isLoading: !error && !data,
        isError: error,
        size: size,
        setSize: setSize,
    }
}
