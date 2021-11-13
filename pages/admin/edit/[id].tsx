import Editor from '@/components/Editor'
import { getPost } from '@/lib/PostData'
import { PostFormData } from '@/lib/types'

export default function EditPost({ post }: { post: PostFormData }) {
    return <Editor editorType='edit' post={post} />
}

export async function getServerSideProps({ params }: any) {
    const { content, metadatas } = await getPost(params.id)
    let post = { content, ...metadatas }
    return {
        props: {
            post,
        },
    }
}
