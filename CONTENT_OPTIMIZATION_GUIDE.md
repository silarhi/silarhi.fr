# Content Optimization Guide for SILARHI Projects

Practical guidelines for optimizing existing and new project case studies for SEO.

---

## Part 1: Frontmatter Optimization

### Current Format
```yaml
---
title: "Project Title"
date: '2025-08-02'
projectDate: '2023-06-01'
excerpt: "Brief description"
author: 'Author Name'
tags: ['Tag1', 'Tag2', 'Tag3']
published: true
---
```

### Optimized Format

#### 1. Title Optimization

**What makes a good SEO title:**
- 55-60 characters (optimal for Google SERP)
- Include primary technology + "web" or "app"
- Include benefit or outcome
- Brand name at the end

**Examples:**

BAD (too generic):
```yaml
title: "Project"
title: "API Development"
title: "Web Application"
```

GOOD (optimized):
```yaml
title: "API Iris : Migration Symfony 6.3 pour Dentisterie Numérique"
title: "Plateforme E-commerce : Next.js Headless CMS pour Mode"
title: "Système d'Exploitation Lean : Gestion Industrielle PHP Symfony"
```

**Formula:**
`[Client/Product Name] : [Technology/Capability] for [Industry/Use Case]`

---

#### 2. Excerpt Optimization

**Guidelines:**
- 155-160 characters (optimal for Google SERP snippet)
- Include primary technology naturally
- Mention benefit or business value
- Complete sentence(s)
- No call-to-action needed

**Examples:**

BAD (too short, vague):
```yaml
excerpt: "A web application for clients"
excerpt: "Custom development project"
```

GOOD (optimized):
```yaml
excerpt: "Modernisation d'une API Symfony existante : migration vers PHP 8.2 et Symfony 6.3, architecture modulable et maintenable pour Scan4All."

excerpt: "Plateforme e-commerce headless avec Next.js et CMS découplé : intégration d'un catalogue produits dynamique, panier persistent et paiement sécurisé."

excerpt: "Système de gestion Lean Manufacturing développé en Symfony : optimisation des flux de production et réduction des délais pour secteur industriel."
```

**Formula:**
`[Action/Improvement] : [Primary Technology], [Secondary Tech], and [Key Outcome] for [Client/Company]`

---

#### 3. Tags Optimization

**CRITICAL:** Tag standardization is essential for SEO. Use consistent tags across all projects.

**Standard Tags (Technology Stack):**
```yaml
tags:
  - Symfony       # PHP Framework
  - PHP           # Language
  - Next.js       # React Framework
  - React         # Library
  - API           # Type of project
  - MySQL         # Database
  - Docker        # Infrastructure
  - PostgreSQL    # Database
  - Tailwind CSS  # CSS Framework
```

**Standard Tags (Project Type):**
```yaml
tags:
  - Migration      # Moving from old to new
  - REST API      # Type of API
  - GraphQL       # Query language
  - E-commerce    # Industry/Type
  - SaaS          # Business model
  - CMS           # Content management
  - Dashboard     # UI component type
  - Mobile App    # Delivery type
  - Web App       # Delivery type
```

**Standard Tags (Business):**
```yaml
tags:
  - Startup       # Company size
  - Enterprise    # Company size
  - Healthcare    # Industry
  - Finance       # Industry
  - Manufacturing # Industry
  - Retail        # Industry
  - B2B           # Business model
  - B2C           # Business model
```

**Tag Limits:**
- Use 2-5 tags maximum
- Prefer 3 tags as optimal
- All tags should be meaningful

**Good Tag Examples:**

Project: API for dental practice management
```yaml
tags: ['Symfony', 'API', 'MySQL', 'Docker', 'Healthcare']
```

Project: E-commerce platform
```yaml
tags: ['Next.js', 'E-commerce', 'Headless CMS', 'Stripe', 'B2C']
```

Project: Legacy system modernization
```yaml
tags: ['Symfony', 'Migration', 'PHP 8', 'Docker', 'Enterprise']
```

---

## Part 2: Body Content Optimization

### Heading Structure (Semantic HTML)

**ALWAYS follow this hierarchy:**
- H1: Project title (automatic from component)
- H2: Main sections
- H3: Subsections within H2
- Never skip levels (H1 → H3 is bad)
- Never use multiple H1s on one page

**Standard Structure:**

```markdown
# [Title] (auto-generated, don't include in MDX)

## About the Client

[1-2 paragraphs introducing the client]

## Challenge & Context

[Problem statement and why it mattered]

## Our Solution & Approach

[What we did and how]

### [Sub-approach if needed]

[Details]

## Results & Impact

[Quantifiable outcomes]

## Technologies Used

[List of technologies with brief explanation]
```

---

### Keyword Integration Guidelines

**Primary Keyword:** First tag (appears naturally)
**Secondary Keywords:** Related terms

**Density Target:** 0.5-1% (write naturally, don't force)

**Example analysis:**
```
Article: 1200 words
Primary keyword: "Symfony API"
Target count: 6-12 mentions (naturally distributed)

Appearance points:
- First paragraph (intro): 1x
- Under "Solution": 2x
- Under "Technologies": 1x
- In links: 2x
- Subtitles/H3s: 1-2x
```

**How to integrate naturally:**

FORCED (bad):
```markdown
We built a Symfony API. The Symfony API is fast.
This Symfony API uses Symfony best practices.
```

NATURAL (good):
```markdown
We built an API using Symfony 6.3 following modern best practices.
The API handles requests efficiently through proper architecture.
We utilized Symfony's proven patterns for API development.
```

---

### Internal Linking Strategy

#### Link to Tag Pages
Link to tag pages when mentioning technologies:

```markdown
Our [Symfony API](/projets/tag/symfony) implementation follows...

We chose [Next.js](/projets/tag/next-js) for its...

The [Docker](/projets/tag/docker) containerization provides...
```

#### Link to Related Projects
In the "See Also" section (at bottom of page, generated by code):
- Show 2 related projects
- Use same tags as current project

#### Anchor Text Best Practices
- Descriptive: `[Symfony API development](/...)`
- Not: `[click here](/...)`
- Include target keyword if natural

---

## Part 3: Specific Examples

### Example 1: API Project

**Before (Minimal SEO):**
```yaml
title: "API Iris"
excerpt: "API development for dental company"
tags: ['API', 'PHP']
```

**After (Optimized):**
```yaml
title: "API Iris : Migration Symfony 6.3 pour Scan4All Dentaire"
excerpt: "Modernisation d'une API Symfony existante : migration PHP 8.2 et Symfony 6.3 avec architecture modulable pour l'innovant scanner intra-oral Iris."
tags: ['Symfony', 'API', 'PHP 8', 'Migration', 'Healthcare']
```

**Content Structure:**
```markdown
## About Scan4All

[Paragraph about company, include natural mention of "dental technology" and "API"]

## Challenge: Legacy API Maintenance

The existing Symfony 4 API... [technology challenges]

[Natural mention of "API modernization"]

## Our Solution: Strategic Migration

We migrated the API to [Symfony](/projets/tag/symfony) 6.3 and [PHP](/projets/tag/php) 8.2

### Architecture Improvements
[Technical details]

### Performance Gains
[Before/after metrics]

## Results

- API response time: 40% faster
- Deployment time: 60% reduced
- Code maintainability: +80%

## Technologies Implemented

- [Symfony 6.3](/projets/tag/symfony) - Framework
- [PHP 8.2](/projets/tag/php) - Language
- [MySQL 5.7](/projets/tag/mysql) - Database
- [Docker](/projets/tag/docker) - Containerization
```

---

### Example 2: E-commerce Project

**Before (Minimal SEO):**
```yaml
title: "E-commerce Platform"
excerpt: "Modern online store"
tags: ['Next.js', 'E-commerce']
```

**After (Optimized):**
```yaml
title: "Plateforme E-commerce Headless : Next.js et CMS Découplé"
excerpt: "Solution e-commerce moderne avec Next.js headless CMS : intégration catalogue dynamique, panier persistent, paiement Stripe et gestion d'inventaire."
tags: ['Next.js', 'React', 'E-commerce', 'Headless CMS', 'Stripe']
```

**Content Structure:**
```markdown
## About the Client

[Introduce company and e-commerce goals]

## Challenge: Legacy Platform Limitations

[Problems with old platform]

[Natural mention of "e-commerce platform" and "customer experience"]

## Our Solution: Headless Architecture

We built a [Next.js](/projets/tag/next-js) powered platform with:

### Frontend Performance
[Details about Next.js benefits]

### API Integration
[How we connected to CMS]

### Payment Processing
[Stripe integration details]

## Results & Metrics

- Page load time: 2.3s (vs 5.8s previous)
- Conversion rate: +35%
- Cart abandonment: -22%

## Tech Stack

- [Next.js](/projets/tag/next-js) - Frontend framework
- [Headless CMS](/projets/tag/headless-cms) - Content management
- [Stripe](/projets/tag/stripe) - Payments
- [PostgreSQL](/projets/tag/postgresql) - Database
```

---

### Example 3: Enterprise Dashboard

**Before (Minimal SEO):**
```yaml
title: "Lean Manufacturing Dashboard"
excerpt: "Production monitoring system"
tags: ['Symfony', 'Dashboard']
```

**After (Optimized):**
```yaml
title: "Système Lean Manufacturing : Dashboard d'Optimisation Symfony"
excerpt: "Plateforme web d'optimisation Lean en Symfony : tableaux de bord temps réel, gestion des flux production et réduction délais industriels."
tags: ['Symfony', 'Dashboard', 'Manufacturing', 'Enterprise', 'PHP']
```

**Content Structure:**
```markdown
## About the Client

[Manufacturing company context, "lean management", "production efficiency"]

## Challenge: Manual Process Bottlenecks

[Existing pain points with manual systems]

[Mention "production optimization" and "manufacturing efficiency"]

## Our Solution: Real-Time Lean Dashboard

We developed a [Symfony](/projets/tag/symfony)-based platform featuring:

### Real-Time Monitoring
[Dashboard capabilities]

### Data Analytics
[Reporting features]

### User Training
[How we ensured adoption]

## Impact Metrics

- Production efficiency: +45%
- Machine downtime: -30%
- Error rates: -65%

## Technology Stack

- [Symfony](/projets/tag/symfony) - Web framework
- [PHP 8](/projets/tag/php) - Language
- [ReactJS](/projets/tag/react) - Dashboard UI
- [PostgreSQL](/projets/tag/postgresql) - Data storage
- [Docker](/projets/tag/docker) - Infrastructure
```

---

## Part 4: Content Audit Checklist

Use this checklist when optimizing existing projects:

### Title
- [ ] 55-60 characters
- [ ] Includes primary technology
- [ ] Includes benefit/outcome
- [ ] Natural language (not keyword-stuffed)

### Excerpt
- [ ] 155-160 characters
- [ ] Includes primary technology naturally
- [ ] Mentions business value
- [ ] Complete sentences
- [ ] No call-to-action

### Tags
- [ ] 2-5 tags (3 is optimal)
- [ ] All tags are meaningful
- [ ] Tags are standardized (see tag list)
- [ ] Tags reflect the project

### Body Content
- [ ] Proper heading hierarchy (H2 → H3)
- [ ] No skipped heading levels
- [ ] Introduction explains what the project is
- [ ] Clear problem statement
- [ ] Solution description is detailed
- [ ] Results are quantifiable
- [ ] Technologies are listed and explained

### Internal Linking
- [ ] Links to relevant tag pages
- [ ] Links use descriptive anchor text
- [ ] 2-3 internal links minimum
- [ ] Links are natural, not forced

### Keywords
- [ ] Primary keyword appears 6-12x naturally
- [ ] Secondary keywords appear 2-4x
- [ ] No keyword stuffing
- [ ] Natural reading flow maintained

### Format
- [ ] All dates are valid (YYYY-MM-DD)
- [ ] author field is populated
- [ ] published: true for public projects
- [ ] No broken markdown

---

## Part 5: Batch Optimization Process

### Step 1: Identify Priority Projects
Prioritize projects by:
1. Project recency (updated projects rank better)
2. Client prominence (well-known clients)
3. Technology relevance (in-demand skills)
4. Missing metadata (biggest SEO gap)

### Step 2: Create Tag Descriptions
Create files in `src/content/tags/` for major tags:

**File:** `src/content/tags/symfony.md`
```yaml
---
name: Symfony
description: "Symfony est un framework PHP moderne pour applications web d'entreprise. SILARHI maîtrise Symfony 4, 5, et 6 pour des projets d'ampleur."
icon: "⚙️"
color: "bg-blue-500"
---
```

### Step 3: Update Projects
1. Fix title (55-60 chars)
2. Fix excerpt (155-160 chars)
3. Standardize tags
4. Add internal links
5. Verify body structure

### Step 4: Test Changes
```bash
yarn typecheck  # No TS errors
yarn lint       # No lint errors
yarn knip       # No unused code
yarn build      # Builds successfully
```

### Step 5: Deploy & Monitor
- Deploy to staging first
- Test pages render correctly
- Check Search Console for errors
- Monitor organic search changes

---

## Part 6: Content Maintenance

### Monthly Tasks
- [ ] Review Google Search Console for crawl errors
- [ ] Check for broken internal links
- [ ] Update project dates if still relevant
- [ ] Monitor keyword rankings

### Quarterly Tasks
- [ ] Audit new project descriptions
- [ ] Update old project excerpts with new accomplishments
- [ ] Refresh tag descriptions with new context
- [ ] Review and update outdated technologies

### Annually
- [ ] Comprehensive content audit
- [ ] Update successful case study metrics
- [ ] Refine tag taxonomy
- [ ] Create topic cluster content
- [ ] Identify new content opportunities

---

## Quick Reference: Tag List (Growing)

### Framework Tags
- Symfony
- Next.js
- React
- Vue.js
- Laravel
- Django

### Language Tags
- PHP
- PHP 8
- JavaScript
- TypeScript
- Python
- Go

### Database Tags
- MySQL
- PostgreSQL
- MongoDB
- Redis
- Elasticsearch

### Infrastructure
- Docker
- Kubernetes
- AWS
- Digital Ocean
- Linux

### API/Protocol Tags
- REST API
- GraphQL
- WebSocket
- SOAP

### Industry Tags
- Healthcare
- E-commerce
- Finance
- Manufacturing
- SaaS
- B2B
- B2C

### Project Type Tags
- Migration
- API
- Dashboard
- Mobile App
- Web App
- CMS
- Headless CMS

---

## Content Writing Best Practices

### Do's
- Write for humans first, search engines second
- Use short sentences and paragraphs
- Include data and metrics
- Link naturally to related content
- Use descriptive subheadings
- Explain technical terms for non-technical readers
- Show the business value, not just the technical implementation

### Don'ts
- Stuff keywords unnaturally
- Write excessively long paragraphs
- Forget to mention the client's industry
- Make unsupported claims
- Use too many exclamation marks!!!
- Write only for developers (include business perspective)
- Ignore the reader's intent

---

## Templates

### Standard Project MDX Template

```markdown
---
title: "[Client/Product]: [Technology] for [Outcome]"
date: 'YYYY-MM-DD'
projectDate: 'YYYY-MM-DD'  # When work was done
excerpt: "[Action/Improvement]: [Tech Stack] and [Key Outcome] for [Client]."
author: 'Author Name'
tags: ['Tech1', 'Tech2', 'Project Type']
published: true
---

## About [Client Name]

[2-3 sentences about the company, industry, and context]

[Link to industry tag if applicable]

## Challenge

[What was the problem?]
[Why was it important?]
[What were the constraints?]

[Natural mention of primary technology]

## Our Approach

[What did we do?]
[Why did we choose this approach?]

### [Aspect 1]

[Details]

### [Aspect 2]

[Details]

## Results

[Quantifiable outcomes]
[Business impact]

## Technology Stack

- [Technology 1](/projets/tag/tech1) - Why we used it
- [Technology 2](/projets/tag/tech2) - Why we used it
- [Technology 3](/projets/tag/tech3) - Why we used it
```

---

## Questions?

Refer to the main SEO_STRATEGY.md for comprehensive context, or the SEO_IMPLEMENTATION.md for technical setup.
