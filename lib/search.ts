import Fuse from 'fuse.js'
import { SearchResult } from '@/lib/types'
import postData from '../cache/data'

const options = {
    includeScore: true,
    keys: ['id', 'title', 'description', 'date', 'category', 'series'],
}

const fuse = new Fuse(postData, options)

export default function search(query: string): SearchResult[] {
    const result = fuse.search(query)
    return result.filter((item) => item.score! <= 0.5).map((item) => item.item)
}
