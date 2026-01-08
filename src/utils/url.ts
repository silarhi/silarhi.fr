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

/**
 * Filter parameters for the projects page.
 * Only one of these should be active at a time.
 */
const FILTER_PARAMS = ['technology', 'category', 'industry', 'client'] as const
export type FilterType = (typeof FILTER_PARAMS)[number]

interface ActiveFilter {
    type: FilterType
    value: string
}

/**
 * Finds the first active filter parameter from URL search params.
 * Returns the filter type and value, or null if no filter is active.
 */
export function getActiveFilter(searchParams: URLSearchParams | Record<string, string | null>): ActiveFilter | null {
    for (const param of FILTER_PARAMS) {
        const value = searchParams instanceof URLSearchParams ? searchParams.get(param) : searchParams[param]
        if (value) {
            return { type: param, value }
        }
    }
    return null
}

/**
 * Generates a canonical URL for the projects page with optional single filter parameter and pagination.
 * Only includes one filter parameter (first found in priority order) plus optional page number.
 * Search parameter is excluded from canonical URLs.
 *
 * @param searchParams - The search parameters from the URL
 * @returns The canonical URL for the projects page
 */
export function getProjectsCanonicalUrl(searchParams: Partial<Record<string, string>>): string {
    const basePath = '/projets'
    const queryParts: string[] = []

    // Find the first valid filter parameter (in priority order)
    for (const param of FILTER_PARAMS) {
        const value = searchParams[param]
        if (value) {
            queryParts.push(`${param}=${encodeURIComponent(value)}`)
            break
        }
    }

    // Add page parameter if present and greater than 1
    const page = searchParams.page
    if (page && parseInt(page, 10) > 1) {
        queryParts.push(`page=${encodeURIComponent(page)}`)
    }

    // Build the canonical URL
    if (queryParts.length > 0) {
        return getCanonicalUrl(`${basePath}?${queryParts.join('&')}`)
    }

    return getCanonicalUrl(basePath)
}
