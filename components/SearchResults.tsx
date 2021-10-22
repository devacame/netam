import Post from '@/components/Post'
import {Dispatch, SetStateAction} from 'react'

export default function SearchResults({ results, setSearchTerm }: {results: never[], setSearchTerm:Dispatch<SetStateAction<string>>}) {
    if (results.length === 0) return <></>

    return (
        <div className='absolute top-14 lg:left-5 border-4 border-gray-500 lg:w-max w-auto text-black bg-lightPoint dark:bg-darkPoint dark:text-white rounded-2xl h-72 overflow-y-auto scrollbar-hidden'>
            <div className='p-7'>
                <h2 className='mb-3'>결과 {results.length}개</h2>
                {results.map((result, index) => (
                    <Post
                        key={index}
                        post={result}
                        setSearchTerm={setSearchTerm}
                    />
                ))}
            </div>
        </div>
    )
}
