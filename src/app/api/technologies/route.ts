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

        // Get all unique tags with counts
        const tagMap = new Map<
            string,
            {
                slug: string
                name: string
                projectCount: number
            }
        >()

        allProjects.forEach((project) => {
            project.tags.forEach((tag) => {
                if (tagMap.has(tag.slug)) {
                    tagMap.get(tag.slug)!.projectCount++
                } else {
                    tagMap.set(tag.slug, {
                        slug: tag.slug,
                        name: tag.name,
                        projectCount: 1,
                    })
                }
            })
        })

        const tags = Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name))

        // Filter to only include items with projects
        const technologies = technologiesWithCounts.filter((tech) => tech.projectCount > 0)

        // Return all projects (no need to simplify, ProjectCard expects full ProjectProject)
        const projects = allProjects

        return NextResponse.json({
            technologies,
            tags,
            projects,
        })
    } catch (error) {
        console.error('Error fetching technologies data:', error)
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}
