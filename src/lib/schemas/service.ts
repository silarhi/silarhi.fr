/**
 * JSON-LD Schema generators for service pages
 */

import type { Service } from '@/utils/service'
import { getCanonicalUrl } from '@/utils/url'

import {
    type BreadcrumbList,
    COMPANY_INFO,
    type FAQPage,
    generateBreadcrumbSchema,
    type Organization,
    type Service as ServiceSchema,
    type WebPage,
} from './index'

/**
 * Generate WebPage schema for a service page
 */
export function generateServicePageSchema(service: Service): WebPage {
    const url = getCanonicalUrl(`/${service.slug}`)

    return {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        name: `${service.meta_title} - SILARHI`,
        description: service.meta_description,
        url,
        isPartOf: {
            '@id': `${COMPANY_INFO.url}/#website`,
        },
        breadcrumb: generateServiceBreadcrumbSchema(service),
    }
}

/**
 * Generate BreadcrumbList schema for a service page
 * The intermediate "Services" crumb points at the services section of the homepage
 */
function generateServiceBreadcrumbSchema(service: Service): BreadcrumbList {
    return generateBreadcrumbSchema([
        { name: 'Accueil', url: COMPANY_INFO.url },
        { name: 'Services', url: `${COMPANY_INFO.url}/#services` },
        { name: service.title, url: getCanonicalUrl(`/${service.slug}`) },
    ])
}

/**
 * Generate Service schema describing the offer, provided by the organization
 */
export function generateServiceSchema(service: Service): ServiceSchema {
    const url = getCanonicalUrl(`/${service.slug}`)

    return {
        '@type': 'Service',
        '@id': `${url}/#service`,
        name: service.title,
        description: service.meta_description,
        url,
        serviceType: service.service_type,
        provider: { '@id': `${COMPANY_INFO.url}/#organization` } as Organization,
        areaServed: [
            { '@type': 'Place', name: 'Toulouse' },
            { '@type': 'Place', name: 'France' },
        ],
    }
}

/**
 * Generate FAQPage schema from the questions visible on the page
 */
export function generateServiceFaqSchema(service: Service): FAQPage {
    const url = getCanonicalUrl(`/${service.slug}`)

    return {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: service.faq.map((item) => ({
            '@type': 'Question' as const,
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer' as const,
                text: item.answer,
            },
        })),
    }
}
