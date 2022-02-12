import Editor from "@/components/Editor"
import { getPost } from "@/lib/PostData"
import { PostData } from "@/lib/types"
import { GetServerSideProps } from "next"

export default function EditPost({ post }: { post: PostData }) {
    return <Editor editorType="edit" post={post} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params!.id!
    if (typeof id === "string" && id) {
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
        redirect: "/admin",
    }
}
