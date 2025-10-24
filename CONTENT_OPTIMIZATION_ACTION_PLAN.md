# Content Optimization Action Plan

This document provides a step-by-step implementation plan for optimizing existing project content on SILARHI.fr following the guidelines in `CONTENT_OPTIMIZATION_GUIDE.md`.

## Overview

**Current State:**
- 27 project MDX files in `src/content/projects/`
- Basic frontmatter (title, date, excerpt, author, tags)
- Good content structure but inconsistent depth
- Some projects have excellent detail (api-iris.mdx), others are brief

**Target State:**
- All projects optimized for SEO
- Consistent content depth (minimum 300-500 words)
- Enhanced metadata for better search visibility
- Strong E-E-A-T signals throughout
- Internal linking strategy implemented

---

## Phase 1: Foundation (Week 1)

### 1.1 Enhanced Metadata Schema

Add optional fields to support richer content without breaking existing projects.

**File:** `src/utils/project.ts`

Update interfaces to support new optional fields:

```typescript
export interface ProjectProject {
    slug: string
    title: string
    date: string
    updateDate?: string
    projectDate?: string           // NEW: Actual project completion date
    excerpt?: string
    author: string
    tags: TagMetadata[]
    published: boolean
    content: string
    readingTime: string

    // NEW: Enhanced SEO fields (all optional)
    metaDescription?: string       // Custom meta description
    focusKeyword?: string          // Primary SEO keyword
    client?: string                // Client company name
    clientIndustry?: string        // Healthcare, Finance, etc.
    projectDuration?: string       // "3 months", "6 weeks", etc.
    teamSize?: number              // Number of people
    projectUrl?: string            // Public URL if available
    featuredImage?: string         // Path to hero image
}

interface ProjectFrontMatter {
    title: string
    date: string
    updateDate?: string
    projectDate?: string           // NEW
    excerpt?: string
    author?: string
    tags?: string[]
    published?: boolean

    // NEW: Enhanced fields
    metaDescription?: string
    focusKeyword?: string
    client?: string
    clientIndustry?: string
    projectDuration?: string
    teamSize?: number
    projectUrl?: string
    featuredImage?: string
}
```

**Implementation steps:**
1. Update TypeScript interfaces in `src/utils/project.ts`
2. Ensure backward compatibility (all new fields optional)
3. Update `getProjectBySlug` to pass through new fields
4. Run `yarn typecheck` to verify no breaking changes

### 1.2 Tag Standardization

Create comprehensive tag metadata files.

**Priority tags to create:**

1. `src/content/tags/symfony.md`
```yaml
---
name: Symfony
slug: symfony
description: "Framework PHP moderne et robuste pour applications web d'entreprise. SILARHI expertise Symfony 4, 5, et 6 pour des projets scalables et maintenables."
icon: "⚙️"
color: "bg-blue-600"
---

Symfony est le framework PHP de référence pour le développement d'applications web complexes et d'APIs REST. Avec plus de 50 projets Symfony livrés depuis 2018, SILARHI maîtrise les migrations, l'architecture hexagonale, et les best practices Symfony.
```

2. `src/content/tags/api.md`
3. `src/content/tags/migration.md`
4. `src/content/tags/php.md`
5. `src/content/tags/docker.md`
6. `src/content/tags/mysql.md`
7. `src/content/tags/next-js.md`
8. `src/content/tags/react.md`

**Implementation steps:**
1. Audit existing tags used across all projects
2. Create markdown files for top 10 most-used tags
3. Ensure consistent naming (Symfony, not "symfony" or "SYMFONY")
4. Add descriptions optimized for tag page SEO

### 1.3 Enhanced Project Page Metadata

Update dynamic project pages to use new metadata fields.

**File:** `src/app/projets/[slug]/page.tsx`

```typescript
export async function generateMetadata({ params }: ProjectProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {
            title: 'Projet non trouvé - SILARHI',
            description: 'Le projet que vous recherchez n\'existe pas.',
            robots: { index: false, follow: true }
        }
    }

    const projectUrl = `https://silarhi.fr/projets/${slug}`
    const metaDescription = project.metaDescription ?? project.excerpt ??
        `Découvrez le projet ${project.title} réalisé par SILARHI.`

    // Use featured image if available, otherwise fallback to default
    const ogImage = project.featuredImage ?? '/images/og/projet-default.jpg'

    return {
        title: project.title,
        description: metaDescription,
        keywords: [
            project.focusKeyword,
            ...project.tags.map(t => t.name),
            project.client,
            project.clientIndustry,
            'SILARHI',
            'développement web',
            'Toulouse'
        ].filter(Boolean),
        authors: [{ name: project.author }],
        openGraph: {
            type: 'article',
            url: projectUrl,
            title: project.title,
            description: metaDescription,
            publishedTime: project.date,
            modifiedTime: project.updateDate ?? project.date,
            authors: [project.author],
            tags: project.tags.map(t => t.name),
            images: [{
                url: ogImage,
                width: 1200,
                height: 630,
                alt: project.title
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: metaDescription,
            images: [ogImage],
        },
        alternates: {
            canonical: projectUrl,
        }
    }
}
```

**Implementation steps:**
1. Update `generateMetadata` function
2. Add Open Graph and Twitter Card support
3. Add canonical URLs
4. Test with a few projects first
5. Run `yarn build` to verify static generation works

---

## Phase 2: Content Audit & Prioritization (Week 1-2)

### 2.1 Project Inventory

Create a spreadsheet or document listing all 27 projects with:

| Project Slug | Current Title Length | Excerpt Length | Tag Count | Word Count | Priority |
|--------------|---------------------|----------------|-----------|------------|----------|
| api-iris | 62 | 145 | 6 | ~450 | ✅ Good |
| front-iris | 64 | 140 | 3 | ~380 | ⚠️ Needs work |
| ... | ... | ... | ... | ... | ... |

**Metrics to capture:**
- ✅ **Good**: Meets all guidelines (300+ words, optimized title/excerpt, 3-5 tags)
- ⚠️ **Needs work**: Missing some elements
- 🔴 **Priority**: Significant gaps, needs complete rewrite

### 2.2 Prioritization Criteria

**High Priority Projects (optimize first):**
1. **Recent projects** (2024-2025): Better SEO for fresh content
2. **High-value clients**: Well-known companies
3. **Popular technologies**: Symfony, Next.js, React
4. **Short content**: Projects under 300 words need expansion
5. **Missing key metadata**: No excerpt or poor title

**Medium Priority:**
6. Older projects (2023) with decent content
7. Niche technologies (less searched but valuable)

**Low Priority:**
8. Very old projects (2020-2022)
9. Internal tools or non-public work

### 2.3 Content Audit Checklist

For each project, verify:

**Frontmatter:**
- [ ] Title: 50-60 characters, descriptive, includes benefit
- [ ] Excerpt: 120-160 characters, complete sentence(s)
- [ ] Tags: 3-5 tags, standardized names
- [ ] Author: Full name (not just "SILARHI")
- [ ] Dates: Valid ISO format, updateDate if refreshed

**Content:**
- [ ] Word count: 300+ words minimum
- [ ] Structure: At least 4 H2 sections
- [ ] Client context: Who and why
- [ ] Challenge: Problem statement clear
- [ ] Solution: Detailed technical approach
- [ ] Results: Quantifiable outcomes
- [ ] Technologies: List with versions and reasoning

**SEO:**
- [ ] Primary keyword appears naturally 6-12 times
- [ ] Internal links: 2-3 to related projects or tags
- [ ] Images: At least 1 with descriptive alt text
- [ ] Reading flow: Natural, not keyword-stuffed

---

## Phase 3: Batch Optimization (Week 2-4)

### 3.1 High-Priority Projects (Week 2)

**Projects to optimize first (examples based on audit):**

1. **api-iris.mdx** (already good, minor enhancements)
   - Add internal links to related projects
   - Enhance excerpt to 155 characters
   - Add `projectDate` field

2. **front-iris.mdx** (needs expansion)
   - Expand solution section (currently copies api-iris content)
   - Add unique technical details about React migration
   - Include performance metrics

3. **accel-gerancia.mdx** (audit needed)
   - Review current content
   - Apply optimization guidelines
   - Ensure 300+ words

### 3.2 Content Enhancement Process

For each project:

**Step 1: Update frontmatter**
```yaml
---
title: "[Optimized 55-60 char title]"
date: '2025-08-02'
projectDate: '2023-06-01'  # NEW: Actual project date
excerpt: "[Optimized 120-160 char description]"
author: 'Guillaume Sainthillier'  # Full name
tags: ['StandardTag1', 'StandardTag2', 'StandardTag3']  # 3-5 tags
published: true
---
```

**Step 2: Review and expand content**
- Ensure minimum 300 words
- Add missing sections (challenge, results, etc.)
- Include quantifiable metrics where possible
- Add technical reasoning for decisions

**Step 3: Add internal links**
```markdown
Ce projet s'appuie sur notre expertise en [migration Symfony](/projets/tag/symfony)...

Nous avons appliqué les mêmes principes que dans le projet
[API Iris](/projets/api-iris) pour assurer cohérence...
```

**Step 4: Verify checklist**
- Run through content audit checklist
- Fix any remaining issues
- Test build: `yarn build`

### 3.3 Testing Process

After each batch of 5-10 projects:

```bash
# Run all quality checks
yarn typecheck
yarn lint
yarn knip
yarn build

# Verify pages render correctly
yarn dev
# Manually check /projets/[optimized-slug]
```

---

## Phase 4: Enhancement Features (Week 3-4)

### 4.1 Structured Data for Projects

Add JSON-LD Article schema to project pages.

**File:** `src/app/projets/[slug]/page.tsx`

```typescript
// In the page component, after content
export default async function ProjectProjectPage({ params }: ProjectProjectPageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: project.title,
        description: project.excerpt,
        datePublished: project.date,
        dateModified: project.updateDate ?? project.date,
        author: {
            '@type': project.author === 'SILARHI' ? 'Organization' : 'Person',
            name: project.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'SILARHI',
            logo: {
                '@type': 'ImageObject',
                url: 'https://silarhi.fr/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://silarhi.fr/projets/${slug}`
        },
        keywords: project.tags.map(t => t.name).join(', '),
        articleSection: 'Projets',
    }

    return (
        <DefaultLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Rest of component */}
        </DefaultLayout>
    )
}
```

### 4.2 Related Projects Component

Create a "Related Projects" section at the bottom of each project page.

**File:** `src/components/related-projects.tsx`

```typescript
interface RelatedProjectsProps {
    currentSlug: string
    tags: TagMetadata[]
    limit?: number
}

export default async function RelatedProjects({
    currentSlug,
    tags,
    limit = 3
}: RelatedProjectsProps) {
    const allProjects = await getAllProjects()

    // Find projects with overlapping tags
    const related = allProjects
        .filter(p => p.slug !== currentSlug)
        .map(p => ({
            project: p,
            score: p.tags.filter(t => tags.some(tag => tag.slug === t.slug)).length
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.project)

    if (related.length === 0) return null

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Projets similaires</h2>
            <ProjectGrid projects={related} />
        </section>
    )
}
```

Then add to project page:

```typescript
<RelatedProjects currentSlug={slug} tags={project.tags} />
```

### 4.3 Image Optimization Setup

Create guidelines for project images.

**Directory structure:**
```
public/
└── images/
    ├── og/
    │   ├── projet-default.jpg (1200x630)
    │   └── projets/
    │       ├── api-iris-og.jpg
    │       ├── front-iris-og.jpg
    │       └── ...
    └── projects/
        ├── api-iris/
        │   ├── hero.jpg
        │   ├── architecture.jpg
        │   └── interface.jpg
        └── ...
```

**Image requirements:**
- OG images: 1200x630px, JPEG, <200KB
- Content images: Max width 1200px, JPEG/WebP, <200KB each
- Descriptive filenames with hyphens

---

## Phase 5: Monitoring & Iteration (Ongoing)

### 5.1 Performance Metrics

**Track in Google Search Console:**
- Impressions and clicks per project page
- Average position for target keywords
- Click-through rate (CTR)

**Target improvements:**
- 20-30% increase in impressions within 3 months
- 15-25% increase in CTR from better titles/excerpts
- Better ranking for target keywords

### 5.2 Monthly Maintenance

**First week of each month:**
- [ ] Review Search Console data
- [ ] Identify top-performing projects
- [ ] Identify underperforming projects
- [ ] Update 2-3 underperforming projects with better content
- [ ] Check for broken internal links
- [ ] Update technology versions if needed

### 5.3 Quarterly Review

**Every 3 months:**
- [ ] Comprehensive content audit
- [ ] Review and update tag descriptions
- [ ] Add new projects with optimized content
- [ ] Refresh old project dates and metrics
- [ ] A/B test title variations for key projects
- [ ] Analyze competitor content strategies

---

## Quick Start Checklist

To begin implementation immediately:

### Week 1 Tasks:
- [ ] Update TypeScript interfaces in `src/utils/project.ts`
- [ ] Create top 5 tag description files in `src/content/tags/`
- [ ] Update `src/app/projets/[slug]/page.tsx` with enhanced metadata
- [ ] Test with 1-2 projects
- [ ] Run `yarn build` to verify

### Week 2 Tasks:
- [ ] Complete project inventory audit
- [ ] Identify 10 high-priority projects
- [ ] Optimize 5 high-priority projects
- [ ] Add internal links to optimized projects
- [ ] Deploy to staging and test

### Week 3 Tasks:
- [ ] Optimize remaining 5 high-priority projects
- [ ] Start medium-priority projects (5 more)
- [ ] Implement structured data (JSON-LD)
- [ ] Create RelatedProjects component
- [ ] Test on staging

### Week 4 Tasks:
- [ ] Complete 10 more medium-priority projects
- [ ] Create image optimization workflow
- [ ] Generate OG images for top projects
- [ ] Final QA and testing
- [ ] Deploy to production

---

## Success Criteria

**After 1 month:**
- ✅ All 27 projects have optimized frontmatter
- ✅ Top 10 projects have 500+ words of quality content
- ✅ All projects have proper internal linking
- ✅ Structured data implemented on all project pages
- ✅ Enhanced metadata with Open Graph support

**After 3 months:**
- ✅ 20-30% increase in organic search impressions
- ✅ 15-25% improvement in click-through rate
- ✅ Better ranking for 5-10 target keywords
- ✅ All projects meet minimum content quality standards
- ✅ Established monthly maintenance routine

---

## Resources

- **Main guide:** `CONTENT_OPTIMIZATION_GUIDE.md`
- **Project instructions:** `CLAUDE.md`
- **Type definitions:** `src/utils/project.ts`
- **Example project:** `src/content/projects/api-iris.mdx`

---

## Support & Questions

If you encounter issues during implementation:
1. Review the detailed guide in `CONTENT_OPTIMIZATION_GUIDE.md`
2. Check existing optimized projects for examples
3. Run quality checks: `yarn lint-ci`
4. Test builds: `yarn build`
5. Review Next.js App Router documentation for metadata API

---

**Document Version:** 1.0
**Last Updated:** 2025-01-22
**Next Review:** 2025-02-22
