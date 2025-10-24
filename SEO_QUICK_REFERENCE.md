# SEO Quick Reference Card

Quick lookup guide for SILARHI.fr SEO implementation.

---

## File Changes Summary

### New Files Created
```
src/utils/schema.ts                    # Structured data generators
src/components/structured-data.tsx     # Schema rendering component
src/app/projets/tag/[tag]/page.tsx    # Tag pages with internal linking
src/app/sitemap.ts                     # Dynamic sitemap generation
public/robots.txt                      # Search engine crawling rules
```

### Files Modified
```
src/app/layout.tsx                     # Root metadata + Organization schema
src/app/projets/page.tsx               # Projects page metadata
src/app/projets/[slug]/page.tsx        # Project metadata + schemas + internal links
next.config.ts                         # Security headers (optional)
```

---

## Metadata Formulas

### Project Title (55-60 chars)
```
[Client/Product Name]: [Technology/Capability] [for Industry/Outcome]
```

Examples:
- "API Iris: Migration Symfony 6.3" (45 chars)
- "Plateforme E-commerce: Next.js Headless CMS" (48 chars)
- "Dashboard Lean Manufacturing: Symfony 6 Enterprise" (51 chars)

### Project Excerpt (155-160 chars)
```
[Action/Improvement]: [Tech Stack], and [Key Outcome] for [Client/Industry].
```

Examples:
- "Modernisation d'une API Symfony: migration PHP 8.2, Symfony 6.3, architecture pour Scan4All." (97 chars - expand)
- "Solution e-commerce avec Next.js et CMS découplé: catalogue dynamique, panier, paiement Stripe." (98 chars)

### Tag Count
- **Optimal:** 3 tags
- **Range:** 2-5 tags
- **Avoid:** >5 or <2 tags

### Standard Tags Used
```
Technology: Symfony, Next.js, React, PHP, Python, JavaScript, TypeScript, etc.
Database: MySQL, PostgreSQL, MongoDB, Redis
Infrastructure: Docker, Kubernetes, AWS, etc.
API Type: REST API, GraphQL, WebSocket
Project Type: Migration, API, Dashboard, CMS, E-commerce
Industry: Healthcare, Finance, Manufacturing, Retail, etc.
Business: B2B, B2C, SaaS, Enterprise, Startup
```

---

## On-Page SEO Checklist

### Every Project Page Should Have:

| Element | Status | Details |
|---------|--------|---------|
| Title | ✓ | 55-60 chars, includes primary tech |
| Description | ✓ | 155-160 chars, mentions technology |
| OG Image | ✓ | 1200x630px, <100KB |
| H2 Headings | ✓ | Proper hierarchy (no H1 → H3) |
| Internal Links | ✓ | 2-3 links to related tag pages |
| Structured Data | ✓ | Article schema + Breadcrumb schema |
| Tags | ✓ | 3 tags, standardized naming |
| Excerpt | ✓ | Includes technology & benefit |
| Author | ✓ | Populated from frontmatter |
| Date | ✓ | Valid format (YYYY-MM-DD) |

---

## Keyword Density Quick Check

For a 1200-word article with primary keyword "Symfony API":

| Metric | Target | Example |
|--------|--------|---------|
| Article length | 800-2000 words | 1200 words ✓ |
| Keyword "Symfony" | 6-12 occurrences | 8 occurrences ✓ |
| Keyword "API" | 6-12 occurrences | 10 occurrences ✓ |
| Density | 0.5-1% | 0.75% ✓ |

**How to check density:**
1. Count keyword occurrences (Cmd+F in code editor)
2. Divide by total word count
3. Multiply by 100 for percentage
4. Should be 0.5-1% for optimal SEO

---

## Heading Structure Template

```markdown
# Project Title (H1 - auto-generated from component)

## Section 1: About the Client (H2)

Content...

## Section 2: Problem & Context (H2)

Content...

### Subsection A (H3 - optional)

Content...

### Subsection B (H3 - optional)

Content...

## Section 3: Our Solution (H2)

Content...

### Technology Choice (H3)

Content...

### Implementation Details (H3)

Content...

## Section 4: Results & Impact (H2)

Content...

## Section 5: Technologies Used (H2)

Content...
```

**Rules:**
- Never skip levels (H1 → H3)
- One H1 per page maximum
- Multiple H2s are fine
- H3s only under H2s
- Never use H4 or lower for projects

---

## Internal Link Anchor Text Examples

### Good Anchors
- "[Symfony API](/projets/tag/symfony)"
- "[Next.js development](/projets/tag/next-js)"
- "[Docker containerization](/projets/tag/docker)"
- "[E-commerce solutions](/projets/tag/e-commerce)"

### Bad Anchors
- "[click here](/projets/tag/symfony)"
- "[more info](/projets/tag/next-js)"
- "[link](/projets/tag/docker)"
- "[view](/projets/tag/e-commerce)"

---

## Search Engine Tools

| Tool | Purpose | URL |
|------|---------|-----|
| Google Search Console | Index monitoring, errors | https://search.google.com/search-console |
| PageSpeed Insights | Performance metrics | https://pagespeed.web.dev |
| Mobile-Friendly Test | Mobile compliance | https://search.google.com/test/mobile-friendly |
| Structured Data Test | Schema validation | https://schema.org/docs |
| OG Debugger | Social sharing preview | https://developers.facebook.com/tools/debug |
| Twitter Validator | Twitter cards | https://cards-dev.twitter.com/validator |

---

## Implementation Timeline

### Phase 1: Quick Wins (4-6 hours)

**Day 1-2:**
- [ ] Create `src/utils/schema.ts` (30 min)
- [ ] Create `src/components/structured-data.tsx` (15 min)
- [ ] Update `src/app/layout.tsx` (30 min)
- [ ] Update `src/app/projets/page.tsx` (15 min)

**Day 3-4:**
- [ ] Replace `src/app/projets/[slug]/page.tsx` (45 min)
- [ ] Create `src/app/projets/tag/[tag]/page.tsx` (45 min)
- [ ] Create `src/app/sitemap.ts` (15 min)
- [ ] Create `public/robots.txt` (5 min)

**Day 5:**
- [ ] Testing & validation (1-2 hours)
- [ ] Deploy & monitor (30 min)

### Phase 2: Content Optimization (3-4 hours)

**Week 2:**
- [ ] Create tag description files (1 hour)
- [ ] Optimize 10-15 project pages (2-3 hours)

### Phase 3: Monitoring (Ongoing)
- Weekly: Check Search Console
- Monthly: Review analytics and rankings
- Quarterly: Content refresh and new optimizations

---

## Build & Deploy Commands

```bash
# Check for errors
yarn typecheck

# Check linting
yarn lint

# Check for unused code
yarn knip

# Run all checks
yarn lint-ci

# Build for production
yarn build

# Test locally
yarn dev
```

If any command fails, fix the issues before deploying.

---

## Success Metrics to Track

### 4-Week Goals (Phase 1)
- [ ] 100% project pages have structured data
- [ ] All pages pass Mobile-Friendly Test
- [ ] Sitemap submitted to Search Console
- [ ] 0 crawl errors in Search Console

### 8-Week Goals (Phase 2)
- [ ] 20+ organic search impressions
- [ ] 10%+ organic traffic increase
- [ ] 5+ rich snippet appearances
- [ ] 30+ keywords indexed

### 3-Month Goals (Phase 3)
- [ ] 30%+ organic traffic increase
- [ ] 10 position improvement for main keywords
- [ ] 10+ pages ranking (position 1-20)
- [ ] 20+ external links

---

## Common Issues & Fixes

### Structured Data Not Showing
**Problem:** Schema.org validator shows errors
**Solution:**
1. Check JSON-LD syntax in browser DevTools
2. Verify `dangerouslySetInnerHTML` is used
3. Ensure data object is properly stringified
4. Resubmit to validator

### Missing Sitemap
**Problem:** Sitemap.xml not found
**Solution:**
1. Verify `src/app/sitemap.ts` exists
2. Check file syntax is correct
3. Run `yarn build` and check `.next/static/sitemap.xml`
4. Resubmit URL to Search Console

### Low CTR from Search Results
**Problem:** Title/description not appealing
**Solution:**
1. Title: Ensure it's 55-60 chars and includes benefit
2. Description: Should be 155-160 chars and compelling
3. Check for duplicate titles across pages
4. Monitor in Search Console for impressions vs clicks

### Duplicate Content Issues
**Problem:** Search Console reports duplicate pages
**Solution:**
1. Use canonical tags (already implemented)
2. Check for duplicate projects with different slugs
3. Verify robots.txt isn't blocking important pages
4. Check sitemap for errors

---

## File Structure Reference

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (MODIFIED)
│   ├── sitemap.ts                    # Sitemap generation (NEW)
│   └── projets/
│       ├── page.tsx                  # Projects listing (MODIFIED)
│       ├── [slug]/
│       │   └── page.tsx              # Project page (MODIFIED)
│       └── tag/
│           └── [tag]/
│               └── page.tsx          # Tag page (NEW)
├── components/
│   └── structured-data.tsx           # Schema component (NEW)
└── utils/
    ├── schema.ts                     # Schema generators (NEW)
    ├── project.ts                    # Existing (unchanged)
    └── tags.ts                       # Existing (unchanged)

public/
└── robots.txt                        # Crawling rules (NEW)

next.config.ts                        # Config (OPTIONAL UPDATE)
```

---

## Testing Checklist

### Local Testing
```bash
# Terminal 1
yarn dev

# Terminal 2
# Check these URLs:
```

1. Homepage: `http://localhost:3000`
   - [ ] Organization schema visible in DevTools
   - [ ] OG tags in meta

2. Projects listing: `http://localhost:3000/projets`
   - [ ] Collection page schema visible
   - [ ] Breadcrumb schema visible
   - [ ] All projects load

3. Project page: `http://localhost:3000/projets/api-iris`
   - [ ] Article schema visible
   - [ ] Breadcrumb schema visible
   - [ ] Related projects section shows
   - [ ] Internal links work

4. Tag page: `http://localhost:3000/projets/tag/symfony`
   - [ ] Projects filtered by tag show
   - [ ] Breadcrumb schema visible
   - [ ] Back link works

### Code Quality
```bash
yarn lint-ci    # Should have 0 errors
yarn build      # Should succeed
```

### Search Engine Testing
Use these tools AFTER deploying to production:

1. **Google Search Console**
   - Submit sitemap: `https://silarhi.fr/sitemap.xml`
   - Check indexing coverage
   - Request indexing for homepage

2. **Structured Data Testing**
   - Test homepage: https://schema.org/docs
   - Test project page
   - Test tag page

3. **Mobile-Friendly Test**
   - Test homepage
   - Test project page
   - Should all pass

4. **PageSpeed Insights**
   - Test homepage
   - Target: Core Web Vitals "Good"

---

## Content Optimization Checklist

Before publishing a project update:

- [ ] Title: 55-60 characters, includes primary tech
- [ ] Excerpt: 155-160 characters, includes benefit
- [ ] Tags: 2-5 standardized tags (3 optimal)
- [ ] Headings: Proper H2→H3 hierarchy
- [ ] Body: 800-2000 words
- [ ] Keywords: Primary term appears 6-12x naturally
- [ ] Internal links: 2-3 links to tag pages
- [ ] Results: Quantifiable metrics included
- [ ] Author: Populated
- [ ] Date: Valid YYYY-MM-DD format
- [ ] Published: true

---

## Quick Links

| Resource | Link |
|----------|------|
| Main Strategy | `SEO_STRATEGY.md` |
| Implementation | `SEO_IMPLEMENTATION.md` |
| Content Guide | `CONTENT_OPTIMIZATION_GUIDE.md` |
| This Reference | `SEO_QUICK_REFERENCE.md` |

---

## Need Help?

1. **Technical issues:** Check SEO_IMPLEMENTATION.md
2. **Content questions:** Check CONTENT_OPTIMIZATION_GUIDE.md
3. **Strategy overview:** Check SEO_STRATEGY.md
4. **Quick lookup:** You're reading it!
