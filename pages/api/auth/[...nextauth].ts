import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import prisma from '@/lib/prisma'
import protectAPI from '@/lib/apiProtection'

export default protectAPI(
    NextAuth({
        // adapter: PrismaAdapter(prisma),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
        ],
        session: {
            jwt: true,
            maxAge: 1 * (24 * 60 * 60), // Session has a max age of 1 Day
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        callbacks: {
            async jwt({ token, user, isNewUser }) {
                /* Prevent new user signups except owner + extra check with Github's unique username policy */
                if (
                    (isNewUser && token.name !== process.env.SITE_OWNER_NAME) ||
                    !user
                ) {
                    return { token: null }
                }
                if (user) return token
                return { token: null }
            },
        },
    })
)
