import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apollo'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme='system' attribute='class'>
            <SessionProvider session={pageProps.session}>
                <ApolloProvider client={apolloClient}>
                    <Head>
                        <meta
                            name='viewport'
                            content='width=device-width, initial-scale=1.0'
                        />
                    </Head>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
