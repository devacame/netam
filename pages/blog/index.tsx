import BlogLayout from '@/components/BlogLayout'
import { gql, useQuery } from '@apollo/client'
import { BlogMeta, PostsQueryData } from '@/lib/types'
import Post from '@/components/Post'

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
        variables: { first: 12 },
    })
    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800 dark:border-white'></div>
            </div>
        )
    }
    if (error) return <p>Error: {error.message}</p>
    const { endCursor, hasNextPage } = data.posts.pageInfo

    return (
        <BlogLayout meta={{ title: 'Blog', description: 'something' }}>
            <h1 className='top-2'>Blog Posts</h1>
            <div className='w-full h-auto mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 content-center items-center gap-2 justify-items-center p-4'>
                {data?.posts.edges.map(({ node }: { node: BlogMeta }) => (
                    <Post key={node.id} post={node} compact={false} />
                ))}
            </div>
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
                                return fetchMoreResult
                            },
                        })
                    }}
                >
                    more
                </button>
            ) : (
                <p className='my-10 text-center font-medium'>
                    마지막 글입니다.
                </p>
            )}
        </BlogLayout>
    )
}
