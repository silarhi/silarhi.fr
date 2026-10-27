/**
 * JSON-LD Schema generators for the open-source page
 */

import { getDocsUrl, type OpenSourcePackage } from '@/utils/open-source'
import { getCanonicalUrl } from '@/utils/url'

import { COMPANY_INFO, generateBreadcrumbSchema, type ItemList, type Thing, type WebPage } from './index'

interface SoftwareSourceCode extends Thing {
    '@type': 'SoftwareSourceCode'
    codeRepository: string
    programmingLanguage: string
    license: string
    author: { '@id': string }
}

/**
 * Generate a SoftwareSourceCode schema for a package: its documentation site describes it under the same `@id`
 */
function generatePackageSchema(pkg: OpenSourcePackage): SoftwareSourceCode {
    const url = getDocsUrl(pkg)

    return {
        '@type': 'SoftwareSourceCode',
        name: pkg.name,
        description: pkg.description,
        url,
        codeRepository: `https://github.com/silarhi/${pkg.slug}`,
        programmingLanguage: 'PHP',
        license: 'https://opensource.org/licenses/MIT',
        author: { '@id': `${COMPANY_INFO.url}/#organization` },
    }
}

/**
 * Generate CollectionPage and ItemList schemas for the open-source page
 */
export function generateOpenSourcePageSchemas(packages: OpenSourcePackage[]): [WebPage, ItemList] {
    const url = getCanonicalUrl('/open-source')

    return [
        {
            '@type': 'CollectionPage',
            '@id': `${url}/#webpage`,
            name: 'Open source - SILARHI',
            description: 'Les bibliothèques PHP et bundles Symfony open source développés et maintenus par SILARHI.',
            url,
            isPartOf: { '@id': `${COMPANY_INFO.url}/#website` },
            breadcrumb: generateBreadcrumbSchema([
                { name: 'Accueil', url: COMPANY_INFO.url },
                { name: 'Open source', url },
            ]),
        },
        {
            '@type': 'ItemList',
            name: 'Packages open source SILARHI',
            numberOfItems: packages.length,
            itemListElement: packages.map((pkg, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: generatePackageSchema(pkg),
            })),
        },
    ]
}
