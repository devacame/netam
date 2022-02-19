import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import generateCacheNFeeds from '@/lib/site-data'

export default async function UpdatePostCache(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const secret = process.env.JWT_SECRET!
    const token = await getToken({ req, secret })
    if (token) {
        generateCacheNFeeds()
        res.redirect('/admin')
    } else {
        res.status(401).redirect('/')
    }
    res.end()
}
