# SEO Implementation Guide - Code Changes

Quick reference guide for implementing the SEO strategy. Contains exact code to add to each file.

## File 1: Enhanced Metadata Utilities
**Path:** `src/utils/schema.ts` (NEW FILE)

```typescript
/**
 * Schema.org structured data generators for SEO
 * Used across the site for rich snippets and enhanced search results
 */

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SILARHI',
        url: 'https://silarhi.fr',
        logo: 'https://silarhi.fr/logo.png',
        sameAs: [
            'https://www.linkedin.com/company/silarhi',
            'https://github.com/silarhi',
        ],
        description:
            'Agence de développement web spécialisée en PHP, Symfony, et Next.js à Toulouse',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'FR',
            addressLocality: 'Toulouse',
            addressRegion: 'Occitanie',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@silarhi.fr',
        },
        foundingDate: '2015',
        knowsAbout: [
            'PHP Development',
            'Symfony Framework',
            'Next.js',
            'Web Development',
            'Custom Applications',
        ],
    }
}

export function generateArticleSchema(project: {
    slug: string
    title: string
    excerpt?: string
    date: string
    updateDate?: string
    author: string
    tags: Array<{ name: string; slug: string }>
}) {
    const baseUrl = 'https://silarhi.fr'
    const projectUrl = `${baseUrl}/projets/${project.slug}`

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: project.title,
        description: project.excerpt,
        author: {
            '@type': 'Person',
            name: project.author,
        },
        datePublished: project.date,
        dateModified: project.updateDate || project.date,
        image: `${baseUrl}/og-image-default.png`,
        url: projectUrl,
        isPartOf: {
            '@type': 'WebSite',
            url: baseUrl,
            name: 'SILARHI',
        },
        mainEntity: {
            '@type': 'SoftwareApplication',
            name: project.title,
            keywords: project.tags
                .map((tag) => tag.name)
                .join(', '),
        },
        articleSection: 'Projects',
        inLanguage: 'fr-FR',
    }
}

export function generateBreadcrumbSchema(items: Array<{
    name: string
    url: string
}>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export function generateCollectionPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projets Web SILARHI',
        description: 'Portfolio de projets web réalisés par SILARHI',
        url: 'https://silarhi.fr/projets',
        isPartOf: {
            '@type': 'WebSite',
            url: 'https://silarhi.fr',
            name: 'SILARHI',
        },
    }
}
```

---

## File 2: Structured Data Component
**Path:** `src/components/structured-data.tsx` (NEW FILE)

```typescript
import React from 'react'

interface StructuredDataProps {
    data: Record<string, any>
}

/**
 * Renders JSON-LD structured data for search engines
 * Used for rich snippets and enhanced SERP features
 */
export default function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    )
}
```

---

## File 3: Update Root Layout
**Path:** `src/app/layout.tsx`

Replace the entire metadata object with:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
    description:
        'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js. Création d\'applications web performantes et sécurisées.',
    keywords: [
        'agence web Toulouse',
        'développement PHP',
        'Symfony',
        'Next.js',
        'applications web',
        'développement custom',
    ],
    metadataBase: new URL('https://silarhi.fr'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://silarhi.fr',
        siteName: 'SILARHI',
        title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
        description:
            'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js.',
        images: [
            {
                url: 'https://silarhi.fr/og-image-default.png',
                width: 1200,
                height: 630,
                alt: 'SILARHI - Agence Web Toulouse',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@SILARHI',
        creator: '@SILARHI',
        title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
        description:
            'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js.',
        images: ['https://silarhi.fr/og-image-default.png'],
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/shortcut-icon.png',
        apple: '/apple-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon-precomposed.png',
        },
    },
    verification: {
        google: 'YOUR_GOOGLE_SITE_VERIFICATION_ID', // Replace with actual verification code
    },
}
```

Also add to the body (before `<DefaultLayout>`):

```typescript
import StructuredData from '@/components/structured-data'
import { generateOrganizationSchema } from '@/utils/schema'

// In the body JSX:
<StructuredData data={generateOrganizationSchema()} />
```

---

## File 4: Update Projects Listing Page
**Path:** `src/app/projets/page.tsx`

Replace the metadata export with:

```typescript
export const metadata: Metadata = {
    title: 'Portfolio Projets Web - SILARHI Toulouse',
    description:
        'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js. Cas d\'études détaillés de nos réalisations pour PME et grandes entreprises.',
    keywords: [
        'projets web',
        'développement web Toulouse',
        'portfolio',
        'cas d\'études',
        'Symfony',
        'PHP',
        'Next.js',
    ],
    openGraph: {
        type: 'website',
        title: 'Portfolio Projets Web - SILARHI Toulouse',
        description:
            'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js.',
        url: 'https://silarhi.fr/projets',
        siteName: 'SILARHI',
        images: [
            {
                url: 'https://silarhi.fr/og-image-default.png',
                width: 1200,
                height: 630,
                alt: 'SILARHI - Projets Web',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Projets Web - SILARHI Toulouse',
        description:
            'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js.',
        images: ['https://silarhi.fr/og-image-default.png'],
    },
}
```

Add imports and structured data to the component:

```typescript
import StructuredData from '@/components/structured-data'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/utils/schema'

// Inside the JSX, after the HeroTitle and before Section:
<StructuredData data={generateCollectionPageSchema()} />
<StructuredData
    data={generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://silarhi.fr' },
        { name: 'Projets', url: 'https://silarhi.fr/projets' },
    ])}
/>
```

---

## File 5: Update Dynamic Project Page
**Path:** `src/app/projets/[slug]/page.tsx`

Replace the entire file with:

```typescript
import { Metadata } from 'next'
import Link, { LinkProps } from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'

import Button from '@/components/button'
import HeroTitle from '@/components/hero-title'
import { MDXImage } from '@/components/mdx-image'
import ProjectMetadata from '@/components/project-metadata'
import Section from '@/components/section'
import StructuredData from '@/components/structured-data'
import { getAllProjectSlugs, getProjectBySlug } from '@/utils/project'
import {
    generateArticleSchema,
    generateBreadcrumbSchema,
} from '@/utils/schema'

interface ProjectProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

// MDX Components with optimized images
const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="mt-5 mb-3" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="mt-4 mb-3" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote
            className="border-primary my-4 border-l-4 pl-3 italic"
            {...props}
        />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code className="rounded bg-gray-100 px-1" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="text-surface my-3 overflow-auto rounded bg-gray-900 p-3"
            {...props}
        />
    ),
    a: CustomLink,
    img: MDXImage,
    Image: MDXImage,
}

function CustomLink({
    href,
    ...props
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    if (href.startsWith('/')) {
        return <Link href={href} {...props} />
    }

    if (href.startsWith('#')) {
        return <a {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({
    params,
}: ProjectProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {
            title: 'Projet non trouvé - SILARHI',
        }
    }

    const baseUrl = 'https://silarhi.fr'
    const projectUrl = `${baseUrl}/projets/${slug}`
    const tagKeywords = project.tags
        .map((tag) => tag.name)
        .join(', ')

    // Extract primary technology from tags (usually first tag)
    const primaryTech = project.tags[0]?.name || 'Web Development'

    // Generate SEO-optimized title (55-60 chars)
    const title = `${project.title} | SILARHI`

    // Generate SEO-optimized description (155-160 chars)
    const description = project.excerpt
        ? `${project.excerpt.substring(0, 150)}...`
        : `Projet web ${primaryTech} réalisé par SILARHI, agence de développement à Toulouse. ${project.author}`

    return {
        title,
        description,
        keywords: [
            'développement web',
            'agence web Toulouse',
            primaryTech,
            'Symfony',
            'Next.js',
            'PHP',
            tagKeywords,
        ].filter(Boolean),
        authors: [{ name: project.author }],
        creator: 'SILARHI',
        openGraph: {
            type: 'article',
            title,
            description,
            url: projectUrl,
            siteName: 'SILARHI - Agence Web Toulouse',
            publishedTime: project.date,
            modifiedTime: project.updateDate || project.date,
            authors: [project.author],
            tags: project.tags.map((tag) => tag.name),
            images: [
                {
                    url: `${baseUrl}/og-image-default.png`,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                    type: 'image/png',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: '@SILARHI',
            images: [`${baseUrl}/og-image-default.png`],
        },
        canonical: projectUrl,
        alternates: {
            canonical: projectUrl,
        },
    }
}

export default async function ProjectProjectPage({
    params,
}: ProjectProjectPageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return (
        <>
            <HeroTitle
                title={project.title}
                subtitle={project.excerpt}
            />
            <Section>
                <div className="flex justify-center">
                    <div className="w-full lg:w-5/6">
                        <StructuredData
                            data={generateArticleSchema({
                                slug,
                                title: project.title,
                                excerpt: project.excerpt,
                                date: project.date,
                                updateDate: project.updateDate,
                                author: project.author,
                                tags: project.tags,
                            })}
                        />

                        <StructuredData
                            data={generateBreadcrumbSchema([
                                {
                                    name: 'Accueil',
                                    url: 'https://silarhi.fr',
                                },
                                {
                                    name: 'Projets',
                                    url: 'https://silarhi.fr/projets',
                                },
                                {
                                    name: project.title,
                                    url: `https://silarhi.fr/projets/${slug}`,
                                },
                            ])}
                        />

                        <div className="mb-4">
                            <ProjectMetadata
                                author={project.author}
                                readingTime={project.readingTime}
                                date={project.date}
                                updateDate={project.updateDate}
                                className="mb-3"
                            />

                            {project.tags.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                        <Button
                                            as="a"
                                            key={tag.slug}
                                            href={`/projets/tag/${tag.slug}`}
                                            size="sm"
                                        >
                                            {tag.name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <article className="prose max-w-none">
                            <MDXRemote
                                source={project.content}
                                components={mdxComponents}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                        rehypePlugins: [
                                            rehypeSlug,
                                            rehypeAutolinkHeadings,
                                            rehypeUnwrapImages,
                                        ],
                                    },
                                }}
                            />
                        </article>

                        {project.tags.length > 0 && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Projets similaires
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {project.tags.slice(0, 2).map((tag) => (
                                        <Link
                                            key={tag.slug}
                                            href={`/projets/tag/${tag.slug}`}
                                            className="rounded border border-gray-200 p-4 transition hover:border-primary hover:shadow-sm"
                                        >
                                            <h4 className="font-medium">
                                                {tag.name}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Voir tous nos
                                                projets {tag.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-5 border-t pt-4">
                            <Button
                                as="a"
                                href="/projets"
                                variant="outline-primary"
                            >
                                ← Retour aux projets
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}
```

---

## File 6: Create Tag Page
**Path:** `src/app/projets/tag/[tag]/page.tsx` (NEW FILE)

```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import StructuredData from '@/components/structured-data'
import { getAllProjects, getProjectsByTag } from '@/utils/project'
import { getTagBySlug } from '@/utils/tags'
import { generateBreadcrumbSchema } from '@/utils/schema'

interface TagPageProps {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const allProjects = await getAllProjects()
    const tags = new Set<string>()

    allProjects.forEach((project) => {
        project.tags.forEach((tag) =>
            tags.add(tag.slug)
        )
    })

    return Array.from(tags).map((tag) => ({
        tag: tag.toLowerCase(),
    }))
}

export async function generateMetadata({
    params,
}: TagPageProps): Promise<Metadata> {
    const { tag } = await params
    const tagMetadata = await getTagBySlug(tag)
    const projects = await getProjectsByTag(tag)

    if (projects.length === 0) {
        return { title: 'Tag non trouvé - SILARHI' }
    }

    const title = `Projets ${tagMetadata.name} - SILARHI`
    const description =
        tagMetadata.description ||
        `${projects.length} projets web réalisés avec ${tagMetadata.name} par SILARHI, agence de développement à Toulouse`

    return {
        title,
        description,
        keywords: [
            tagMetadata.name,
            'développement web',
            'projets web Toulouse',
        ],
        openGraph: {
            type: 'website',
            title,
            description,
            url: `https://silarhi.fr/projets/tag/${tag}`,
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    }
}

export default async function TagPage({
    params,
}: TagPageProps) {
    const { tag } = await params
    const tagMetadata = await getTagBySlug(tag)
    const projects = await getProjectsByTag(tag)

    if (projects.length === 0) {
        notFound()
    }

    const breadcrumb = generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://silarhi.fr' },
        {
            name: 'Projets',
            url: 'https://silarhi.fr/projets',
        },
        {
            name: tagMetadata.name,
            url: `https://silarhi.fr/projets/tag/${tag}`,
        },
    ])

    return (
        <>
            <HeroTitle
                title={`Projets ${tagMetadata.name}`}
                subtitle={
                    tagMetadata.description ||
                    `${projects.length} projets web réalisés avec ${tagMetadata.name}`
                }
            />

            <Section>
                <StructuredData data={breadcrumb} />

                <ProjectGrid projects={projects} />

                <div className="mt-8 border-t pt-6">
                    <Link
                        href="/projets"
                        className="text-primary hover:underline"
                    >
                        ← Voir tous les projets
                    </Link>
                </div>
            </Section>
        </>
    )
}
```

---

## File 7: Create Sitemap
**Path:** `src/app/sitemap.ts` (NEW FILE)

```typescript
import { MetadataRoute } from 'next'

import { getAllProjects } from '@/utils/project'
import { getAllProjectTags } from '@/utils/project'

export default async function sitemap(): Promise<
    MetadataRoute.Sitemap
> {
    const baseUrl = 'https://silarhi.fr'
    const projects = await getAllProjects()
    const tags = await getAllProjectTags()

    const projectUrls: MetadataRoute.Sitemap = projects.map(
        (project) => ({
            url: `${baseUrl}/projets/${project.slug}`,
            lastModified: new Date(
                project.updateDate || project.date
            ),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })
    )

    const tagUrls: MetadataRoute.Sitemap = tags.map(
        (tag) => ({
            url: `${baseUrl}/projets/tag/${tag.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        })
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/projets`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...projectUrls,
        ...tagUrls,
    ]
}
```

---

## File 8: Create robots.txt
**Path:** `public/robots.txt` (NEW FILE)

```
User-agent: *
Allow: /
Disallow: /api
Disallow: /_next
Disallow: /private

Sitemap: https://silarhi.fr/sitemap.xml
```

---

## File 9: Update next.config.ts (Optional but Recommended)
**Path:** `next.config.ts`

Add security headers:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    headers: async () => {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
```

---

## Implementation Checklist

### Before You Start
- [ ] Create feature branch: `git checkout -b feature/seo-enhancement`
- [ ] Have Google Site Verification ID ready
- [ ] Have OG image ready (1200x630px, <100KB)

### File Creation/Updates
- [ ] Create `src/utils/schema.ts`
- [ ] Create `src/components/structured-data.tsx`
- [ ] Update `src/app/layout.tsx` (metadata + imports)
- [ ] Update `src/app/projets/page.tsx` (metadata + imports)
- [ ] Replace `src/app/projets/[slug]/page.tsx`
- [ ] Create `src/app/projets/tag/[tag]/page.tsx`
- [ ] Create `src/app/sitemap.ts`
- [ ] Create `public/robots.txt`
- [ ] Update `next.config.ts` (optional)

### Testing
```bash
# Verify no TypeScript errors
yarn typecheck

# Verify no ESLint issues
yarn lint

# Verify no unused code
yarn knip

# Build the project
yarn build

# Start dev server and test
yarn dev
```

### Validation Tools
1. **Structured Data Testing:** https://schema.org/docs/schemas.html
2. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
3. **PageSpeed Insights:** https://pagespeed.web.dev
4. **Open Graph Debugger:** https://developers.facebook.com/tools/debug/
5. **Twitter Card Validator:** https://cards-dev.twitter.com/validator

### Search Console Setup
1. Submit sitemap: `https://silarhi.fr/sitemap.xml`
2. Request indexing for homepage
3. Monitor crawl errors
4. Check coverage report

---

## Quick Reference: What Each File Does

| File | Purpose |
|------|---------|
| `schema.ts` | Generates JSON-LD structured data for search engines |
| `structured-data.tsx` | Component that renders schema.org markup |
| `layout.tsx` | Root metadata + Organization schema |
| `projets/page.tsx` | Projects listing metadata + Collection schema |
| `projets/[slug]/page.tsx` | Project page metadata + Article schema + breadcrumbs |
| `projets/tag/[tag]/page.tsx` | Tag page for topic clustering + internal links |
| `sitemap.ts` | XML sitemap generation for search engines |
| `robots.txt` | Search engine crawling instructions |

---

## Expected Timeline

- **File creation/updates:** 1-2 hours
- **Testing & validation:** 1 hour
- **Total:** 2-3 hours for complete Phase 1 implementation
