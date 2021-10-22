import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getPosts } from '@/lib/markdown'

async function Search(req, res) {
    let posts

    if (process.env.NODE_ENV === 'production') {
        posts = require('@/cache/data').posts
    } else {
        let paths = await getPosts()

        posts = paths.map((path) => {
            const file = readFileSync(join('posts', path + '.mdx'), 'utf-8')

            const { data, content } = matter(file)

            return {
                data,
                content,
            }
        })
    }

    const results = posts
        .filter(
            ({ data: { title, description, category }, content }) =>
                title.toLowerCase().indexOf(req.query.q) != -1 ||
                description.toLowerCase().indexOf(req.query.q) != -1 ||
                category.includes(req.query.q) ||
                content.toLowerCase().indexOf(req.query.q) != -1
        )
        .map(({ data }) => data)
        .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
    res.status(200).json(JSON.stringify({ results }))
}

export default Search
