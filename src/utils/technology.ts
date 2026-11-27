import path from 'path'
import * as v from 'valibot'

import { contentDirectory, lazy, parseFrontMatter, readMdxDirectory, requiredText, textList } from './content'

const technologyFrontMatterSchema = v.object({
    name: requiredText,
    name_aliases: textList,
    title: requiredText,
    description: requiredText,
    meta_title: requiredText,
    meta_description: requiredText,
    long_description: requiredText,
    url: v.pipe(v.string(), v.url()),
    reasons: v.array(v.object({ title: requiredText, description: requiredText })),
})

export interface Technology extends v.InferOutput<typeof technologyFrontMatterSchema> {
    slug: string
    content: string
}

const loadTechnologies = lazy(
    () =>
        new Map(
            readMdxDirectory(path.join(contentDirectory, 'technologies')).map((file): [string, Technology] => [
                file.slug,
                { slug: file.slug, ...parseFrontMatter(technologyFrontMatterSchema, file), content: file.content },
            ])
        )
)

// Get all technology slugs
export function getAllTechnologySlugs(): string[] {
    return Array.from(loadTechnologies().keys())
}

// Get a single technology by slug
export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
    return loadTechnologies().get(slug) ?? null
}

// Get all technologies
export async function getAllTechnologies(): Promise<Technology[]> {
    return Array.from(loadTechnologies().values()).sort((a, b) => a.name.localeCompare(b.name))
}
