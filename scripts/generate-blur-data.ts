#!/usr/bin/env npx tsx

/**
 * Generates blur data URLs for project images and client logos.
 *
 * Uses plaiceholder to create base64-encoded blur placeholders
 * and stores them in MDX frontmatter for Next.js Image placeholder="blur".
 *
 * Usage: yarn generate-blur
 */

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

const contentDirectory = path.join(process.cwd(), 'content')
const publicDirectory = path.join(process.cwd(), 'public')

async function generateBlurDataURL(imagePath: string): Promise<string | undefined> {
    try {
        const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
        const fullPath = path.join(publicDirectory, normalizedPath)

        if (!fs.existsSync(fullPath)) {
            console.warn(`  ⚠️  Image not found: ${imagePath}`)
            return undefined
        }

        const buffer = fs.readFileSync(fullPath)
        const { base64 } = await getPlaiceholder(buffer)
        return base64
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`  ❌ Error generating blur for ${imagePath}: ${message}`)
        return undefined
    }
}

async function processFile(
    filePath: string,
    imageField: 'image' | 'logo'
): Promise<{ updated: boolean; skipped: boolean }> {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const imagePath = data[imageField] as string | undefined

    if (!imagePath) {
        return { updated: false, skipped: true }
    }

    const blurDataURL = await generateBlurDataURL(imagePath)

    if (!blurDataURL) {
        return { updated: false, skipped: true }
    }

    // Check if blurDataURL already exists and is the same
    if (data.blurDataURL === blurDataURL) {
        console.log(`  ✓ Blur data already up to date`)
        return { updated: false, skipped: true }
    }

    // Update frontmatter with blur data
    data.blurDataURL = blurDataURL

    // Write the updated file
    const updatedContent = matter.stringify(content, data)
    fs.writeFileSync(filePath, updatedContent)

    return { updated: true, skipped: false }
}

async function processProjects(): Promise<{ updated: number; skipped: number }> {
    const projectsDirectory = path.join(contentDirectory, 'projects')
    let updated = 0
    let skipped = 0

    if (!fs.existsSync(projectsDirectory)) {
        return { updated, skipped }
    }

    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    const projectDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

    for (const projectDir of projectDirs) {
        const indexPath = path.join(projectsDirectory, projectDir, 'index.mdx')

        if (!fs.existsSync(indexPath)) {
            continue
        }

        console.log(`📁 Project: ${projectDir}`)

        const result = await processFile(indexPath, 'image')
        if (result.updated) {
            console.log(`  ✓ Updated blur data`)
            updated++
        } else if (result.skipped) {
            skipped++
        }
    }

    return { updated, skipped }
}

async function processClients(): Promise<{ updated: number; skipped: number }> {
    const clientsDirectory = path.join(contentDirectory, 'clients')
    let updated = 0
    let skipped = 0

    if (!fs.existsSync(clientsDirectory)) {
        return { updated, skipped }
    }

    const files = fs.readdirSync(clientsDirectory).filter((file) => file.endsWith('.mdx'))

    for (const file of files) {
        const filePath = path.join(clientsDirectory, file)
        const clientSlug = file.replace(/\.mdx$/, '')

        console.log(`👤 Client: ${clientSlug}`)

        const result = await processFile(filePath, 'logo')
        if (result.updated) {
            console.log(`  ✓ Updated blur data`)
            updated++
        } else if (result.skipped) {
            skipped++
        }
    }

    return { updated, skipped }
}

async function main() {
    console.log('🔄 Generating blur data URLs...\n')

    console.log('── Projects ──')
    const projectResults = await processProjects()

    console.log('\n── Clients ──')
    const clientResults = await processClients()

    const totalUpdated = projectResults.updated + clientResults.updated
    const totalSkipped = projectResults.skipped + clientResults.skipped

    console.log('\n📊 Summary:')
    console.log(`   Projects updated: ${projectResults.updated}`)
    console.log(`   Projects skipped: ${projectResults.skipped}`)
    console.log(`   Clients updated: ${clientResults.updated}`)
    console.log(`   Clients skipped: ${clientResults.skipped}`)
    console.log(`   Total updated: ${totalUpdated}`)
    console.log(`   Total skipped: ${totalSkipped}`)

    console.log('\n✅ Done!')
}

main().catch(console.error)
