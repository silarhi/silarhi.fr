#!/usr/bin/env npx tsx

/**
 * Generates image metadata (blur placeholder, width, height) and writes it
 * directly to MDX frontmatter files.
 *
 * Scans:
 * 1. Project hero images from MDX frontmatter
 * 2. Client logos from MDX frontmatter
 *
 * Output: Updates MDX files with image_metadata field
 */

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { generateImageMetadata, imageExists } from './image-metadata'

const contentDirectory = path.join(process.cwd(), 'content')
const publicDirectory = path.join(process.cwd(), 'public')

// Process project MDX files
async function processProjects(): Promise<{ generated: number; failed: number }> {
    const projectsDirectory = path.join(contentDirectory, 'projects')
    let generated = 0
    let failed = 0

    if (!fs.existsSync(projectsDirectory)) {
        return { generated, failed }
    }

    const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
    const projectDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

    for (const projectDir of projectDirs) {
        const indexPath = path.join(projectsDirectory, projectDir, 'index.mdx')

        if (!fs.existsSync(indexPath)) {
            continue
        }

        const fileContents = fs.readFileSync(indexPath, 'utf8')
        const { data, content } = matter(fileContents)

        if (!data.image) {
            continue
        }

        if (!imageExists(data.image, publicDirectory)) {
            console.log(`⚠️  Image not found: ${data.image} (${projectDir})`)
            failed++
            continue
        }

        try {
            const imageMetadata = await generateImageMetadata(data.image, publicDirectory)
            data.image_metadata = imageMetadata

            // Write back to file
            const updatedContent = matter.stringify(content, data, {
                indent: 4,
                lineWidth: 1000,
                forceQuotes: true,
                noCompatMode: true,
            } as Parameters<typeof matter.stringify>[2])
            fs.writeFileSync(indexPath, updatedContent)

            generated++
            console.log(`✅ Project: ${projectDir}`)
        } catch (error) {
            console.log(`❌ Failed: ${projectDir}`)
            console.log(`   Error: ${error instanceof Error ? error.message : String(error)}`)
            failed++
        }
    }

    return { generated, failed }
}

// Process client MDX files
async function processClients(): Promise<{ generated: number; failed: number }> {
    const clientsDirectory = path.join(contentDirectory, 'clients')
    let generated = 0
    let failed = 0

    if (!fs.existsSync(clientsDirectory)) {
        return { generated, failed }
    }

    const files = fs.readdirSync(clientsDirectory).filter((file) => file.endsWith('.mdx'))

    for (const file of files) {
        const filePath = path.join(clientsDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        if (!data.logo) {
            continue
        }

        if (!imageExists(data.logo, publicDirectory)) {
            console.log(`⚠️  Logo not found: ${data.logo} (${file})`)
            failed++
            continue
        }

        try {
            data.logo_metadata = await generateImageMetadata(data.logo, publicDirectory)

            // Write back to file
            const updatedContent = matter.stringify(content, data, {
                indent: 4,
                lineWidth: 1000,
                forceQuotes: true,
                noCompatMode: true,
            } as Parameters<typeof matter.stringify>[2])
            fs.writeFileSync(filePath, updatedContent)

            generated++
            console.log(`✅ Client: ${file.replace('.mdx', '')}`)
        } catch (error) {
            console.log(`❌ Failed: ${file}`)
            console.log(`   Error: ${error instanceof Error ? error.message : String(error)}`)
            failed++
        }
    }

    return { generated, failed }
}

async function generate() {
    console.log('🖼️  Generating image metadata...\n')

    console.log('📁 Processing projects...')
    const projectResults = await processProjects()
    console.log()

    console.log('📁 Processing clients...')
    const clientResults = await processClients()
    console.log()

    const totalGenerated = projectResults.generated + clientResults.generated
    const totalFailed = projectResults.failed + clientResults.failed

    console.log('📊 Summary:')
    console.log(`   Projects - Generated: ${projectResults.generated}, Failed: ${projectResults.failed}`)
    console.log(`   Clients  - Generated: ${clientResults.generated}, Failed: ${clientResults.failed}`)
    console.log(`   Total    - Generated: ${totalGenerated}, Failed: ${totalFailed}`)
    console.log()

    if (totalFailed > 0) {
        console.log('⚠️  Some images failed to generate metadata.\n')
        process.exit(1)
    } else {
        console.log('✅ Image metadata generation complete!\n')
        process.exit(0)
    }
}

generate()
