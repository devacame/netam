import { NextApiRequest, NextApiResponse } from 'next'
import { ApiFunction } from '@/lib/types'

const protectAPI = (handler: ApiFunction) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.headers.host !== new URL(process.env.NEXTAUTH_URL!).host) {
            return res
                .status(403)
                .json({ success: false, message: `Forbidden` })
        }
        return handler(req, res)
    }
}

export default protectAPI
