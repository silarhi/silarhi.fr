# SILARHI.fr SEO Improvement Strategy

## Executive Summary

This strategy leverages SILARHI's existing 27 project case studies as the foundation for SEO improvement. By implementing structured data, enhanced metadata, and strategic internal linking, we can significantly increase organic visibility without requiring major content rewrites.

**Quick Wins (Immediate, <4 hours):**
- Enhanced metadata templates (title, description, keywords)
- Open Graph & Twitter Card implementation
- Structured data (JSON-LD) for Articles/Projects
- Internal linking via tag system

**Medium-term (1-2 weeks):**
- Content optimization guidelines
- Technical SEO audit fixes
- Semantic HTML improvements
- Image optimization strategy

**Long-term (Ongoing):**
- Topic cluster development
- Content expansion for keyword gaps
- Link building strategy
- Analytics-driven optimization

---

## 1. METADATA ENHANCEMENT STRATEGY

### Current State
- Basic title + description in layout.tsx
- Individual project pages: title + excerpt only
- No Open Graph tags
- No Twitter Cards
- No structured data

### Opportunity
Project frontmatter already contains:
- title, excerpt (summary)
- date, updateDate
- author
- tags
- readingTime

### Implementation

#### 1.1 Enhanced Metadata for Dynamic Project Pages

**File:** `src/app/projets/[slug]/page.tsx`

Replace the current `generateMetadata()` function with an enhanced version:

```typescript
export async function generateMetadata({ params }: ProjectProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {
            title: 'Projet non trouvé - SILARHI',
        }
    }

    const baseUrl = 'https://silarhi.fr'
    const projectUrl = `${baseUrl}/projets/${slug}`
    const tagKeywords = project.tags.map(tag => tag.name).join(', ')

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
            tags: project.tags.map(tag => tag.name),
            images: [
                {
                    url: `${baseUrl}/og-image-default.png`,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                    type: 'image/png',
                }
            ]
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
```

#### 1.2 Enhanced Metadata for Projects Listing Page

**File:** `src/app/projets/page.tsx`

```typescript
export const metadata: Metadata = {
    title: 'Portfolio Projets Web - SILARHI Toulouse',
    description: 'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js. Cas d\'études détaillés de nos réalisations pour PME et grandes entreprises.',
    keywords: ['projets web', 'développement web Toulouse', 'portfolio', 'cas d\'études', 'Symfony', 'PHP', 'Next.js'],
    openGraph: {
        type: 'website',
        title: 'Portfolio Projets Web - SILARHI Toulouse',
        description: 'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js.',
        url: 'https://silarhi.fr/projets',
        siteName: 'SILARHI',
        images: [
            {
                url: 'https://silarhi.fr/og-image-default.png',
                width: 1200,
                height: 630,
                alt: 'SILARHI - Projets Web',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Projets Web - SILARHI Toulouse',
        description: 'Découvrez nos 27+ projets web réalisés avec PHP, Symfony, Next.js.',
        images: ['https://silarhi.fr/og-image-default.png'],
    }
}
```

#### 1.3 Enhanced Root Layout Metadata

**File:** `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
    title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
    description: 'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js. Création d\'applications web performantes et sécurisées.',
    keywords: ['agence web Toulouse', 'développement PHP', 'Symfony', 'Next.js', 'applications web', 'développement custom'],
    metadataBase: new URL('https://silarhi.fr'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://silarhi.fr',
        siteName: 'SILARHI',
        title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
        description: 'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js.',
        images: [{
            url: 'https://silarhi.fr/og-image-default.png',
            width: 1200,
            height: 630,
            alt: 'SILARHI - Agence Web Toulouse',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@SILARHI',
        creator: '@SILARHI',
        title: 'SILARHI - Agence Web PHP Symfony à Toulouse',
        description: 'Agence de développement web à Toulouse spécialisée en PHP, Symfony, et Next.js.',
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
        google: 'YOUR_GOOGLE_SITE_VERIFICATION_ID',
    }
}
```

---

## 2. STRUCTURED DATA IMPLEMENTATION

### Schema.org Markup Strategy

Structured data helps search engines understand page content and enables rich snippets. We'll implement:

1. **Organization Schema** (root layout)
2. **Article Schema** (project pages)
3. **BreadcrumbList Schema** (navigation)
4. **CollectionPage Schema** (projects listing)

### 2.1 Add Structured Data Component

**File:** `src/components/structured-data.tsx`

```typescript
import React from 'react'

interface StructuredDataProps {
    data: Record<string, any>
}

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

### 2.2 Organization Schema (Root Layout)

**File:** `src/app/layout.tsx` (add to body)

Create a utility to generate organization schema:

**File:** `src/utils/schema.ts`

```typescript
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
        description: 'Agence de développement web spécialisée en PHP, Symfony, et Next.js à Toulouse',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'FR',
            addressLocality: 'Toulouse',
            addressRegion: 'Occitanie',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: '+33-XXXXXXXXX',
            email: 'contact@silarhi.fr',
        },
        foundingDate: '2015',
        knowsAbout: ['PHP Development', 'Symfony Framework', 'Next.js', 'Web Development', 'Custom Applications'],
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
            keywords: project.tags.map(tag => tag.name).join(', '),
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

### 2.3 Integrate Structured Data in Pages

**File:** `src/app/projets/[slug]/page.tsx` (add to component)

```typescript
import StructuredData from '@/components/structured-data'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/utils/schema'

// In the component JSX, add after the main article:

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
        { name: 'Accueil', url: 'https://silarhi.fr' },
        { name: 'Projets', url: 'https://silarhi.fr/projets' },
        { name: project.title, url: `https://silarhi.fr/projets/${slug}` },
    ])}
/>
```

**File:** `src/app/projets/page.tsx` (add)

```typescript
import StructuredData from '@/components/structured-data'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/utils/schema'

// In the component JSX:

<StructuredData data={generateCollectionPageSchema()} />
<StructuredData
    data={generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://silarhi.fr' },
        { name: 'Projets', url: 'https://silarhi.fr/projets' },
    ])}
/>
```

**File:** `src/app/layout.tsx` (add)

```typescript
import StructuredData from '@/components/structured-data'
import { generateOrganizationSchema } from '@/utils/schema'

// In the body JSX (or head):

<StructuredData data={generateOrganizationSchema()} />
```

---

## 3. INTERNAL LINKING STRATEGY

### Leveraging the Tag System

The tag system is the key to creating a natural topic cluster structure. Each tag becomes a topic hub.

### 3.1 Tag Page Enhancement

**File:** `src/app/projets/tag/[tag]/page.tsx`

Create comprehensive tag pages that act as topic hubs:

```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import HeroTitle from '@/components/hero-title'
import ProjectGrid from '@/components/project-grid'
import Section from '@/components/section'
import StructuredData from '@/components/structured-data'
import { getTagBySlug } from '@/utils/tags'
import { getAllProjects, getProjectsByTag } from '@/utils/project'
import { generateBreadcrumbSchema } from '@/utils/schema'

interface TagPageProps {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const allProjects = await getAllProjects()
    const tags = new Set<string>()

    allProjects.forEach(project => {
        project.tags.forEach(tag => tags.add(tag.slug))
    })

    return Array.from(tags).map(tag => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag } = await params
    const tagMetadata = await getTagBySlug(tag)
    const projects = await getProjectsByTag(tag)

    if (projects.length === 0) {
        return { title: 'Tag non trouvé - SILARHI' }
    }

    const title = `Projets ${tagMetadata.name} - SILARHI`
    const description = tagMetadata.description
        || `${projects.length} projets web réalisés avec ${tagMetadata.name} par SILARHI, agence de développement à Toulouse`

    return {
        title,
        description,
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
        }
    }
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params
    const tagMetadata = await getTagBySlug(tag)
    const projects = await getProjectsByTag(tag)

    if (projects.length === 0) {
        notFound()
    }

    const breadcrumb = generateBreadcrumbSchema([
        { name: 'Accueil', url: 'https://silarhi.fr' },
        { name: 'Projets', url: 'https://silarhi.fr/projets' },
        { name: tagMetadata.name, url: `https://silarhi.fr/projets/tag/${tag}` },
    ])

    return (
        <>
            <HeroTitle
                title={`Projets ${tagMetadata.name}`}
                subtitle={tagMetadata.description || `${projects.length} projets web réalisés avec ${tagMetadata.name}`}
            />

            <Section>
                <StructuredData data={breadcrumb} />

                <ProjectGrid projects={projects} />

                <div className="mt-8 border-t pt-6">
                    <Link href="/projets" className="text-primary hover:underline">
                        ← Voir tous les projets
                    </Link>
                </div>
            </Section>
        </>
    )
}
```

### 3.2 Strategic Internal Link Placement

#### In Project Pages
- Link to projects with related tags
- Use "See also" section at bottom

**File:** `src/app/projets/[slug]/page.tsx` (add before closing Section)

```typescript
// Add related projects section
{project.tags.length > 0 && (
    <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-lg font-semibold">Projets similaires</h3>
        <div className="grid gap-4 md:grid-cols-2">
            {project.tags.slice(0, 2).map(tag => (
                <Link
                    key={tag.slug}
                    href={`/projets/tag/${tag.slug}`}
                    className="rounded border border-gray-200 p-4 hover:border-primary hover:shadow-sm transition"
                >
                    <h4 className="font-medium">{tag.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Voir tous nos projets {tag.name}
                    </p>
                </Link>
            ))}
        </div>
    </div>
)}
```

#### In Projects Listing
- Show tag cloud with link counts
- Already implemented in `ProjectGrid` - ensure tag links work

---

## 4. CONTENT OPTIMIZATION GUIDELINES

### 4.1 Project Frontmatter Optimization

**Current frontmatter template:**
```yaml
---
title: "Project Title"
date: '2025-08-02'
projectDate: '2023-06-01'
excerpt: "Brief description for SEO (155-160 chars)"
author: 'Author Name'
tags: ['Tag1', 'Tag2', 'Tag3']
published: true
---
```

**SEO Optimization Guidelines for Each Field:**

| Field | SEO Guidelines | Example |
|-------|----------------|---------|
| **title** | Include primary technology + "web" or "app" terms. 55-60 chars. | "API Iris : Reprise et Migration Symfony 6 - SILARHI" |
| **excerpt** | Complete sentence, 155-160 chars. Include benefit/technology. | "Modernisation d'une API Symfony existante : migration PHP 8.2, Symfony 6.3, architecture modulable pour Scan4All." |
| **tags** | 2-5 tags maximum. Use existing tag list for consistency. | ['Symfony', 'API', 'Migration', 'PHP 8'] |
| **date** | Publication date (important for freshness signals) | Latest date for updated content |

**Tag Standardization:**
- Create `src/content/tags/` files for important tags
- Standardize capitalization (e.g., "Symfony" not "symfony")
- Consistent naming across all projects

### 4.2 Content Body Optimization

**Headings Structure (Semantic H2-H3):**
- H1: Automatic from title component
- H2: Main sections (Le client, Notre intervention, Résultats, Technologies)
- H3: Subsections within sections
- Never skip heading levels

**Keyword Density:**
- Natural mention of primary technology/tag in first paragraph
- Include LSI keywords (related terms)
- 0.5-1% keyword density (natural writing)

**Internal Links:**
- Link to home page once in introduction
- Link to related tag pages in sections
- Use descriptive anchor text

**Example optimized content structure:**

```markdown
## About the Client

[Introduction paragraph with natural keyword inclusion]
[Link to related technology tag page]

## Our Intervention

[Detailed explanation of work performed]
- Key accomplishments with relevant terms
- Technology decisions

## Results Achieved

[Quantifiable results and benefits]

## Technologies Used

- Technology (with natural link to tag page)
```

### 4.3 MDX Front Matter Enhancement

Add optional SEO fields to project frontmatter:

```yaml
---
title: "..."
date: '...'
excerpt: "..."
author: '...'
tags: ['...']
published: true
# NEW SEO FIELDS
seoTitle: "Optional longer title for SERP (optional)"
metaKeywords: "keyword1, keyword2, keyword3" # 3-5 keywords
focus_keyword: "primary target keyword"
industries: ['Industry1', 'Industry2'] # NEW: for filtering
company_type: ['B2B', 'Enterprise'] # NEW: for filtering
---
```

Update `ProjectFrontMatter` interface in `src/utils/project.ts`:

```typescript
interface ProjectFrontMatter {
    title: string
    date: string
    updateDate?: string
    excerpt?: string
    author?: string
    tags?: string[]
    published?: boolean
    seoTitle?: string
    metaKeywords?: string
    focus_keyword?: string
    industries?: string[]
    company_type?: string[]
}
```

---

## 5. TECHNICAL SEO IMPROVEMENTS

### 5.1 Robots.txt

**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api
Disallow: /_next
Disallow: /private

Sitemap: https://silarhi.fr/sitemap.xml
```

### 5.2 Sitemap Generation

Create a dynamic sitemap endpoint:

**File:** `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getAllProjects } from '@/utils/project'
import { getAllProjectTags } from '@/utils/project'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://silarhi.fr'
    const projects = await getAllProjects()
    const tags = await getAllProjectTags()

    const projectUrls: MetadataRoute.Sitemap = projects.map(project => ({
        url: `${baseUrl}/projets/${project.slug}`,
        lastModified: new Date(project.updateDate || project.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const tagUrls: MetadataRoute.Sitemap = tags.map(tag => ({
        url: `${baseUrl}/projets/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

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

### 5.3 Open Graph Image Support

Ensure OG image exists and is properly sized:
- **Dimensions:** 1200x630px
- **Format:** PNG or JPG
- **Location:** `public/og-image-default.png`
- **File size:** < 100KB

### 5.4 Mobile Optimization

- Ensure all project content is mobile-responsive
- Test with Mobile-Friendly Test tool
- Check Core Web Vitals in Search Console

### 5.5 Performance Headers

**File:** `next.config.ts` (add security and performance headers)

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
                        value: 'on'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ],
            },
        ]
    },
}

export default nextConfig
```

---

## 6. CONTENT CALENDAR & QUICK WINS TIMELINE

### Phase 1: Quick Wins (Week 1)

**Day 1-2: Metadata Implementation**
- [ ] Update `src/app/projets/[slug]/page.tsx` with enhanced metadata function
- [ ] Update `src/app/projets/page.tsx` with optimized metadata
- [ ] Update `src/app/layout.tsx` with comprehensive metadata
- **Time:** 1-2 hours
- **Impact:** Improved SERP click-through rates, social sharing

**Day 2-3: Structured Data**
- [ ] Create `src/components/structured-data.tsx`
- [ ] Create `src/utils/schema.ts` with all schema generators
- [ ] Integrate schemas in project pages and layout
- **Time:** 1.5-2 hours
- **Impact:** Rich snippets, improved search visibility

**Day 3-4: Internal Linking**
- [ ] Create `src/app/projets/tag/[tag]/page.tsx` with full implementation
- [ ] Add "related projects" section to project pages
- [ ] Ensure all tag links are discoverable
- **Time:** 1.5-2 hours
- **Impact:** Better crawlability, improved pagerank flow

**Day 4-5: Technical SEO**
- [ ] Create `public/robots.txt`
- [ ] Create `src/app/sitemap.ts`
- [ ] Add security headers to `next.config.ts`
- **Time:** 1 hour
- **Impact:** Search console indexing, crawl efficiency

**Total Phase 1: 5-7 hours**

### Phase 2: Content Optimization (Week 2)

**Tasks:**
- [ ] Document content guidelines for projects
- [ ] Audit existing projects for optimization opportunities
- [ ] Update 5-10 highest-traffic projects with enhanced frontmatter
- [ ] Create tag description files (`src/content/tags/*.md`)
- **Time:** 3-4 hours
- **Impact:** Better keyword targeting, improved CTR

### Phase 3: Monitoring & Iteration (Ongoing)

**Tools to implement:**
- Google Search Console integration (verify ownership)
- Google Analytics 4 event tracking
- Rank tracking for target keywords
- Monthly content audits

**Target metrics:**
- 30% increase in organic traffic (3 months)
- 50% increase in project page impressions (3 months)
- 20% improvement in average SERP position (3 months)

---

## 7. KEYWORD STRATEGY

### Core Keywords by Technology

**PHP Development:**
- "développement PHP Toulouse"
- "PHP development services"
- "custom PHP applications"
- "PHP web development"

**Symfony:**
- "Symfony development Toulouse"
- "Symfony web application"
- "Symfony API development"
- "Symfony framework expert"

**Next.js:**
- "Next.js development Toulouse"
- "React Next.js development"
- "Next.js web application"
- "Full-stack Next.js"

**Service Keywords:**
- "web development Toulouse"
- "custom web application"
- "API development"
- "web application migration"

### Tag-Based Keyword Targeting

Create `src/content/tags/*.md` files with metadata:

**File:** `src/content/tags/symfony.md`

```yaml
---
name: Symfony
description: "Symfony est un framework PHP moderne et robuste pour le développement d'applications web d'entreprise. SILARHI maîtrise Symfony 4, 5, et 6."
icon: "⚙️"
color: "bg-blue-500"
---

[Optional: Additional SEO content about Symfony expertise]
```

---

## 8. FUTURE OPPORTUNITIES

### Content Cluster Strategy

Once Phase 1-2 are complete, develop topic clusters:

**Pillar 1: Symfony Development**
- Pillar page: "Complete Guide to Symfony Web Development"
- Supporting content:
  - API Development with Symfony
  - Symfony Migration Guide
  - Symfony Performance Optimization
- Internal links to all Symfony projects

**Pillar 2: Next.js Development**
- Pillar page: "Next.js Web Development Guide"
- Supporting content:
  - Next.js API Routes
  - Next.js Performance
  - Next.js SEO Optimization

**Pillar 3: Web Application Migration**
- Pillar page: "Complete Guide to Web App Migration"
- Supporting content:
  - PHP to Modern Framework Migration
  - Legacy System Modernization
  - API Migration Best Practices

### Content Gap Analysis

Identify keywords with search volume but no content:
- "web application refactoring Toulouse"
- "API development best practices"
- "Symfony vs Laravel comparison"
- "Next.js vs Vue.js"

### External Link Building

- Guest posting on tech blogs (Symfony community, PHP.net)
- Developer resource directories
- Local business directories
- Tech news submissions

---

## 9. SUCCESS METRICS

### Phase 1 Success Criteria (4 weeks)
- [ ] 100% of project pages have complete structured data
- [ ] All pages have proper Open Graph tags
- [ ] Sitemap generated and submitted to Search Console
- [ ] Mobile-Friendly Test: 100% pass rate
- [ ] Core Web Vitals: All green

### Phase 2 Success Criteria (8 weeks)
- [ ] 20+ organic searches generating impressions
- [ ] 10%+ increase in organic traffic
- [ ] Improved SERP positions for target keywords
- [ ] 5+ projects indexed with rich snippets

### Phase 3 Success Criteria (3 months)
- [ ] 30%+ increase in organic traffic
- [ ] 50+ keywords with SERP rankings
- [ ] 5-10 position improvement for main keywords
- [ ] 20+ links from external sources
- [ ] 10%+ increase in project page views from organic

---

## 10. IMPLEMENTATION CHECKLIST

### Pre-Implementation
- [ ] Backup current codebase
- [ ] Create feature branch: `feature/seo-enhancement`
- [ ] Set up Google Search Console
- [ ] Verify site ownership with meta tag

### Phase 1 Implementation
- [ ] Update metadata in all page files
- [ ] Create structured data component and utils
- [ ] Integrate schemas in pages
- [ ] Create/enhance tag pages
- [ ] Add robots.txt and sitemap
- [ ] Add security headers

### Testing
- [ ] Run `yarn build` - no errors
- [ ] Run `yarn lint-ci` - all checks pass
- [ ] Test with Structured Data Testing Tool
- [ ] Test with Mobile-Friendly Test
- [ ] Verify Open Graph with Facebook Sharing Debugger
- [ ] Verify Twitter cards with Twitter Card Validator

### Post-Implementation
- [ ] Create PR with clear description
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Search Console for errors
- [ ] Track keyword rankings
- [ ] Monitor organic traffic in Analytics

---

## 11. RESOURCES

### SEO Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Structured Data Testing Tool](https://schema.org/docs/schemas.html)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Documentation
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org)
- [Open Graph Protocol](https://ogp.me)
- [Twitter Card Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

### Further Learning
- [Google's SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Next.js SEO Best Practices](https://nextjs.org/learn-pages-router/seo/introduction-to-seo)
