import { readdirSync, mkdirSync, writeFile } from 'fs'
import fetch from 'node-fetch'

async function cachePostsMetaData() {
    const endpoint = `${process.env.API_URL}/api/graphql`
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
    const data = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((json) => {
            return json.data.metadatas
        })
    const dataString =
        'const postData = [' +
        data.map((post) => JSON.stringify(post)).join(', ') +
        ']\nexport default postData'
    console.log(dataString)
    await writeFile('cache/data.js', dataString, (err) => console.log(err))
}

cachePostsMetaData()
