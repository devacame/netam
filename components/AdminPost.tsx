import Image from 'next/image'
import { AdminPostData } from '@/lib/types'
import { togglePublishState } from '@/lib/PostData'

export default function AdminPost({ postData }: { postData: AdminPostData }) {
    let published = postData.published
    return (
        <div className='flex flex-row gap-x-2 w-full h-1/5 outline outline-offset-1 outline-2 outline-slate-300 rounded-md p-1'>
            <div className='relative w-1/5 h-[90%]'>
                <Image
                    src={
                        process.env.NEXT_PUBLIC_IMAGE_LOADER_URL! +
                        postData.coverImage
                    }
                    alt={postData.title + ' cover image'}
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            <div className='p-1 w-4/5'>
                <p className='text-xs'>{postData.date}</p>
                <h1 className='text-xl'>{postData.title}</h1>
                <p className='text-sm'>{postData.series}</p>
                <ul className='flex flex-row list-none gap-x-2 text-purple-400 dark:text-purple-200'>
                    {postData.category!.slice(0, 3).map((category: string) => (
                        <li key={postData.id + category}>#{category}</li>
                    ))}
                </ul>
            </div>
            {/* https://codepen.io/lhermann/pen/EBGZRZ - toggle button style */}
            <div className='flex flex-col items-center justify-center w-full mb-12'>
                <label
                    htmlFor='publishToggle'
                    className='flex items-center cursor-pointer'
                >
                    <div className='ml-3 text-gray-700 font-medium'>
                        Publish
                    </div>
                </label>
                <div className='relative'>
                    <input
                        type='checkbox'
                        id='publishToggle'
                        className='sr-only'
                        checked={published}
                        onChange={(e) => {
                            e.preventDefault()
                            togglePublishState(postData.id, !published)
                            published = !published
                        }}
                    />
                    <div className='block bg-gray-600 w-14 h-8 rounded-full'></div>
                    <div className='dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition'></div>
                </div>
            </div>
        </div>
    )
}
