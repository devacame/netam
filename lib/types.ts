import { NextApiRequest, NextApiResponse } from 'next'

export interface MetaData {
    title?: string
    description?: string
    image?: string
    date?: Date
    series?: string
    category?: string[]
}

export interface BlogMeta extends MetaData {
    readingTime: number
    id: string
}

export type ApiFunction = (req: NextApiRequest, res: NextApiResponse) => any

export interface PostFormData {
    id: string
    title: string
    description: string
    coverImage: string
    category: string[]
    date: string
    series: string
    readingTime: number
    content: string
    published: boolean
}

export interface searchResult {
    id: string
    title: string
    description: string
    date: string
    category: string[]
    series: string
}
