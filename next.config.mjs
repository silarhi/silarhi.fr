const isDev = process.env.NODE_ENV === 'development'

// Origins the pages load from: Umami (script + events) and Formspree (contact form, sent with fetch).
// 'unsafe-inline' stays for scripts: the App Router and next-themes inline their bootstrap scripts, and nonces
// would turn every static page into a per-request render. Dev mode also needs eval and the HMR websocket.
const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://analytics.silarhi.fr`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self' https://analytics.silarhi.fr https://formspree.io${isDev ? ' ws:' : ''}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
].join('; ')

// HSTS is already sent by Vercel
const securityHeaders = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // AVIF first (about 20% lighter than WebP), WebP for browsers without AVIF support
        formats: ['image/avif', 'image/webp'],
    },
    poweredByHeader: false,
    headers: async () => [{ source: '/:path*', headers: securityHeaders }],
    redirects: async () => {
        return [
            {
                source: '/cgv',
                destination: '/conditions-generales-de-vente',
                permanent: true,
            },
            {
                source: '/wp-content/uploads/2019/07/CGV.pdf',
                destination: '/pdf/CGV.pdf',
                permanent: true,
            },
            {
                source: '/wp-content/uploads/2020/09/alejandro-escamilla-BbQLHCpVUqA-unsplash.jpg',
                destination: '/images/home.jpg',
                permanent: true,
            },
            ...[
                '/wp-content/uploads/2021/11/logo-wordpress-4096.png',
                '/wp-content/uploads/2021/11/logo-wordpress-1024.png',
                '/wp-content/uploads/2021/11/logo-horizontal-4096.png',
                '/wp-content/uploads/2021/11/logo-horizontal-1024.png',
                '/wp-content/uploads/2020/06/logo-with-name-landscape-901.png',
                '/wp-content/uploads/2020/06/logo-with-name-landscape-1802.png',
                '/wp-content/uploads/2020/06/logo-with-name-landscape-2048.png',
                '/wp-content/uploads/2020/06/logo-with-name-landscape-1024.png',
                '/wp-content/uploads/2020/06/logo-with-name-landscape-4096.png',
                '/wp-content/uploads/2019/07/cropped-landscape_logo-e1562273697704.png',
                '/wp-content/uploads/2019/07/landscape_logo-1.png',
                '/wp-content/uploads/2019/07/landscape_logo-e1562273697704.png',
            ].map(function (old) {
                return {
                    source: old,
                    destination: '/images/logo-horizontal-4096.png',
                    permanent: true,
                }
            }),
            ...[
                '/wp-content/uploads/2021/11/logo-4096.png',
                '/wp-content/uploads/2020/06/logo-square-4096.png',
                '/wp-content/uploads/2019/07/cropped-logo-512.png',
                '/wp-content/uploads/2019/07/logo-512.png',
            ].map(function (old) {
                return {
                    source: old,
                    destination: '/images/logo-4096.png',
                    permanent: true,
                }
            }),
            ...['/wp-content/uploads/2019/07/full_logo.png', '/wp-content/uploads/2019/07/full_logo.jpg'].map(
                function (old) {
                    return {
                        source: old,
                        destination: '/images/logo-vertical-light-4096.png',
                        permanent: true,
                    }
                }
            ),
            // Project redirects
            {
                source: '/projets/api-iris',
                destination: '/projets/iris',
                permanent: true,
            },
            {
                source: '/projets/front-iris',
                destination: '/projets/iris',
                permanent: true,
            },
            {
                source: '/projets/cartographie-cadastre',
                destination: '/projets/tracmi',
                permanent: true,
            },
            // Tag redirects to technologies (when technology exists)
            {
                source: '/projets/tag/apiplatform',
                destination: '/technologies/api-platform',
                permanent: true,
            },
            {
                source: '/projets/tag/docker',
                destination: '/technologies/docker',
                permanent: true,
            },
            {
                source: '/projets/tag/mysql',
                destination: '/technologies/mysql',
                permanent: true,
            },
            {
                source: '/projets/tag/postgresql',
                destination: '/technologies/postgres',
                permanent: true,
            },
            {
                source: '/projets/tag/react',
                destination: '/technologies/react',
                permanent: true,
            },
            {
                source: '/projets/tag/symfony',
                destination: '/technologies/symfony',
                permanent: true,
            },
            // Tag redirects to projects (when technology doesn't exist)
            {
                source: '/projets/tag/api',
                destination: '/projets',
                permanent: true,
            },
            {
                source: '/projets/tag/migration',
                destination: '/projets',
                permanent: true,
            },
            {
                source: '/projets/tag/reprise',
                destination: '/projets',
                permanent: true,
            },
            // Legacy urls
            {
                source: '/clients',
                destination: '/projets',
                permanent: true,
            },
            // Removed technologies (no project uses them any more)
            {
                source: '/technologies/vuejs',
                destination: '/projets',
                permanent: true,
            },
        ]
    },
}

export default nextConfig
