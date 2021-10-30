import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import protectAPI from '@/lib/apiProtection'

export default protectAPI(
    NextAuth({
        adapter: PrismaAdapter(prisma),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
        ],
        session: {
            jwt: false,
            maxAge: 1 * (24 * 60 * 60), // Session has a max age of 1 Day
        },
        callbacks: {
            // Only have signIn callback to prevent multi user signups - change according to your own use
            async signIn({ user }) {
                /* The owner check below only works because GitHub doesn't allow users to signup with identical usernames */
                /* Implment secure user checks according to your use case */
                const isSiteOwner =
                    user.name?.toLowerCase() ===
                    process.env.SITE_OWNER_NAME?.toLowerCase()
                if (isSiteOwner) {
                    return true
                } else {
                    return '/invaliduser'
                }
            },
        },
    })
)
