export interface MetaData {
    title?: string,
    description?: string,
    image?: string,
    date?: Date,
    category?: string[]
}

export interface BlogMeta extends MetaData{
    readingTime: number,
    slug: string
}