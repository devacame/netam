import BlogLayout from '@/components/BlogLayout'
import Post from '@/components/Post'
import postData from 'cache/data'
import { SEOData } from '@/lib/types'

export default function BlogPage() {
    const meta: SEOData = {
        title: 'Blog Index',
        description: 'Index page for blogs | 블로그 인덱스 페이지',
        date: '2022-01-01',
        coverImage: '/icons/LOGO.png',
    }
    return (
        <BlogLayout meta={meta}>
            <h1 className='top-2'>Blog Posts</h1>
            <div className='w-full h-auto mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 content-center items-center gap-2 justify-items-center p-4'>
                {postData.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </BlogLayout>
    )
}
