import { NextResponse } from 'next/server'

import { getAllProjects } from '@/utils/project'
import { getAllTechnologies } from '@/utils/technology'

export async function GET() {
    try {
        const [allProjects, allTechnologies] = await Promise.all([getAllProjects(), getAllTechnologies()])

        // Calculate project counts for each technology
        const technologiesWithCounts = allTechnologies.map((tech) => ({
            slug: tech.slug,
            name: tech.name,
            projectCount: allProjects.filter((project) => project.technologies.some((t) => t.slug === tech.slug))
                .length,
        }))

        // Get all unique categories with counts
        const categoryMap = new Map<string, { slug: string; name: string; projectCount: number }>()

        allProjects.forEach((project) => {
            if (project.category) {
                const slug = project.category.toLowerCase().replace(/\s+/g, '-')
                if (categoryMap.has(slug)) {
                    categoryMap.get(slug)!.projectCount++
                } else {
                    categoryMap.set(slug, {
                        slug,
                        name: project.category,
                        projectCount: 1,
                    })
                }
            }
        })

        const categories = Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))

        // Get all unique industries/sectors with counts
        const industryMap = new Map<string, { slug: string; name: string; projectCount: number }>()

        allProjects.forEach((project) => {
            const industry = project.client.sector
            if (industry) {
                const slug = industry.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
                if (industryMap.has(slug)) {
                    industryMap.get(slug)!.projectCount++
                } else {
                    industryMap.set(slug, {
                        slug,
                        name: industry,
                        projectCount: 1,
                    })
                }
            }
        })

        const industries = Array.from(industryMap.values()).sort((a, b) => a.name.localeCompare(b.name))

        // Filter to only include items with projects
        const technologies = technologiesWithCounts.filter((tech) => tech.projectCount > 0)

        // Return all projects (no need to simplify, ProjectCard expects full Project)
        const projects = allProjects

        return NextResponse.json({
            technologies,
            categories,
            industries,
            projects,
        })
    } catch (error) {
        console.error('Error fetching technologies data:', error)
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}
