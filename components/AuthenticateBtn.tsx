import { signIn, signOut, useSession } from 'next-auth/react'
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi'

export default function AuthenticateBtn() {
    const { status } = useSession()
    return (
        <>
            {status === 'unauthenticated' && (
                <button className='w-6 h-6' onClick={() => signIn('github')}>
                    <HiOutlineLockOpen className='w-full h-full' />
                    <p className='sr-only'>Auth</p>
                </button>
            )}
            {status === 'authenticated' && (
                <button
                    className='w-6 h-6'
                    onClick={() =>
                        signOut({
                            callbackUrl: '/',
                        })
                    }
                >
                    <HiOutlineLockClosed className='w-full h-full' />
                    <p className='sr-only'>Auth</p>
                </button>
            )}
        </>
    )
}
