#!/usr/bin/env npx tsx

/**
 * Validates URLs in markdown content files.
 *
 * Checks:
 * 1. URLs that return 404 (not found)
 * 2. URLs that redirect to a different domain
 *
 * Note: 403 (Forbidden) responses are treated as valid since some websites
 * block automated requests but the URLs themselves are still valid.
 *
 * Exit codes:
 * - 0: All URLs are valid
 * - 1: Invalid URLs found
 */

import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

// Regex patterns for URL extraction
const URL_REGEX = /https?:\/\/[^\s"'<>)\]]+/g
const MARKDOWN_LINK_REGEX = /\[([^\]]*)\]\(([^)]+)\)/g

interface UrlInfo {
    url: string
    file: string
    source: 'frontmatter' | 'content'
}

interface ValidationResult {
    url: string
    file: string
    source: 'frontmatter' | 'content'
    status: 'valid' | 'not_found' | 'redirected' | 'error'
    statusCode?: number
    redirectUrl?: string
    error?: string
}

// URLs to skip validation (internal paths, localhost, etc.)
function shouldSkipUrl(url: string): boolean {
    try {
        const parsed = new URL(url)
        // Skip localhost and internal URLs
        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
            return true
        }
        // Skip file:// protocol
        if (parsed.protocol === 'file:') {
            return true
        }
        return false
    } catch {
        return true // Skip invalid URLs
    }
}

// Extract URLs from a string
function extractUrls(content: string): string[] {
    const urls = new Set<string>()

    // Extract markdown links
    let match
    while ((match = MARKDOWN_LINK_REGEX.exec(content)) !== null) {
        const url = match[2]
        if (url.startsWith('http://') || url.startsWith('https://')) {
            urls.add(url)
        }
    }

    // Extract raw URLs
    const rawUrls = content.match(URL_REGEX)
    if (rawUrls) {
        for (const url of rawUrls) {
            // Clean trailing punctuation that might have been captured
            const cleanUrl = url.replace(/[.,;:!?]+$/, '')
            urls.add(cleanUrl)
        }
    }

    return Array.from(urls)
}

// Get all MDX files recursively
function getMdxFiles(dir: string): string[] {
    const files: string[] = []

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...getMdxFiles(fullPath))
        } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
            files.push(fullPath)
        }
    }

    return files
}

// Extract all URLs from all content files
function extractAllUrls(): UrlInfo[] {
    const allUrls: UrlInfo[] = []
    const files = getMdxFiles(contentDirectory)

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8')
        const relativePath = path.relative(process.cwd(), file)

        // Split frontmatter and content
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
        const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length) : content

        // Extract URLs from frontmatter
        const frontmatterUrls = extractUrls(frontmatter)
        for (const url of frontmatterUrls) {
            if (!shouldSkipUrl(url)) {
                allUrls.push({ url, file: relativePath, source: 'frontmatter' })
            }
        }

        // Extract URLs from content body
        const bodyUrls = extractUrls(body)
        for (const url of bodyUrls) {
            if (!shouldSkipUrl(url)) {
                allUrls.push({ url, file: relativePath, source: 'content' })
            }
        }
    }

    // Deduplicate by URL, keeping track of all files
    const urlMap = new Map<string, UrlInfo>()
    for (const info of allUrls) {
        if (!urlMap.has(info.url)) {
            urlMap.set(info.url, info)
        }
    }

    return Array.from(urlMap.values())
}

// Validate a single URL
async function validateUrl(urlInfo: UrlInfo): Promise<ValidationResult> {
    const { url, file, source } = urlInfo

    try {
        // Use fetch with redirect: 'manual' to detect redirects
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'manual',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; URLValidator/1.0; +https://silarhi.fr)',
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        const statusCode = response.status

        // Check for redirects (3xx status codes)
        if (statusCode >= 300 && statusCode < 400) {
            const redirectUrl = response.headers.get('location')

            if (redirectUrl) {
                // Check if redirect is to a different domain
                try {
                    const originalHost = new URL(url).host
                    const redirectHost = new URL(redirectUrl, url).host

                    if (originalHost !== redirectHost) {
                        return {
                            url,
                            file,
                            source,
                            status: 'redirected',
                            statusCode,
                            redirectUrl,
                        }
                    }
                } catch {
                    // If we can't parse the redirect URL, consider it a redirect
                    return {
                        url,
                        file,
                        source,
                        status: 'redirected',
                        statusCode,
                        redirectUrl: redirectUrl || undefined,
                    }
                }
            }
        }

        // Check for 4xx and 5xx status codes
        if (statusCode >= 400) {
            // If HEAD fails, try GET (some servers don't support HEAD)
            if (statusCode === 405) {
                const getResponse = await fetch(url, {
                    method: 'GET',
                    redirect: 'manual',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; URLValidator/1.0; +https://silarhi.fr)',
                    },
                    signal: AbortSignal.timeout(10000),
                })

                // Treat 403 as valid (site blocks bots but URL exists)
                if (getResponse.status >= 400 && getResponse.status !== 403) {
                    return {
                        url,
                        file,
                        source,
                        status: 'not_found',
                        statusCode: getResponse.status,
                    }
                }

                return { url, file, source, status: 'valid', statusCode: getResponse.status }
            }

            // Treat 403 as valid - some websites block automated requests
            // but the URL itself is still valid
            if (statusCode === 403) {
                return { url, file, source, status: 'valid', statusCode }
            }

            return {
                url,
                file,
                source,
                status: 'not_found',
                statusCode,
            }
        }

        return { url, file, source, status: 'valid', statusCode }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)

        // Network errors, timeouts, etc.
        return {
            url,
            file,
            source,
            status: 'error',
            error: errorMessage,
        }
    }
}

// Rate-limited batch validation
async function validateUrlsBatched(urls: UrlInfo[], concurrency: number = 5): Promise<ValidationResult[]> {
    const results: ValidationResult[] = []

    for (let i = 0; i < urls.length; i += concurrency) {
        const batch = urls.slice(i, i + concurrency)
        const batchResults = await Promise.all(batch.map(validateUrl))
        results.push(...batchResults)

        // Progress indicator
        const progress = Math.min(i + concurrency, urls.length)
        process.stdout.write(`\r   Checked ${progress}/${urls.length} URLs...`)

        // Small delay between batches to be polite to servers
        if (i + concurrency < urls.length) {
            await new Promise((resolve) => setTimeout(resolve, 200))
        }
    }

    console.log() // New line after progress
    return results
}

async function main() {
    console.log('🔗 Validating URLs in content files...\n')

    // Extract all URLs
    console.log('📂 Scanning content files...')
    const urls = extractAllUrls()
    console.log(`   Found ${urls.length} unique URLs to validate\n`)

    if (urls.length === 0) {
        console.log('✅ No URLs found to validate\n')
        process.exit(0)
    }

    // Validate URLs
    console.log('🌐 Validating URLs...')
    const results = await validateUrlsBatched(urls)

    // Categorize results
    const invalidUrls = results.filter((r) => r.status === 'not_found')
    const redirectedUrls = results.filter((r) => r.status === 'redirected')
    const errorUrls = results.filter((r) => r.status === 'error')
    const validUrls = results.filter((r) => r.status === 'valid')

    console.log()

    // Report invalid URLs (404s)
    if (invalidUrls.length > 0) {
        console.log('❌ Invalid URLs (not found):')
        for (const result of invalidUrls) {
            console.log(`   ${result.url}`)
            console.log(`     File: ${result.file}`)
            console.log(`     Status: ${result.statusCode}`)
        }
        console.log()
    }

    // Report redirected URLs
    if (redirectedUrls.length > 0) {
        console.log('⚠️  Redirected URLs (to different domain):')
        for (const result of redirectedUrls) {
            console.log(`   ${result.url}`)
            console.log(`     File: ${result.file}`)
            console.log(`     Redirects to: ${result.redirectUrl}`)
        }
        console.log()
    }

    // Report error URLs
    if (errorUrls.length > 0) {
        console.log('⚠️  URLs with errors (could not validate):')
        for (const result of errorUrls) {
            console.log(`   ${result.url}`)
            console.log(`     File: ${result.file}`)
            console.log(`     Error: ${result.error}`)
        }
        console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`   Total URLs: ${results.length}`)
    console.log(`   Valid: ${validUrls.length}`)
    console.log(`   Not found (4xx/5xx): ${invalidUrls.length}`)
    console.log(`   Redirected: ${redirectedUrls.length}`)
    console.log(`   Errors: ${errorUrls.length}`)
    console.log()

    // Exit with error if there are invalid or redirected URLs
    if (invalidUrls.length > 0 || redirectedUrls.length > 0) {
        console.log('❌ URL validation failed!\n')
        process.exit(1)
    } else {
        console.log('✅ All URLs are valid!\n')
        process.exit(0)
    }
}

main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
})
