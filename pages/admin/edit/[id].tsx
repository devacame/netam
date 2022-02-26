import Editor from '@/components/Editor'
import { getPost } from '@/lib/PostData'
import { PostData } from '@/lib/types'
import { GetServerSideProps } from 'next'
import Script from 'next/script'

export default function EditPost({ post }: { post: PostData }) {
    return (
        <div>
            <Script
                src='https://upload-widget.cloudinary.com/global/all.js'
                strategy='afterInteractive'
            />
            <Editor editorType='edit' post={post} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params!.id!
    if (typeof id === 'string' && id) {
        const { content, metadatas } = await getPost(id)
        return {
            props: {
                post: {
                    ...metadatas,
                    content,
                },
            },
        }
    }
    return {
        props: {},
        redirect: '/admin',
    }
}
