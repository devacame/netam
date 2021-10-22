export default function Post({ post, setSearchTerm }) {
    return (
        <div
            className='mt-3 w-full h-auto shadow-xl p-2'
            onClick={() => setSearchTerm('')}
        >
            <a href={`/blog/${post.slug}`}>
                <p className='text-xs'>{post.date}</p>
                <h1 className='text-base'>{post.title}</h1>
                <p className='text-sm'>{post.description}</p>
                <ul className='flex flex-row list-none gap-x-2 text-purple-200'>
                    {post.category.slice(0, 3).map((category) => (
                        <li key={category + post.slug}>#{category}</li>
                    ))}
                </ul>
            </a>
        </div>
    )
}
