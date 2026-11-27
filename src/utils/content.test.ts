import fs from 'fs'
import os from 'os'
import path from 'path'
import * as v from 'valibot'
import { afterAll, describe, expect, it, vi } from 'vitest'

import {
    isoDate,
    lazy,
    type MdxFile,
    optionalText,
    parseFrontMatter,
    readMdxDirectory,
    readMdxFile,
    requiredText,
    textList,
} from './content'

const schema = v.object({
    title: requiredText,
    subtitle: optionalText,
    tags: textList,
    date: isoDate,
    cta: v.object({ title: requiredText }),
})

const mdxFile = (data: Record<string, unknown>): MdxFile => ({
    slug: 'example',
    filePath: path.join(process.cwd(), 'content/services/example.mdx'),
    data,
    content: '',
})

describe('parseFrontMatter', () => {
    it('returns the validated front matter, with defaults and transforms applied', () => {
        const frontMatter = parseFrontMatter(
            schema,
            mdxFile({ title: 'Titre', date: '2024-03-05', cta: { title: 'Contact' }, unknown: 'dropped' })
        )

        expect(frontMatter).toEqual({
            title: 'Titre',
            tags: [],
            date: new Date('2024-03-05T00:00:00Z'),
            cta: { title: 'Contact' },
        })
    })

    it('fails with the file and every invalid field, nested ones included', () => {
        const parse = () => parseFrontMatter(schema, mdxFile({ title: '  ', date: '2024-13-05', cta: {} }))

        expect(parse).toThrowError(/^Invalid front matter in content\/services\/example\.mdx:\n/)
        expect(parse).toThrowError('  - title: Expected a non-empty text')
        expect(parse).toThrowError('  - date: Invalid date')
        expect(parse).toThrowError('  - cta.title: ')
    })

    it('rejects a list item that is not a text', () => {
        expect(() =>
            parseFrontMatter(schema, mdxFile({ title: 'T', date: '2024-03-05', cta: { title: 'C' }, tags: ['a', 1] }))
        ).toThrowError('  - tags.1: ')
    })
})

describe('lazy', () => {
    it('loads the value once, on the first call', () => {
        const load = vi.fn(() => ({ loaded: true }))
        const get = lazy(load)

        expect(load).not.toHaveBeenCalled()
        expect(get()).toBe(get())
        expect(load).toHaveBeenCalledTimes(1)
    })

    it('caches a falsy value too', () => {
        const load = vi.fn(() => null)
        const get = lazy(load)

        get()
        get()
        expect(load).toHaveBeenCalledTimes(1)
    })
})

describe('reading MDX files', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'silarhi-content-'))
    fs.writeFileSync(path.join(directory, 'index.mdx'), '---\ntitle: Index\n---\n')
    fs.writeFileSync(path.join(directory, 'v1.mdx'), "---\ntitle: V1\ndate: '2024-03-05'\n---\nCorps du **v1**\n")
    fs.writeFileSync(path.join(directory, 'notes.md'), '# Not MDX\n')

    afterAll(() => fs.rmSync(directory, { recursive: true }))

    it('splits the front matter from the body and names the file by its slug', () => {
        const file = readMdxFile(path.join(directory, 'v1.mdx'))

        expect(file.slug).toBe('v1')
        expect(file.data).toEqual({ title: 'V1', date: '2024-03-05' })
        expect(file.content.trim()).toBe('Corps du **v1**')
    })

    it('lists the MDX files of a directory, index.mdx excluded', () => {
        expect(readMdxDirectory(directory).map((file) => file.slug)).toEqual(['v1'])
    })

    it('returns no file for a missing directory', () => {
        expect(readMdxDirectory(path.join(directory, 'missing'))).toEqual([])
    })
})
