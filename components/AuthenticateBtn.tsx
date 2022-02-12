import { signIn, signOut, useSession } from 'next-auth/react'
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi'

export default function AuthenticateBtn() {
    const { status } = useSession()
    return (
        <>
            {status === 'unauthenticated' && (
                <button
                    className='w-6 h-6'
                    onClick={() =>
                        signIn('github', {
                            callbackUrl: `${process.env.BASE_URL}/admin`,
                        })
                    }
                >
                    <HiOutlineLockOpen className='w-full h-full' />
                </button>
            )}
            {status === 'authenticated' && (
                <button
                    className='w-6 h-6'
                    onClick={() =>
                        signOut({ callbackUrl: `${process.env.BASE_URL}/` })
                    }
                >
                    <HiOutlineLockClosed className='w-full h-full' />
                </button>
            )}
        </>
    )
}
