#!/usr/bin/env npx tsx

/**
 * Validates technology references in the content directory.
 *
 * Checks:
 * 1. Technologies defined but not used by any project (unused)
 * 2. Technologies referenced by projects but not defined (missing)
 *
 * Exit codes:
 * - 0: All validations passed
 * - 1: Validation errors found
 */

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { getAllTechnologySlugs } from '@/utils/technology'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

interface ProjectFrontMatter {
    title: string
    technologies: string[]
}

// Get all technologies referenced by projects (raw slugs from frontmatter)
function getProjectTechnologiesRaw(): Map<string, { project: string; title: string }[]> {
    const usedTechnologies = new Map<string, { project: string; title: string }[]>()

    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    const projectDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

    for (const projectDir of projectDirs) {
        const indexPath = path.join(projectsDirectory, projectDir, 'index.mdx')

        if (!fs.existsSync(indexPath)) {
            continue
        }

        const fileContents = fs.readFileSync(indexPath, 'utf8')
        const { data } = matter(fileContents)
        const frontMatter = data as ProjectFrontMatter

        if (!frontMatter.technologies || !Array.isArray(frontMatter.technologies)) {
            continue
        }

        for (const tech of frontMatter.technologies) {
            if (!usedTechnologies.has(tech)) {
                usedTechnologies.set(tech, [])
            }
            usedTechnologies.get(tech)!.push({
                project: projectDir,
                title: frontMatter.title || projectDir,
            })
        }
    }

    return usedTechnologies
}

function validate() {
    console.log('🔍 Validating technology references...\n')

    const definedTechnologySlugs = new Set(getAllTechnologySlugs())
    const usedTechnologies = getProjectTechnologiesRaw()

    let hasErrors = false

    // Check for unused technologies (defined but not used by any project)
    const unusedTechnologies: string[] = []
    for (const slug of definedTechnologySlugs) {
        if (!usedTechnologies.has(slug)) {
            unusedTechnologies.push(slug)
        }
    }

    if (unusedTechnologies.length > 0) {
        hasErrors = true
        console.log('⚠️  Unused technologies (defined but not used by any project):')
        for (const slug of unusedTechnologies) {
            console.log(`   - ${slug} (content/technologies/${slug}.mdx)`)
        }
        console.log()
    }

    // Check for missing technologies (used by projects but not defined)
    const missingTechnologies: { slug: string; projects: { project: string; title: string }[] }[] = []
    for (const [slug, projects] of usedTechnologies) {
        if (!definedTechnologySlugs.has(slug)) {
            missingTechnologies.push({ slug, projects })
        }
    }

    if (missingTechnologies.length > 0) {
        hasErrors = true
        console.log('❌ Missing technologies (used by projects but not defined):')
        for (const tech of missingTechnologies) {
            console.log(`   - ${tech.slug}`)
            console.log(`     Used by: ${tech.projects.map((p) => p.project).join(', ')}`)
        }
        console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`   Defined technologies: ${definedTechnologySlugs.size}`)
    console.log(`   Used technologies: ${usedTechnologies.size}`)
    console.log(`   Unused: ${unusedTechnologies.length}`)
    console.log(`   Missing: ${missingTechnologies.length}`)
    console.log()

    if (hasErrors) {
        console.log('❌ Validation failed!\n')
        process.exit(1)
    } else {
        console.log('✅ All technology references are valid!\n')
        process.exit(0)
    }
}

validate()
