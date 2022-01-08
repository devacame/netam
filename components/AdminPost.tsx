import Image from 'next/image'
import { MetaData } from '@/lib/types'
import { togglePublishState } from '@/lib/PostData'

interface Props extends MetaData {
    id: string
    published: boolean
}

export default function AdminPost({
    published,
    id,
    title,
    coverImage,
    date,
    category,
    description,
    series,
}: Props) {
    return (
        <div className='flex flex-row gap-x-2 w-full h-1/5'>
            <div className='relative w-full h-[90%]'>
                <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_LOADER_URL! + coverImage}
                    alt={title + ' cover image'}
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            <div className='p-1'>
                <p className='text-xs'>{date}</p>
                <h1 className='text-base'>{title}</h1>
                <p className='text-sm'>
                    {description} | {series}
                </p>
                <ul className='flex flex-row list-none gap-x-2 text-purple-400 dark:text-purple-200'>
                    {category!.slice(0, 3).map((category: string) => (
                        <li key={id + category}>#{category}</li>
                    ))}
                </ul>
            </div>
            // https://codepen.io/lhermann/pen/EBGZRZ - toggle button style
            <div className='flex items-center justify-center w-full mb-12'>
                <label
                    htmlFor='publishToggle'
                    className='flex items-center cursor-pointer'
                >
                    <div className='ml-3 text-gray-700 font-medium'>
                        Publish
                    </div>
                    <div className='relative'>
                        <input
                            type='checkbox'
                            id='publishToggle'
                            className='sr-only'
                            checked={published}
                            onChange={(e) => {
                                e.preventDefault()
                                togglePublishState(id, !published)
                                published = !published
                            }}
                        />
                        <div className='block bg-gray-600 w-14 h-8 rounded-full'></div>
                        <div className='dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition'></div>
                    </div>
                </label>
            </div>
        </div>
    )
}
