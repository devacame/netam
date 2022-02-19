import { SearchResult } from '@/lib/types'
import Link from 'next/link'

function SearchResult({ result }: { result: SearchResult }) {
    return (
        <div className='p-2 border-2 w-full'>
            <Link href={`/blog/${result.id}`} passHref={true}>
                <a className=''>
                    <div className='p-1'>
                        <p className='text-xs'>{result.date}</p>
                        <h1 className='text-base'>{result.title}</h1>
                        <p className='text-sm'>{result.description}</p>
                        <ul className='flex flex-row list-none gap-x-2 text-purple-400 dark:text-purple-200'>
                            {result
                                .category!.slice(0, 3)
                                .map((category: string) => (
                                    <li key={result.id + category}>
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

export default function SearchResults({
    results,
}: {
    results: SearchResult[]
}) {
    if (results.length === 0) return <></>

    return (
        <div className='absolute top-14 lg:left-5 border-4 border-gray-500 lg:w-max w-auto text-black bg-lightPoint dark:bg-darkPoint dark:text-white rounded-2xl h-72 overflow-y-auto scrollbar-hidden'>
            <div className='p-7'>
                <h2 className='mb-3'>결과 {results.length}개</h2>
                {results.map((result, index) => (
                    <SearchResult key={index} result={result} />
                ))}
            </div>
        </div>
    )
}
