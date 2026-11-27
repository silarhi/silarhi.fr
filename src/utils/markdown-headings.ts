import GithubSlugger from 'github-slugger'

export interface MarkdownHeading {
    id: string
    title: string
}

// Inline Markdown reduced to the text rehype-slug sees: link text kept, emphasis and code markers dropped
function toPlainText(markdown: string): string {
    return markdown
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]/g, '')
        .trim()
}

/**
 * The H2 headings of a Markdown body with the ids rehype-slug gives them, for a table of contents.
 * Every heading level goes through the same slugger, in order, as rehype-slug does, so a repeated
 * title gets the same "-1" suffix here and on the page.
 */
export function getMarkdownHeadings(source: string): MarkdownHeading[] {
    const slugger = new GithubSlugger()
    const headings: MarkdownHeading[] = []
    let inCodeBlock = false

    for (const line of source.split('\n')) {
        if (/^\s*(```|~~~)/.test(line)) {
            inCodeBlock = !inCodeBlock
            continue
        }
        if (inCodeBlock) {
            continue
        }

        const match = /^(#{1,6})\s+(.+?)(?:\s+#+)?\s*$/.exec(line)
        if (!match) {
            continue
        }

        const title = toPlainText(match[2])
        const id = slugger.slug(title)
        if (match[1].length === 2) {
            headings.push({ id, title })
        }
    }

    return headings
}
