import BaseLayout from '@/components/BaseLayout'
import { gql, useQuery } from '@apollo/client'
import { BlogMeta, PostsQueryData } from '@/lib/types'

const PostsQuery = gql`
    query Post($first: Int!, $after: String) {
        posts(first: $first, after: $after) {
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
                    coverImage
                    date
                    category
                    readingTime
                    series
                }
            }
        }
    }
`
export default function BlogPage() {
    const { data, loading, error, fetchMore } = useQuery(PostsQuery, {
        variables: { first: 4 },
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    console.log(data.posts.edges)
    const { endCursor, hasNextPage } = data.posts.pageInfo

    return (
        <BaseLayout meta={{ title: 'Blog', description: 'something' }}>
            <h1 className='absolute top-2'>Blog Posts</h1>
            {data?.posts.edges.map(({ node }: { node: BlogMeta }) => (
                <div key={node.id}>{node.id}</div>
            ))}
            {hasNextPage ? (
                <button
                    className='px-4 py-2 bg-blue-500 text-white rounded my-10'
                    onClick={() => {
                        fetchMore({
                            variables: { after: endCursor },
                            updateQuery: (
                                prevResult: PostsQueryData,
                                {
                                    fetchMoreResult,
                                }: {
                                    fetchMoreResult: PostsQueryData
                                }
                            ) => {
                                fetchMoreResult.posts.edges = [
                                    ...prevResult.posts.edges,
                                    ...fetchMoreResult.posts?.edges,
                                ]
                                console.log(fetchMoreResult.posts.edges)
                                return fetchMoreResult
                            },
                        })
                    }}
                >
                    more
                </button>
            ) : (
                <p className='my-10 text-center font-medium'>
                    You have reached the end!{' '}
                </p>
            )}
        </BaseLayout>
    )
}
