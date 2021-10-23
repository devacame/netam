import Link from 'next/link'
import SEO from '@/components/SEO'
import { MetaData } from '@/lib/types'

export default function Error500() {
    const meta: MetaData = {
        title: '500 Error | 500 에러',
    }
    return (
        <div>
            <SEO meta={meta} />
            <div className='h-screen flex flex-col place-content-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>
                <h1 className='text-9xl text-bluePrime'>500 에러</h1>
                <h2 className='text-5xl text-gray-50 py-3'>
                    존재하지 않는 페이지입니다.
                </h2>
                <Link href='/'>
                    <a className='bg-gray-50 text-gray-800 hover:text-gray-400 p-3 rounded-md'>
                        메인 화면으로 돌아가기
                    </a>
                </Link>
            </div>
        </div>
    )
}
