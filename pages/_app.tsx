import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme='system' attribute='class'>
            <SessionProvider session={pageProps.session}>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
