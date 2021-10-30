import { NextApiRequest, NextApiResponse } from 'next'

export interface MetaData {
    title?: string
    description?: string
    image?: string
    date?: Date
    category?: string[]
}

export interface BlogMeta extends MetaData {
    readingTime: number
    id: string
}

export type ApiFunction = (req: NextApiRequest, res: NextApiResponse) => any
