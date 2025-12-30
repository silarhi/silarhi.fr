import './globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'

import DefaultLayout from '@/components/layouts/default'
import { ThemeProvider } from '@/providers/theme-provider'
import { cn } from '@/utils/lib'

import { lato, montserrat } from './fonts'

export const metadata: Metadata = {
    title: `Agence de développement Web PHP à Toulouse - SILARHI`,
    description: `Développement d'applications Web à Toulouse et en France. Donnez vie à vos idées d'applications responsive & mobiles. Devis rapide et gratuit.`,
    icons: {
        icon: '/icon.png',
        shortcut: '/shortcut-icon.png',
        apple: '/apple-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon-precomposed.png',
        },
    },
}

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            className="bg-background text-foreground h-full scroll-smooth"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <head>
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            </head>
            <body className={cn(lato.className, lato.variable, montserrat.variable, 'h-full')}>
                <ThemeProvider>
                    <DefaultLayout>{children}</DefaultLayout>
                </ThemeProvider>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-PDTD5T600H" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-PDTD5T600H');
                `}
                </Script>
            </body>
        </html>
    )
}
