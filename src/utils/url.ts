/**
 * URL utilities for SEO and canonical URL generation
 */

/**
 * Returns the base URL for the site.
 * Uses NEXT_PUBLIC_SITE_URL in production, falls back to VERCEL_URL or localhost.
 */
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }

    return 'http://localhost:3000'
}

/**
 * Generates a canonical URL for a given path.
 * Ensures consistent URL format (no trailing slash, proper base URL).
 *
 * @param path - The path to append to the base URL (e.g., '/projets', '/contact')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(path: string = ''): string {
    const baseUrl = getBaseUrl()

    // Remove trailing slash from base URL if present
    const normalizedBase = baseUrl.replace(/\/$/, '')

    // Ensure path starts with a slash if provided and is not empty
    const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path

    // Remove trailing slash from path (except for root)
    const cleanPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/$/, '')

    return `${normalizedBase}${cleanPath}`
}
