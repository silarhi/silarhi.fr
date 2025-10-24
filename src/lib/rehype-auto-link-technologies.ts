import { Element, Root, Text } from 'hast'
import { SKIP, visit } from 'unist-util-visit'

import { getAllTechnologies } from '@/utils/technology'

interface TechnologyLink {
    name: string
    slug: string
    regex: RegExp
}

/**
 * Rehype plugin that automatically links technology keywords to their respective pages.
 * Scans text nodes and wraps matching technology names with links to /technologies/{slug}.
 * Excludes links from code blocks, existing links, and headings (h1-h6).
 */
export default function rehypeAutoLinkTechnologies() {
    return async (tree: Root) => {
        // Fetch all technologies
        const technologies = await getAllTechnologies()

        // Build regex patterns for each technology (case-insensitive, word boundaries)
        const technologyLinks: TechnologyLink[] = technologies.map((tech) => ({
            name: tech.name,
            slug: tech.slug,
            // Use word boundaries to avoid partial matches
            // The \b ensures we match whole words only
            regex: new RegExp(`\\b(${escapeRegex(tech.name)})\\b`, 'gi'),
        }))

        // Skip linking inside these elements
        const skipElements = new Set(['code', 'pre', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

        visit(tree, 'text', (node: Text, index, parent) => {
            // Skip if we're inside a code block, link, or heading
            if (parent && 'tagName' in parent && skipElements.has((parent as Element).tagName)) {
                return SKIP
            }

            const text = node.value
            const fragments: Array<Text | Element> = []
            let lastIndex = 0
            const matches: Array<{ start: number; end: number; tech: TechnologyLink }> = []

            // Find all technology matches in this text node
            technologyLinks.forEach((tech) => {
                let match
                tech.regex.lastIndex = 0 // Reset regex state
                while ((match = tech.regex.exec(text)) !== null) {
                    matches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        tech,
                    })
                }
            })

            // Sort matches by position and remove overlapping matches
            const sortedMatches = matches
                .sort((a, b) => a.start - b.start)
                .filter((match, idx, arr) => {
                    // Keep first match if it doesn't overlap with previous
                    if (idx === 0) return true
                    const prev = arr[idx - 1]
                    return match.start >= prev.end
                })

            // If no matches, return original node
            if (sortedMatches.length === 0) {
                return
            }

            // Build new node array with text and link nodes
            sortedMatches.forEach((match) => {
                // Add text before match
                if (match.start > lastIndex) {
                    fragments.push({
                        type: 'text',
                        value: text.slice(lastIndex, match.start),
                    })
                }

                // Add link node
                fragments.push({
                    type: 'element',
                    tagName: 'a',
                    properties: {
                        href: `/technologies/${match.tech.slug}`,
                        className: ['tech-link'],
                    },
                    children: [
                        {
                            type: 'text',
                            value: text.slice(match.start, match.end),
                        },
                    ],
                })

                lastIndex = match.end
            })

            // Add remaining text
            if (lastIndex < text.length) {
                fragments.push({
                    type: 'text',
                    value: text.slice(lastIndex),
                })
            }

            // Replace the text node with the new fragments
            if (parent && typeof index === 'number' && fragments.length > 0) {
                parent.children.splice(index, 1, ...fragments)
                // Return index to continue from the last inserted node
                return index + fragments.length
            }
        })
    }
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
