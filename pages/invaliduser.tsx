import Link from 'next/link'
import SEO from '@/components/SEO'
import { MetaData } from '@/lib/types'

export default function InvalidUser() {
    const meta: MetaData = {
        title: 'Invaild User | 허가받지 않은 유저',
    }
    return (
        <div className='h-screen flex flex-col place-content-center items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500'>
            <SEO meta={meta} />
            <h1 className='text-9xl text-black'>Invaild User Error</h1>
            <h2 className='text-5xl text-gray-50 py-3'>
                허가받지 않은 유저입니다.
            </h2>
            <Link href='/'>
                <a className='bg-gray-900 text-gray-200 hover:bg-gray-600 hover:text-gray-200 p-3 rounded-md'>
                    메인 화면으로 돌아가기
                </a>
            </Link>
        </div>
    )
}
