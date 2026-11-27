import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import * as v from 'valibot'

export const contentDirectory = path.join(process.cwd(), 'content')

export interface MdxFile {
    /** File name without the `.mdx` extension */
    slug: string
    filePath: string
    /** Raw front matter, not validated yet: check `published` on it, then call `parseFrontMatter()` */
    data: Record<string, unknown>
    content: string
}

// Read one MDX file and split its front matter from its body
export function readMdxFile(filePath: string): MdxFile {
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
    return { slug: path.basename(filePath, '.mdx'), filePath, data, content }
}

// Read the MDX files of a directory, `index.mdx` excluded (it describes the directory itself)
export function readMdxDirectory(directory: string): MdxFile[] {
    if (!fs.existsSync(directory)) {
        return []
    }

    return fs
        .readdirSync(directory)
        .filter((fileName) => fileName.endsWith('.mdx') && fileName !== 'index.mdx')
        .map((fileName) => readMdxFile(path.join(directory, fileName)))
}

// Validate front matter against its schema, failing the build with every problem of the file at once
export function parseFrontMatter<TSchema extends v.GenericSchema>(
    schema: TSchema,
    file: MdxFile
): v.InferOutput<TSchema> {
    const result = v.safeParse(schema, file.data)
    if (result.success) {
        return result.output
    }

    const issues = result.issues.map((issue) => `  - ${v.getDotPath(issue) ?? '(root)'}: ${issue.message}`)
    throw new Error(`Invalid front matter in ${path.relative(process.cwd(), file.filePath)}:\n${issues.join('\n')}`)
}

// Compute a value on first use, then return it on every call (content only changes at build time)
export function lazy<T>(load: () => T): () => T {
    let loaded: { value: T } | null = null
    return () => {
        loaded ??= { value: load() }
        return loaded.value
    }
}

// Front matter building blocks
export const requiredText = v.pipe(
    v.string(),
    v.check((value) => value.trim() !== '', 'Expected a non-empty text')
)
export const optionalText = v.optional(requiredText)
export const textList = v.optional(v.array(requiredText), [])
// YYYY-MM-DD, parsed as UTC midnight
export const isoDate = v.pipe(
    v.string(),
    v.isoDate(),
    v.transform((value) => new Date(value))
)
export const imageMetadataSchema = v.object({
    blur: requiredText,
    width: v.number(),
    height: v.number(),
})

export type ImageMetadata = v.InferOutput<typeof imageMetadataSchema>
