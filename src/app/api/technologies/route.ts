import { NextResponse } from 'next/server'

import { getProjectFilterData } from '@/utils/project'

// Cache for 1 hour (data only changes at build time)
export const revalidate = 3600

export async function GET() {
    try {
        // Use pre-computed filter data (O(n) instead of O(n×m))
        const { technologies, categories, industries, projects } = await getProjectFilterData()

        const response = NextResponse.json({
            technologies,
            categories,
            industries,
            projects,
        })

        // Add caching headers for CDN and browser caching
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

        return response
    } catch (error) {
        console.error('Error fetching technologies data:', error)
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}
