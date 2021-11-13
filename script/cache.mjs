import { readdirSync, mkdirSync, writeFile } from 'fs'
import fetch from 'node-fetch'

async function cachePostsMetaData() {
    const endpoint = `http://localhost:3000/api/graphql`
    const query = `
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
    `
    try {
        readdirSync('cache')
    } catch (error) {
        mkdirSync('cache')
    }
    await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((json) => {
            writeFile(
                'cache/data.js',
                JSON.stringify(json.data, (err) => {
                    if (err) throw err
                    console.log('Post Meta Data Cached.')
                })
            )
        })
        .catch((err) => console.log(err))
}

cachePostsMetaData()
