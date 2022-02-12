import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import cachePostMetaData from '@/scripts/cache.mjs'

export default async function UpdatePostCache(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const secret = process.env.JWT_SECRET!
    const token = await getToken({ req, secret })
    if (token) {
        cachePostMetaData()
        res.redirect('/admin')
    } else {
        res.status(401).redirect('/')
    }
    res.end()
}
