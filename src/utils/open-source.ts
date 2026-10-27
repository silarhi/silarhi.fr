/**
 * Open-source packages maintained by SILARHI, each documented on its own site at https://<slug>.silarhi.dev.
 *
 * The English registry of these sites is `packages.js` in github.com/silarhi/docs-kit: add a package there first,
 * then here with a French description.
 */
export interface OpenSourcePackage {
    slug: string
    name: string
    description: string
    /** Composer package name, on Packagist. */
    composer: string
    /** Slugs of the technology pages (`content/technologies`) that list the package. */
    technologies: string[]
}

export const OPEN_SOURCE_PACKAGES: OpenSourcePackage[] = [
    {
        slug: 'picasso-bundle',
        name: 'Picasso Bundle',
        description:
            'Images responsives pour Symfony : un composant Twig génère AVIF, WebP, srcset, placeholder flouté et lazy loading, avec Glide ou Imgix.',
        composer: 'silarhi/picasso-bundle',
        technologies: ['symfony', 'twig', 'php'],
    },
    {
        slug: 'tabler-ux-components',
        name: 'Tabler UX Components',
        description:
            'Composants Twig UX aux couleurs de Tabler pour Symfony, composables sur le modèle de shadcn : alertes, cartes, modales, menus…',
        composer: 'silarhi/tabler-ux-components',
        technologies: ['symfony', 'twig', 'bootstrap'],
    },
    {
        slug: 'turbo-bundle',
        name: 'Turbo Bundle',
        description:
            'Outils Hotwire Turbo : un orchestrateur de cycle de vie côté navigateur et le suivi des redirections dans les frames côté Symfony.',
        composer: 'silarhi/turbo-bundle',
        technologies: ['symfony', 'twig'],
    },
    {
        slug: 'ux-icons-js-bundle',
        name: 'UX Icons JS Bundle',
        description:
            'Les icônes Symfony UX Icons en JavaScript, React et Vue, avec les mêmes attributs et la même configuration que ux_icon().',
        composer: 'silarhi/ux-icons-js-bundle',
        technologies: ['symfony', 'react'],
    },
    {
        slug: 'llms-txt-bundle',
        name: 'LLMs.txt Bundle',
        description:
            'Génère, exporte et sert le fichier llms.txt d’une application Symfony, pour la rendre lisible par les moteurs de réponse IA.',
        composer: 'silarhi/llms-txt-bundle',
        technologies: ['symfony', 'php'],
    },
    {
        slug: 'cursor-pagination',
        name: 'Cursor Pagination',
        description:
            'Pagination par curseur (keyset) pour Doctrine ORM : parcourt de grandes tables en lots à vitesse constante.',
        composer: 'silarhi/cursor-pagination',
        technologies: ['php', 'symfony'],
    },
    {
        slug: 'cfonb-parser',
        name: 'CFONB Parser',
        description:
            'Lecture des relevés et virements bancaires au format CFONB 120 et 240 en PHP, sans aucune dépendance.',
        composer: 'silarhi/cfonb-parser',
        technologies: ['php', 'ebics'],
    },
    {
        slug: 'caf-parser',
        name: 'CAF Parser',
        description: 'Lecture des fichiers de paiement LA44ZZ de la CAF (Caisse d’Allocations Familiales) en PHP.',
        composer: 'silarhi/caf-parser',
        technologies: ['php'],
    },
    {
        slug: 'qif-library',
        name: 'QIF Library',
        description: 'Lecture et écriture de fichiers QIF (Quicken Interchange Format) en PHP.',
        composer: 'silarhi/qif-library',
        technologies: ['php'],
    },
]

export const getDocsUrl = (pkg: OpenSourcePackage) => `https://${pkg.slug}.silarhi.dev`

export const getPackagesByTechnology = (technology: string) =>
    OPEN_SOURCE_PACKAGES.filter((pkg) => pkg.technologies.includes(technology))

// Resolve package slugs listed in content; a typo must fail the build, not hide a card
export const getPackagesBySlugs = (slugs: string[]) =>
    slugs.map((slug) => {
        const pkg = OPEN_SOURCE_PACKAGES.find((candidate) => candidate.slug === slug)
        if (!pkg) {
            throw new Error(`Unknown open-source package "${slug}"`)
        }
        return pkg
    })
