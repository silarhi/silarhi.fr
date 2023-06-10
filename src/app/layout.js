import '../../styles/app.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import DefaultLayout from 'components/Layout/DefaultLayout'

import { montserrat } from './fonts'

config.autoAddCss = false

export const metadata = {
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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <meta name="msapplication-TileColor" content="#2b5797" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <body className={`${montserrat.className} ${montserrat.variable}`}>
                <DefaultLayout>{children}</DefaultLayout>
            </body>
        </html>
    )
}
