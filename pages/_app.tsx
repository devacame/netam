import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme='system' attribute='class'>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
