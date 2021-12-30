import Editor from '@/components/Editor'
import { getPost } from '@/lib/PostData'
import { PostFormData } from '@/lib/types'
import { GetServerSideProps } from 'next'

export default function EditPost({ post }: { post: PostFormData }) {
    return <Editor editorType='edit' post={post} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params!.id!
    if (typeof id === 'string' && id) {
        const { content, metadatas } = await getPost(id)
        let post = { content, ...metadatas }
        return {
            props: {
                post,
            },
        }
    }
    return {
        props: {},
        redirect: '/admin',
    }
}
