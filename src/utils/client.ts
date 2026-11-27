import path from 'path'
import * as v from 'valibot'

import {
    contentDirectory,
    type ImageMetadata,
    imageMetadataSchema,
    lazy,
    optionalText,
    parseFrontMatter,
    readMdxDirectory,
    requiredText,
} from './content'

const clientFrontMatterSchema = v.object({
    name: requiredText,
    logo: optionalText,
    logo_metadata: v.optional(imageMetadataSchema),
    sector: requiredText,
    description: requiredText,
})

export interface Client {
    slug: string
    name: string
    logo?: string
    logoMetadata?: ImageMetadata
    sector: string
    description: string
}

const loadClients = lazy(
    () =>
        new Map(
            readMdxDirectory(path.join(contentDirectory, 'clients')).map((file): [string, Client] => {
                const { logo_metadata, ...frontMatter } = parseFrontMatter(clientFrontMatterSchema, file)
                return [file.slug, { slug: file.slug, ...frontMatter, logoMetadata: logo_metadata }]
            })
        )
)

// Get all client slugs
export function getAllClientSlugs(): string[] {
    return Array.from(loadClients().keys())
}

// Get a single client by slug
export async function getClientBySlug(slug: string): Promise<Client | null> {
    return loadClients().get(slug) ?? null
}

// Get all clients
export async function getAllClients(): Promise<Client[]> {
    return Array.from(loadClients().values()).sort((a, b) => a.name.localeCompare(b.name))
}
