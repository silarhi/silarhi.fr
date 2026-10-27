import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/utils/url'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseUrl()

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // /cdn-cgi/: Cloudflare's email obfuscation rewrites mailto: links to
            // /cdn-cgi/l/email-protection, a 404 for crawlers
            disallow: ['/api/', '/cdn-cgi/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
