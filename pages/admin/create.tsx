import Editor from '@/components/Editor'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export default function Create() {
    return <Editor editorType='new' />
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (process.env.NODE_ENV === 'development') {
        return {
            props: {
                session: true,
            },
        }
    }
    const session = await getSession(context)
    if (session === null) {
        return {
            redirect: {
                destination: '/invaliduser',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}
