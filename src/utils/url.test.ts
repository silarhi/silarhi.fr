import { afterEach, describe, expect, it, vi } from 'vitest'

import { getActiveFilter, getBaseUrl, getCanonicalUrl, getProjectsCanonicalUrl } from './url'

afterEach(() => {
    vi.unstubAllEnvs()
})

describe('getBaseUrl', () => {
    it('prefers NEXT_PUBLIC_SITE_URL, then the Vercel deployment URL, then localhost', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://silarhi.fr')
        vi.stubEnv('VERCEL_URL', 'silarhi-git-main.vercel.app')
        expect(getBaseUrl()).toBe('https://silarhi.fr')

        vi.stubEnv('NEXT_PUBLIC_SITE_URL', '')
        expect(getBaseUrl()).toBe('https://silarhi-git-main.vercel.app')

        vi.stubEnv('VERCEL_URL', '')
        expect(getBaseUrl()).toBe('http://localhost:3000')
    })
})

describe('getCanonicalUrl', () => {
    it('joins the base URL and the path without trailing slashes', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://silarhi.fr/')

        expect(getCanonicalUrl()).toBe('https://silarhi.fr')
        expect(getCanonicalUrl('/')).toBe('https://silarhi.fr')
        expect(getCanonicalUrl('/projets/')).toBe('https://silarhi.fr/projets')
        expect(getCanonicalUrl('contact')).toBe('https://silarhi.fr/contact')
    })
})

describe('getActiveFilter', () => {
    it('returns the first filter set, in priority order', () => {
        expect(getActiveFilter(new URLSearchParams('client=airbus&technology=php'))).toEqual({
            type: 'technology',
            value: 'php',
        })
        expect(getActiveFilter({ technology: null, industry: 'aeronautique' })).toEqual({
            type: 'industry',
            value: 'aeronautique',
        })
    })

    it('returns null without filter', () => {
        expect(getActiveFilter(new URLSearchParams('search=api&page=2'))).toBeNull()
    })
})

describe('getProjectsCanonicalUrl', () => {
    it('keeps a single filter and the page, never the search', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://silarhi.fr')

        expect(getProjectsCanonicalUrl({})).toBe('https://silarhi.fr/projets')
        expect(getProjectsCanonicalUrl({ search: 'api', page: '1' })).toBe('https://silarhi.fr/projets')
        expect(getProjectsCanonicalUrl({ category: 'gestion documentaire', client: 'airbus', page: '3' })).toBe(
            'https://silarhi.fr/projets?category=gestion%20documentaire&page=3'
        )
    })
})
