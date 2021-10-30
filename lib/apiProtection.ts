import { NextApiRequest, NextApiResponse } from 'next'
import { ApiFunction } from '@/lib/types'

const protectAPI = (handler: ApiFunction) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (
            new URL(req.headers.referer!).origin !==
            process.env.NEXT_PUBLIC_BASE_URL
        ) {
            return res
                .status(403)
                .json({ success: false, message: `Forbidden` })
        }
        return handler(req, res)
    }
}

export default protectAPI
