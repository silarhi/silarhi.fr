#!/usr/bin/env node

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectsDir = path.join(__dirname, '..', 'content', 'projects')
const publicDir = path.join(__dirname, '..', 'public')

async function generateBlurDataURL(imagePath) {
    try {
        const fullPath = path.join(publicDir, imagePath)
        if (!fs.existsSync(fullPath)) {
            console.warn(`  Image not found: ${imagePath}`)
            return undefined
        }
        const buffer = fs.readFileSync(fullPath)
        const { base64 } = await getPlaiceholder(buffer)
        return base64
    } catch (error) {
        console.error(`  Error generating blur for ${imagePath}:`, error.message)
        return undefined
    }
}

async function processProjectFile(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (!data.image) {
        return false
    }

    const blurDataURL = await generateBlurDataURL(data.image)

    if (!blurDataURL) {
        return false
    }

    // Check if blurDataURL already exists and is the same
    if (data.blurDataURL === blurDataURL) {
        console.log(`  Blur data already up to date`)
        return false
    }

    // Update frontmatter with blur data
    data.blurDataURL = blurDataURL

    // Write the updated file
    const updatedContent = matter.stringify(content, data)
    fs.writeFileSync(filePath, updatedContent)

    return true
}

async function main() {
    console.log('Generating blur data URLs for project images...\n')

    const projectDirs = fs
        .readdirSync(projectsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)

    let updated = 0
    let skipped = 0

    for (const projectDir of projectDirs) {
        const indexPath = path.join(projectsDir, projectDir, 'index.mdx')

        if (!fs.existsSync(indexPath)) {
            continue
        }

        console.log(`Processing: ${projectDir}`)

        const wasUpdated = await processProjectFile(indexPath)
        if (wasUpdated) {
            console.log(`  ✓ Updated blur data`)
            updated++
        } else {
            skipped++
        }
    }

    console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`)
}

main().catch(console.error)
