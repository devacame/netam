import Link from 'next/link'

export default function Error404() {
  return (
    <div className='h-screen flex flex-col place-content-center items-center bg-404'>
      <h1 className='text-9xl text-primary'>404 에러</h1>
      <h2 className='text-5xl text-light py-3'>존재하지 않는 페이지입니다.</h2>
      <Link href='/'>
        <a className='bg-eerie text-darkEerie hover:text-opacity-50 p-3 rounded-sm'>
          메인 화면으로 돌아가기
        </a>
      </Link>
    </div>
  )
}
