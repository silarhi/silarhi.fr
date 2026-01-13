#!/usr/bin/env npx tsx

/**
 * Validates image references in content files and public directory.
 *
 * Checks:
 * 1. Missing images: referenced in MDX but not in public directory
 * 2. Unused images: in public directory but not referenced by any MDX
 *
 * Exit codes:
 * - 0: All validations passed
 * - 1: Validation errors found
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

// Get all client logo references from MDX files
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

// Get all project hero image references from MDX files
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

// Get all image files from a directory
function getImagesInDirectory(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) {
        return []
    }

    const files = fs.readdirSync(dirPath)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

    return files.filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
    })
}

// Check if an image file exists in the public directory
function imageExists(imagePath: string): boolean {
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const fullPath = path.join(publicDirectory, normalizedPath)
    return fs.existsSync(fullPath)
}

// Normalize path to compare references with files
function normalizePath(imagePath: string): string {
    return imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
}

function validate() {
    console.log('🔍 Validating image references...\n')

    const clientLogos = getClientLogoReferences()
    const projectImages = getProjectImageReferences()
    const allReferences = [...clientLogos, ...projectImages]

    // Get all referenced paths as a Set for quick lookup
    const referencedPaths = new Set(allReferences.map((ref) => normalizePath(ref.path)))

    // Check for missing images (referenced but not in public)
    const missingImages: ImageReference[] = []
    for (const ref of allReferences) {
        if (!imageExists(ref.path)) {
            missingImages.push(ref)
        }
    }

    // Check for unused images in public/images/clients/
    const clientImagesDir = path.join(publicDirectory, 'images/clients')
    const clientImageFiles = getImagesInDirectory(clientImagesDir)
    const unusedClientImages = clientImageFiles.filter((file) => {
        const relativePath = `images/clients/${file}`
        return !referencedPaths.has(relativePath)
    })

    // Check for unused images in public/images/projects/
    const projectImagesDir = path.join(publicDirectory, 'images/projects')
    const projectImageFiles = getImagesInDirectory(projectImagesDir)
    const unusedProjectImages = projectImageFiles.filter((file) => {
        const relativePath = `images/projects/${file}`
        return !referencedPaths.has(relativePath)
    })

    let hasErrors = false

    // Report missing images
    const missingClientLogos = missingImages.filter((img) => img.type === 'client-logo')
    const missingProjectHeroes = missingImages.filter((img) => img.type === 'project-hero')

    if (missingClientLogos.length > 0) {
        hasErrors = true
        console.log('❌ Missing client logos (referenced but not found):')
        for (const img of missingClientLogos) {
            console.log(`   - ${img.path}`)
            console.log(`     Referenced in: ${img.source}`)
        }
        console.log()
    }

    if (missingProjectHeroes.length > 0) {
        hasErrors = true
        console.log('❌ Missing project hero images (referenced but not found):')
        for (const img of missingProjectHeroes) {
            console.log(`   - ${img.path}`)
            console.log(`     Referenced in: ${img.source}`)
        }
        console.log()
    }

    // Report unused images
    if (unusedClientImages.length > 0) {
        hasErrors = true
        console.log('⚠️  Unused client logos (in public but not referenced):')
        for (const file of unusedClientImages) {
            console.log(`   - public/images/clients/${file}`)
        }
        console.log()
    }

    if (unusedProjectImages.length > 0) {
        hasErrors = true
        console.log('⚠️  Unused project images (in public but not referenced):')
        for (const file of unusedProjectImages) {
            console.log(`   - public/images/projects/${file}`)
        }
        console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`   Client logos referenced: ${clientLogos.length}`)
    console.log(`   Project images referenced: ${projectImages.length}`)
    console.log(`   Client images in public: ${clientImageFiles.length}`)
    console.log(`   Project images in public: ${projectImageFiles.length}`)
    console.log(`   Missing: ${missingImages.length}`)
    console.log(`   Unused: ${unusedClientImages.length + unusedProjectImages.length}`)
    console.log()

    if (hasErrors) {
        console.log('❌ Validation failed!\n')
        process.exit(1)
    } else {
        console.log('✅ All image references are valid!\n')
        process.exit(0)
    }
}

validate()
