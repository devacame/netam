import BlogLayout from '@/components/BlogLayout'
import Post from '@/components/Post'
import { SEOData } from '@/lib/types'
import usePostQuery from '@/lib/swr'

export default function BlogPage() {
    const meta: SEOData = {
        title: 'Blog Index',
        description: 'Index page for blogs | 블로그 인덱스 페이지',
        date: '2022-01-01',
        coverImage: '/icons/LOGO.png',
    }
    const { data, hasNextPage, size, setSize } = usePostQuery()
    return (
        <BlogLayout meta={meta}>
            <h1 className='top-2'>Blog Posts</h1>
            <div className='w-full h-auto mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 content-center items-center gap-2 justify-items-center p-4'>
                {data && data.map((post) => <Post key={post.id} post={post} />)}
                {hasNextPage && (
                    <button onClick={() => setSize(size + 1)}>
                        Load More...
                    </button>
                )}
            </div>
        </BlogLayout>
    )
}
