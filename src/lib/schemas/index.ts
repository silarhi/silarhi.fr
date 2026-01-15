/**
 * JSON-LD Schema.org structured data utilities
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { getBaseUrl } from '@/utils/url'

// Base types for schema.org
export interface Thing {
    '@type': string
    name?: string
    description?: string
    url?: string
    image?: string | ImageObject
}

interface ImageObject {
    '@type': 'ImageObject'
    url: string
    width?: number
    height?: number
}

export interface Organization {
    '@type': 'Organization'
    '@id'?: string
    name: string
    url: string
    logo?: string | ImageObject
    description?: string
    foundingDate?: string
    address?: PostalAddress
    contactPoint?: ContactPoint[]
    sameAs?: string[]
}

interface LocalBusiness {
    '@type': 'LocalBusiness' | 'ProfessionalService'
    '@id'?: string
    name: string
    url: string
    logo?: string | ImageObject
    description?: string
    foundingDate?: string
    address?: PostalAddress
    contactPoint?: ContactPoint[]
    sameAs?: string[]
    priceRange?: string
    telephone?: string
    email?: string
    openingHoursSpecification?: OpeningHoursSpecification[]
    areaServed?: string | Place | Place[]
    geo?: GeoCoordinates
}

interface PostalAddress {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
    addressRegion?: string
}

interface ContactPoint {
    '@type': 'ContactPoint'
    telephone?: string
    email?: string
    contactType: string
    availableLanguage?: string | string[]
}

interface OpeningHoursSpecification {
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
}

interface GeoCoordinates {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
}

interface Place {
    '@type': 'Place'
    name: string
}

interface WebSite {
    '@type': 'WebSite'
    '@id'?: string
    name: string
    url: string
    description?: string
    publisher?: Organization
    potentialAction?: SearchAction
}

interface SearchAction {
    '@type': 'SearchAction'
    target: {
        '@type': 'EntryPoint'
        urlTemplate: string
    }
    'query-input': string
}

export interface WebPage {
    '@type': 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
    '@id'?: string
    name: string
    description?: string
    url: string
    isPartOf?: { '@id': string }
    breadcrumb?: BreadcrumbList
    mainEntity?: Thing
}

export interface BreadcrumbList {
    '@type': 'BreadcrumbList'
    itemListElement: BreadcrumbItem[]
}

interface BreadcrumbItem {
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
}

export interface CreativeWork {
    '@type': 'CreativeWork' | 'SoftwareApplication' | 'WebApplication'
    name: string
    description?: string
    url?: string
    image?: string | ImageObject
    dateCreated?: string
    datePublished?: string
    author?: Organization
    creator?: Organization
    provider?: Organization
    about?: Thing
    keywords?: string[]
    applicationCategory?: string
}

interface Service {
    '@type': 'Service'
    name: string
    description?: string
    provider?: Organization
    serviceType?: string
    areaServed?: string | Place | Place[]
}

export interface ItemList {
    '@type': 'ItemList'
    name?: string
    description?: string
    itemListElement: ListItem[]
    numberOfItems?: number
}

interface ListItem {
    '@type': 'ListItem'
    position: number
    name?: string
    url?: string
    item?: CreativeWork | Thing
}

// Company information constants
export const COMPANY_INFO = {
    name: 'SILARHI',
    legalName: 'SILARHI',
    description:
        "Agence de développement Web PHP spécialisée dans la réalisation d'applications Web sur mesure à Toulouse et en France.",
    foundingDate: '2018-08-01',
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/icon.png`,
    telephone: '+33607275826',
    email: 'hello@silarhi.fr',
    address: {
        streetAddress: "116 Route d'Espagne, HELIOS 4, BAT 113",
        addressLocality: 'Toulouse',
        postalCode: '31100',
        addressCountry: 'FR',
        addressRegion: 'Occitanie',
    },
    geo: {
        latitude: 43.5667,
        longitude: 1.4,
    },
    socialProfiles: ['https://github.com/silarhi', 'https://www.linkedin.com/company/silarhi'],
}

/**
 * Generate the base Organization schema
 */
export function generateOrganizationSchema(): Organization {
    return {
        '@type': 'Organization',
        '@id': `${COMPANY_INFO.url}/#organization`,
        name: COMPANY_INFO.name,
        url: COMPANY_INFO.url,
        logo: {
            '@type': 'ImageObject',
            url: COMPANY_INFO.logo,
        },
        description: COMPANY_INFO.description,
        foundingDate: COMPANY_INFO.foundingDate,
        address: {
            '@type': 'PostalAddress',
            ...COMPANY_INFO.address,
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: COMPANY_INFO.telephone,
                email: COMPANY_INFO.email,
                contactType: 'customer service',
                availableLanguage: ['French', 'English'],
            },
        ],
        sameAs: COMPANY_INFO.socialProfiles,
    }
}

/**
 * Generate LocalBusiness schema for the agency
 */
export function generateLocalBusinessSchema(): LocalBusiness {
    return {
        '@type': 'ProfessionalService',
        '@id': `${COMPANY_INFO.url}/#localbusiness`,
        name: COMPANY_INFO.name,
        url: COMPANY_INFO.url,
        logo: {
            '@type': 'ImageObject',
            url: COMPANY_INFO.logo,
        },
        description: COMPANY_INFO.description,
        foundingDate: COMPANY_INFO.foundingDate,
        telephone: COMPANY_INFO.telephone,
        email: COMPANY_INFO.email,
        priceRange: '€€€',
        address: {
            '@type': 'PostalAddress',
            ...COMPANY_INFO.address,
        },
        geo: {
            '@type': 'GeoCoordinates',
            ...COMPANY_INFO.geo,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        areaServed: [
            { '@type': 'Place', name: 'Toulouse' },
            { '@type': 'Place', name: 'France' },
        ],
        sameAs: COMPANY_INFO.socialProfiles,
    }
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(): WebSite {
    return {
        '@type': 'WebSite',
        '@id': `${COMPANY_INFO.url}/#website`,
        name: COMPANY_INFO.name,
        url: COMPANY_INFO.url,
        description: COMPANY_INFO.description,
        publisher: {
            '@id': `${COMPANY_INFO.url}/#organization`,
        } as Organization,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${COMPANY_INFO.url}/projets?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(options: {
    name: string
    description?: string
    url: string
    type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
    breadcrumbs?: { name: string; url?: string }[]
}): WebPage {
    const schema: WebPage = {
        '@type': options.type || 'WebPage',
        '@id': `${options.url}/#webpage`,
        name: options.name,
        description: options.description,
        url: options.url,
        isPartOf: {
            '@id': `${COMPANY_INFO.url}/#website`,
        },
    }

    if (options.breadcrumbs && options.breadcrumbs.length > 0) {
        schema.breadcrumb = generateBreadcrumbSchema(options.breadcrumbs)
    }

    return schema
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url?: string }[]): BreadcrumbList {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem' as const,
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

/**
 * Generate Service schema for web development services
 */
export function generateServicesSchema(): Service[] {
    return [
        {
            '@type': 'Service',
            name: "Développement d'applications Web",
            description: "Développement d'applications Web sur mesure (CRM, ERP, gestion) avec PHP et Symfony.",
            provider: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
            serviceType: 'Web Development',
            areaServed: [
                { '@type': 'Place', name: 'Toulouse' },
                { '@type': 'Place', name: 'France' },
            ],
        },
        {
            '@type': 'Service',
            name: 'Développement API',
            description: "Développement spécifique d'API REST et GraphQL.",
            provider: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
            serviceType: 'API Development',
            areaServed: [
                { '@type': 'Place', name: 'Toulouse' },
                { '@type': 'Place', name: 'France' },
            ],
        },
        {
            '@type': 'Service',
            name: 'Migration Symfony & PHP',
            description: 'Migration de version Symfony et PHP pour applications existantes.',
            provider: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
            serviceType: 'Software Migration',
            areaServed: [
                { '@type': 'Place', name: 'Toulouse' },
                { '@type': 'Place', name: 'France' },
            ],
        },
    ]
}
