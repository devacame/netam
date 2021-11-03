import { gql } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import { readdirSync, mkdirSync, writeFile } from 'fs'

export async function getPostsMetaData() {
    const {
        data: { metadatas },
    } = await apolloClient.query({
        query: gql`
            query GetPostMetaData {
                metadatas {
                    id
                    title
                    description
                    date
                    category
                    series
                }
            }
        `,
    })
    return JSON.stringify(metadatas)
}

try {
    readdirSync('cache')
} catch (error) {
    mkdirSync('cache')
}

writeFile('cache/data.js', postData(), (err) => {
    if (err) return console.log(err)
    console.log('Post Meta Data Cached.')
})
