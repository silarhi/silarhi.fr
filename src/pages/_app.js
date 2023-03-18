import '../../styles/app.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import DefaultLayout from "_layouts/DefaultLayout/DefaultLayout"
import {config} from '@fortawesome/fontawesome-svg-core'
import {Montserrat} from "next/font/google"
import Head from "next/head"

const montserrat = Montserrat({
    weight: ['300', '700'],
    subsets: ['latin']
})

config.autoAddCss = false

export default function MyApp({Component, pageProps}) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => (
        <DefaultLayout navbarFloatingClass={Component.navbarFloatingClass}
                       navbarInitialClass={Component.navbarFloatingClass}
        >
            {page}
        </DefaultLayout>
    ))

    return <>
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}
        </style>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#2b5797"/>
            <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
        </Head>
        {getLayout(<Component {...pageProps} />)}
    </>
}
