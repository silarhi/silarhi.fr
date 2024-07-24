/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
            ...[
                '/wp-content/uploads/2019/07/full_logo.png',
                '/wp-content/uploads/2019/07/full_logo.jpg',
            ].map(function (old) {
                return {
                    source: old,
                    destination: '/images/logo-vertical-light-4096.png',
                    permanent: true,
                }
            }),
        ]
    }
}

export default nextConfig;
