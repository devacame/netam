import { MetaData } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Post({ post }: { post: MetaData }) {
    return (
        <div className={'mt-3 w-full h-auto shadow-xl p-2'}>
            <Link href={`/blog/${post.id}`} passHref={true}>
                <a className=''>
                    <div className='relative w-full h-[20vh]'>
                        <Image
                            src={
                                process.env.NEXT_PUBLIC_IMAGE_LOADER_URL! +
                                post.coverImage
                            }
                            alt={post.id + ' cover image'}
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                    <div className='p-1'>
                        <p className='text-xs'>{post.date}</p>
                        <h1 className='text-base'>{post.title}</h1>
                        <p className='text-sm'>
                            {post.series} |{' '}
                            {post.description?.slice(0, 47) + '...'}
                        </p>
                        <ul className='flex flex-row list-none gap-x-2 text-purple-400 dark:text-purple-200'>
                            {post
                                .category!.slice(0, 3)
                                .map((category: string) => (
                                    <li key={post.id + category}>
                                        #{category}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </a>
            </Link>
        </div>
    )
}
