import './globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'

import DefaultLayout from '@/components/layouts/default'
import { cn } from '@/utils/lib'

import { montserrat } from './fonts'

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
        <html lang="en" className="h-full scroll-smooth">
            <head>
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-PDTD5T600H" />
                <Script id="google-analytics">
                    {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
         
                  gtag('config', 'G-PDTD5T600H');
                `}
                </Script>
            </head>
            <body className={cn(montserrat.className, montserrat.variable, 'h-full bg-gray-50')}>
                <DefaultLayout>{children}</DefaultLayout>
            </body>
        </html>
    )
}
