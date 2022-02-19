import BlogLayout from '@/components/BlogLayout'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import MDXRemote from '@/components/MDXRemote'
import ToC from '@/components/ToC'
import { useEffect, useState } from 'react'
import { BlogMeta, SEOData } from '@/lib/types'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPaths, getPost } from '@/lib/PostData'
import { postContent } from '@/lib/markdown'
import { useSession } from 'next-auth/react'
import { FiEdit3 } from 'react-icons/fi'
import Utterances from '@/components/Utterances'
import Link from 'next/link'

interface PageProps {
    metadata: BlogMeta
    content: MDXRemoteSerializeResult<Record<string, unknown>>
}

export default function Post({ metadata, content }: PageProps) {
    const { status } = useSession()
    const [renderToC, setRenderToC] = useState(false)
    useEffect(() => {
        setRenderToC(true)
    }, [])
    const meta: SEOData = {
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        coverImage: metadata.coverImage,
    }
    return (
        <BlogLayout meta={meta}>
            <h1>{metadata.title}</h1>
            <div className='flex flex-row gap-x-3'>
                <p className='text-center text-indigo-200'>
                    {metadata.date} | {metadata.readingTime}분
                </p>
                {status === 'authenticated' && (
                    <Link href={'/admin/edit/' + metadata.id} passHref>
                        <a>
                            <FiEdit3 />
                        </a>
                    </Link>
                )}
            </div>
            {renderToC && <ToC />}
            <article>
                <MDXRemote content={content} />
            </article>

            <Utterances />
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
    return {
        props: {
            metadata: postData.metadatas,
            content: serializedContent,
        },
        revalidate: 7 * 24 * 60 * 60,
    }
}
