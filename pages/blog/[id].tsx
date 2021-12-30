import BlogLayout from '@/components/BlogLayout'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { components } from '@/components/MDXComponents'
import ToC from '@/components/ToC'
import { useEffect, useState } from 'react'
import { BlogMeta } from '@/lib/types'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPaths, getPost } from '@/lib/PostData'
import { postContent } from '@/lib/markdown'
import { useSession } from 'next-auth/react'
import { FiEdit3 } from 'react-icons/fi'
import Link from 'next/link'
interface PageProps {
    meta: BlogMeta
    content: MDXRemoteSerializeResult<Record<string, unknown>>
}

export default function Post({ meta, content }: PageProps) {
    const { data: session, status } = useSession()
    const [renderToC, setRenderToC] = useState(false)
    useEffect(() => {
        setRenderToC(true)
    }, [])
    return (
        <BlogLayout meta={meta}>
            <h1>{meta.title}</h1>
            <div className='flex flex-row gap-x-3'>
                <p className='text-center text-indigo-200'>
                    {meta.date} | {meta.readingTime}분
                </p>
                {status === 'authenticated' && (
                    <Link href={'/admin/edit/' + meta.id} passHref>
                        <FiEdit3 />
                    </Link>
                )}
            </div>
            {renderToC && <ToC />}
            <MDXRemote {...content} components={components} />
        </BlogLayout>
    )
}
interface Paths {
    params: {
        id: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: Paths[] = await getPaths('id')
    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (typeof params!.id !== 'string') {
        return { notFound: true }
    }
    const postData = await getPost(params!.id)
    const { serializedContent } = await postContent(postData.content)
    if (postData.metadatas?.published === false) {
        return { notFound: true }
    }
    return {
        props: {
            meta: postData.metadatas,
            content: serializedContent,
        },
        revalidate: 7 * 24 * 60 * 60,
    }
}
