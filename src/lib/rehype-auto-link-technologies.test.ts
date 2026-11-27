import type { Element, ElementContent, Root } from 'hast'
import { describe, expect, it, vi } from 'vitest'

import rehypeAutoLinkTechnologies from './rehype-auto-link-technologies'

vi.mock('@/utils/technology', () => ({
    getAllTechnologies: async () => [
        { slug: 'php', name: 'PHP', name_aliases: [] },
        { slug: 'css', name: 'CSS', name_aliases: [] },
        { slug: 'tailwind', name: 'Tailwind CSS', name_aliases: [] },
        { slug: 'postgres', name: 'PostgreSQL', name_aliases: ['Postgres'] },
        { slug: 'node', name: 'Node.js', name_aliases: [] },
    ],
}))

const element = (tagName: string, children: ElementContent[]): Element => ({
    type: 'element',
    tagName,
    properties: {},
    children,
})

// Runs the plugin on a single <tagName>text</tagName> and returns that element's children
async function link(text: string, tagName = 'p'): Promise<ElementContent[]> {
    const paragraph = element(tagName, [{ type: 'text', value: text }])
    const tree: Root = { type: 'root', children: [paragraph] }
    await rehypeAutoLinkTechnologies()(tree)
    return paragraph.children
}

const techLink = (slug: string, text: string): Element => ({
    type: 'element',
    tagName: 'a',
    properties: { href: `/technologies/${slug}`, className: ['tech-link'] },
    children: [{ type: 'text', value: text }],
})

describe('rehypeAutoLinkTechnologies', () => {
    it('links every mention and keeps the text around them', async () => {
        expect(await link('Du PHP et du CSS.')).toEqual([
            { type: 'text', value: 'Du ' },
            techLink('php', 'PHP'),
            { type: 'text', value: ' et du ' },
            techLink('css', 'CSS'),
            { type: 'text', value: '.' },
        ])
    })

    it('matches case-insensitively and keeps the original spelling', async () => {
        expect(await link('php')).toEqual([techLink('php', 'php')])
    })

    it('prefers the longest name when one contains another', async () => {
        expect(await link('Tailwind CSS')).toEqual([techLink('tailwind', 'Tailwind CSS')])
    })

    it('links aliases to their technology', async () => {
        expect(await link('Postgres ou PostgreSQL')).toEqual([
            techLink('postgres', 'Postgres'),
            { type: 'text', value: ' ou ' },
            techLink('postgres', 'PostgreSQL'),
        ])
    })

    it('matches whole words only, accented letters included', async () => {
        expect(await link('PHPUnit, CSSé et xPHP')).toEqual([{ type: 'text', value: 'PHPUnit, CSSé et xPHP' }])
    })

    it('treats punctuation in a name literally', async () => {
        expect(await link('Nodexjs')).toEqual([{ type: 'text', value: 'Nodexjs' }])
        expect(await link('Node.js')).toEqual([techLink('node', 'Node.js')])
    })

    it.each(['code', 'pre', 'a', 'h1', 'h2', 'h3'])('leaves the text of <%s> alone', async (tagName) => {
        expect(await link('PHP', tagName)).toEqual([{ type: 'text', value: 'PHP' }])
    })
})
