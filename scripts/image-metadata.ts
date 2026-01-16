import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

interface ImageMetadata {
    blur: string
    width: number
    height: number
}

// Normalize path (remove leading slash)
function normalizePath(imagePath: string): string {
    return imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
}

// Check if image exists
export function imageExists(imagePath: string, publicDirectory: string): boolean {
    const normalizedPath = normalizePath(imagePath)
    const fullPath = path.join(publicDirectory, normalizedPath)
    return fs.existsSync(fullPath)
}

// Generate image metadata (blur + dimensions)
export async function generateImageMetadata(imagePath: string, publicDirectory: string): Promise<ImageMetadata> {
    const normalizedPath = normalizePath(imagePath)
    const absolutePath = path.join(publicDirectory, normalizedPath)

    const image = sharp(absolutePath)
    const metadata = await image.metadata()

    const blurBuffer = await image
        .resize(4, 4, { fit: 'inside' })
        .modulate({ saturation: 1.2 })
        .toFormat('png')
        .toBuffer()

    return {
        blur: `data:image/png;base64,${blurBuffer.toString('base64')}`,
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
    }
}
