import Link from 'next/link'
import SEO from '@/components/SEO'
import { SEOData } from '@/lib/types'

export default function Error404() {
    const meta: SEOData = {
        title: '404 Error | 404 에러',
        description: 'User related 404 error | 사용자 관련 404 에러',
        date: '2022-01-01',
        coverImage: '/icons/LOGO.png',
    }
    return (
        <div>
            <SEO meta={meta} />
            <div className='h-screen flex flex-col place-content-center items-center bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100'>
                <h1 className='text-9xl text-bluePrime'>404 에러</h1>
                <h2 className='text-5xl text-gray-50 py-3'>
                    존재하지 않는 페이지입니다.
                </h2>
                <Link href='/'>
                    <a className='bg-gray-900 text-gray-200 hover:bg-gray-600 hover:text-gray-200 p-3 rounded-md'>
                        메인 화면으로 돌아가기
                    </a>
                </Link>
            </div>
        </div>
    )
}
