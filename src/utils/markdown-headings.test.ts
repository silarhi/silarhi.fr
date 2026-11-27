import { describe, expect, it } from 'vitest'

import { getMarkdownHeadings } from './markdown-headings'

describe('getMarkdownHeadings', () => {
    it('lists the H2 headings with the ids rehype-slug gives them', () => {
        const source = [
            '## Quand un logiciel sur mesure est-il le bon choix ?',
            'Du texte.',
            "## Notre méthode, de l'idée à la mise en production",
        ].join('\n')

        expect(getMarkdownHeadings(source)).toEqual([
            {
                id: 'quand-un-logiciel-sur-mesure-est-il-le-bon-choix-',
                title: 'Quand un logiciel sur mesure est-il le bon choix ?',
            },
            {
                id: 'notre-méthode-de-lidée-à-la-mise-en-production',
                title: "Notre méthode, de l'idée à la mise en production",
            },
        ])
    })

    it('numbers repeated titles across heading levels, in page order', () => {
        const source = ['### Tarifs', '## Tarifs', '## Tarifs'].join('\n')

        expect(getMarkdownHeadings(source).map((heading) => heading.id)).toEqual(['tarifs-1', 'tarifs-2'])
    })

    it('strips inline Markdown from the title', () => {
        expect(getMarkdownHeadings('## Le format **CFONB** et [EBICS](/technologies/ebics) `240`')).toEqual([
            { id: 'le-format-cfonb-et-ebics-240', title: 'Le format CFONB et EBICS 240' },
        ])
    })

    it('ignores other levels and lines inside code blocks', () => {
        const source = ['# Titre', '### Sous-partie', '```md', '## Pas un titre', '```', '## Vrai titre'].join('\n')

        expect(getMarkdownHeadings(source)).toEqual([{ id: 'vrai-titre', title: 'Vrai titre' }])
    })
})
