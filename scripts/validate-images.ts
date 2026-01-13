#!/usr/bin/env npx tsx

/**
 * Validates that all image references in content files exist in the public directory.
 *
 * Checks:
 * 1. Client logos (logo field in content/clients/[slug].mdx)
 * 2. Project hero images (image field in content/projects/[slug]/index.mdx)
 *
 * Exit codes:
 * - 0: All images exist
 * - 1: Missing images found
 */

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')
const publicDirectory = path.join(process.cwd(), 'public')

interface ImageReference {
    path: string
    source: string
    type: 'client-logo' | 'project-hero'
}

interface ClientFrontMatter {
    name: string
    slug: string
    logo?: string
}

interface ProjectFrontMatter {
    title: string
    slug: string
    image?: string
}

// Get all client logo references
function getClientLogoReferences(): ImageReference[] {
    const clientsDirectory = path.join(contentDirectory, 'clients')
    const references: ImageReference[] = []

    if (!fs.existsSync(clientsDirectory)) {
        return references
    }

    const files = fs.readdirSync(clientsDirectory).filter((file) => file.endsWith('.mdx'))

    for (const file of files) {
        const filePath = path.join(clientsDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        const frontMatter = data as ClientFrontMatter

        if (frontMatter.logo) {
            references.push({
                path: frontMatter.logo,
                source: `content/clients/${file}`,
                type: 'client-logo',
            })
        }
    }

    return references
}

// Get all project hero image references
function getProjectImageReferences(): ImageReference[] {
    const projectsDirectory = path.join(contentDirectory, 'projects')
    const references: ImageReference[] = []

    if (!fs.existsSync(projectsDirectory)) {
        return references
    }

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

        if (frontMatter.image) {
            references.push({
                path: frontMatter.image,
                source: `content/projects/${projectDir}/index.mdx`,
                type: 'project-hero',
            })
        }
    }

    return references
}

// Check if an image file exists in the public directory
function imageExists(imagePath: string): boolean {
    // Image paths in content start with / and are relative to public directory
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const fullPath = path.join(publicDirectory, normalizedPath)
    return fs.existsSync(fullPath)
}

function validate() {
    console.log('🔍 Validating image references...\n')

    const clientLogos = getClientLogoReferences()
    const projectImages = getProjectImageReferences()
    const allReferences = [...clientLogos, ...projectImages]

    const missingImages: ImageReference[] = []

    for (const ref of allReferences) {
        if (!imageExists(ref.path)) {
            missingImages.push(ref)
        }
    }

    // Group missing images by type for better output
    const missingClientLogos = missingImages.filter((img) => img.type === 'client-logo')
    const missingProjectHeroes = missingImages.filter((img) => img.type === 'project-hero')

    if (missingClientLogos.length > 0) {
        console.log('❌ Missing client logos:')
        for (const img of missingClientLogos) {
            console.log(`   - ${img.path}`)
            console.log(`     Referenced in: ${img.source}`)
        }
        console.log()
    }

    if (missingProjectHeroes.length > 0) {
        console.log('❌ Missing project hero images:')
        for (const img of missingProjectHeroes) {
            console.log(`   - ${img.path}`)
            console.log(`     Referenced in: ${img.source}`)
        }
        console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`   Client logos checked: ${clientLogos.length}`)
    console.log(`   Project images checked: ${projectImages.length}`)
    console.log(`   Total images checked: ${allReferences.length}`)
    console.log(`   Missing images: ${missingImages.length}`)
    console.log()

    if (missingImages.length > 0) {
        console.log('❌ Validation failed!\n')
        process.exit(1)
    } else {
        console.log('✅ All image references are valid!\n')
        process.exit(0)
    }
}

validate()
