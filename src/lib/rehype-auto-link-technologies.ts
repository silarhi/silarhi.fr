import type { Element, Root, Text } from 'hast'
import { SKIP, visit } from 'unist-util-visit'

import { getAllTechnologies } from '@/utils/technology'

interface TechnologyMatcher {
    /** One regex for every technology name and alias */
    regex: RegExp
    /** Lower-cased name or alias → technology slug */
    slugByName: Map<string, string>
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Built once per build: technologies only change with the content
let matcherPromise: Promise<TechnologyMatcher | null> | null = null

/**
 * Build a single regex matching every technology name and alias, longest first so that the regex alternation picks
 * "Tailwind CSS" over a shorter name it contains. Names match as whole words: no letter, digit or underscore
 * (accented letters included) right before or after.
 */
async function buildMatcher(): Promise<TechnologyMatcher | null> {
    const technologies = await getAllTechnologies()
    const slugByName = new Map<string, string>()
    for (const tech of technologies) {
        for (const name of [tech.name, ...tech.name_aliases]) {
            slugByName.set(name.toLowerCase(), tech.slug)
        }
    }

    if (slugByName.size === 0) {
        return null
    }

    const alternation = Array.from(slugByName.keys())
        .sort((a, b) => b.length - a.length)
        .map(escapeRegex)
        .join('|')

    return { regex: new RegExp(`(?<![\\p{L}\\p{N}_])(?:${alternation})(?![\\p{L}\\p{N}_])`, 'giu'), slugByName }
}

// Skip linking inside these elements
const skipElements = new Set(['code', 'pre', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

/**
 * Split a text into text and link nodes, one link per technology mention
 */
function linkTechnologies(text: string, { regex, slugByName }: TechnologyMatcher): Array<Text | Element> {
    const fragments: Array<Text | Element> = []
    let lastIndex = 0

    for (const match of text.matchAll(regex)) {
        const slug = slugByName.get(match[0].toLowerCase())
        if (!slug) {
            continue
        }

        if (match.index > lastIndex) {
            fragments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
        }
        fragments.push({
            type: 'element',
            tagName: 'a',
            properties: { href: `/technologies/${slug}`, className: ['tech-link'] },
            children: [{ type: 'text', value: match[0] }],
        })
        lastIndex = match.index + match[0].length
    }

    if (lastIndex > 0 && lastIndex < text.length) {
        fragments.push({ type: 'text', value: text.slice(lastIndex) })
    }

    return fragments
}

/**
 * Rehype plugin that automatically links technology keywords to their respective pages.
 * Scans text nodes and wraps matching technology names with links to /technologies/{slug}.
 * Excludes links from code blocks, existing links, and headings (h1-h6).
 */
export default function rehypeAutoLinkTechnologies() {
    return async (tree: Root) => {
        matcherPromise ??= buildMatcher()
        const matcher = await matcherPromise
        if (!matcher) {
            return
        }

        visit(tree, 'text', (node: Text, index, parent) => {
            // Skip if we're inside a code block, link, or heading
            if (parent && 'tagName' in parent && skipElements.has((parent as Element).tagName)) {
                return SKIP
            }

            const fragments = linkTechnologies(node.value, matcher)
            if (fragments.length === 0 || !parent || typeof index !== 'number') {
                return
            }

            // Replace the text node with the new fragments, then continue after them
            parent.children.splice(index, 1, ...fragments)
            return index + fragments.length
        })
    }
}
