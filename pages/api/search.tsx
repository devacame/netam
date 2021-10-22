import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getPosts } from '@/lib/markdown'
import type { NextApiRequest, NextApiResponse } from 'next'
import {MetaData} from '@/lib/types'

async function Search(req: NextApiRequest, res: NextApiResponse) {
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

    let results: string[]
    if (typeof req.query.q === 'string') {
        const query: string = req.query.q
        results = posts
            .filter(
                ({ data: { title, description, category }, content }: { data: MetaData, content: string}) =>
                    title!.toLowerCase().indexOf(query) != -1 ||
                    description!.toLowerCase().indexOf(query) != -1 ||
                    category!.includes(query) ||
                    content.toLowerCase().indexOf(query) != -1
            )
            .map(({ data }: {data: MetaData}) => data)
            .sort((a: MetaData, b: MetaData) => {
                return new Date(b.date) - new Date(a.date)
            })
    } else {
        results = []
    }
    res.status(200).json(JSON.stringify({ results }))
}

export default Search
