import AdminPost from '@/components/AdminPost'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import useAdminPostQuery from '@/lib/swr'

export default function AdminPage() {
    const { data, hasNextPage, size, setSize } = useAdminPostQuery()
    return (
        <AdminLayout>
            <h1 className='top-2 text-3xl text-emerald-300'>Admin Dashboard</h1>
            <Link href='/admin/create'>
                <a className='absolute top-5 md:mt-14 sm:mt-14 right-10 bg-green-500 p-1 rounded-md'>
                    +
                </a>
            </Link>
            <div className='w-full h-auto mx-auto flex flex-col content-center items-center gap-2 justify-items-center p-4'>
                {data &&
                    data.map((post) => (
                        <AdminPost key={post.id} postData={post} />
                    ))}
                {hasNextPage && (
                    <button onClick={() => setSize(size + 1)}>
                        Load More...
                    </button>
                )}
            </div>
        </AdminLayout>
    )
}
