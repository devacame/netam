import { NextApiRequest, NextApiResponse } from 'next'

export interface MetaData {
    id: string
    title: string
    description: string
    date: string
    category: string[]
    series: string
    coverImage: string
}

export interface BlogMeta extends MetaData {
    readingTime: number
}

export interface AdminPostData extends MetaData {
    id: string
    published: boolean
}

export type ApiFunction = (req: NextApiRequest, res: NextApiResponse) => any

export interface PostData {
    id: string
    title: string
    description: string
    date: string
    category: string[]
    series: string
    coverImage: string
    content: string
    readingTime: number
    published: boolean
}

export interface SearchResult {
    id: string
    title: string
    description: string
    date: string
    category: string[]
    series: string
}

export interface PostsQueryData {
    data: {
        data: {
            posts: {
                pageInfo: {
                    endCursor: string
                    hasNextPage: boolean
                }
                edges: {
                    cursor: string
                    node: BlogMeta
                }[]
            }
        }
    }
}
