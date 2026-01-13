#!/usr/bin/env npx tsx

/**
 * Validates client references in the content directory.
 *
 * Checks:
 * 1. Clients defined but not used by any project (unused)
 * 2. Clients referenced by projects but not defined (missing)
 *
 * Exit codes:
 * - 0: All validations passed
 * - 1: Validation errors found
 */

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { getAllClientSlugs } from '@/utils/client'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

interface ProjectFrontMatter {
    title: string
    client: string
}

// Get all clients referenced by projects (raw slugs from frontmatter)
function getProjectClientsRaw(): Map<string, { project: string; title: string }[]> {
    const usedClients = new Map<string, { project: string; title: string }[]>()

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

        if (!frontMatter.client) {
            continue
        }

        const client = frontMatter.client
        if (!usedClients.has(client)) {
            usedClients.set(client, [])
        }
        usedClients.get(client)!.push({
            project: projectDir,
            title: frontMatter.title || projectDir,
        })
    }

    return usedClients
}

function validate() {
    console.log('🔍 Validating client references...\n')

    const definedClientSlugs = new Set(getAllClientSlugs())
    const usedClients = getProjectClientsRaw()

    let hasErrors = false

    // Check for unused clients (defined but not used by any project)
    const unusedClients: string[] = []
    for (const slug of definedClientSlugs) {
        if (!usedClients.has(slug)) {
            unusedClients.push(slug)
        }
    }

    if (unusedClients.length > 0) {
        hasErrors = true
        console.log('⚠️  Unused clients (defined but not used by any project):')
        for (const slug of unusedClients) {
            console.log(`   - ${slug} (content/clients/${slug}.mdx)`)
        }
        console.log()
    }

    // Check for missing clients (used by projects but not defined)
    const missingClients: { slug: string; projects: { project: string; title: string }[] }[] = []
    for (const [slug, projects] of usedClients) {
        if (!definedClientSlugs.has(slug)) {
            missingClients.push({ slug, projects })
        }
    }

    if (missingClients.length > 0) {
        hasErrors = true
        console.log('❌ Missing clients (used by projects but not defined):')
        for (const client of missingClients) {
            console.log(`   - ${client.slug}`)
            console.log(`     Used by: ${client.projects.map((p) => p.project).join(', ')}`)
        }
        console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`   Defined clients: ${definedClientSlugs.size}`)
    console.log(`   Used clients: ${usedClients.size}`)
    console.log(`   Unused: ${unusedClients.length}`)
    console.log(`   Missing: ${missingClients.length}`)
    console.log()

    if (hasErrors) {
        console.log('❌ Validation failed!\n')
        process.exit(1)
    } else {
        console.log('✅ All client references are valid!\n')
        process.exit(0)
    }
}

validate()
