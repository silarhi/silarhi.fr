# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SILARHI.fr is the official website for SILARHI, a web development agency based in Toulouse, France. The site is built with Next.js 16 (App Router), React 19, TypeScript 7, and Tailwind CSS 4, serving as both a marketing showcase and a demonstration of technical quality.

### Tech Stack (Major Versions)

- **Framework**: Next.js 16 with Turbopack dev server
- **UI Library**: React 19
- **Language**: TypeScript 7
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **Content**: MDX via next-mdx-remote 6 (RSC) + gray-matter 4
- **Forms**: react-hook-form 7
- **Animation**: motion 13 (formerly framer-motion)
- **Search**: fuse.js 7
- **Icons**: react-icons 5 (Lucide icons via react-icons/lu)
- **Theming**: next-themes 0.4
- **Utilities**: clsx 2, tailwind-merge 3, use-debounce 10
- **Tooling**: Biome 2 (JS/TS lint + format), Prettier 3 (CSS/Markdown/MDX/YAML only), Knip 6, size-limit, Husky + lint-staged
- **CI**: GitHub Actions (Node 24)
- **Hosting**: Vercel, behind Cloudflare

## Development Commands

### Setup & Development

```bash
yarn install          # Install dependencies
yarn dev             # Start dev server with Turbopack at http://localhost:3000
yarn build           # Build for production
yarn start           # Start production server
```

### Code Quality

```bash
yarn lint            # Biome check (lint + format) on src/ and scripts/
yarn lint:fix        # Biome check with --write (autofix)
yarn typecheck       # tsc --noEmit
yarn knip            # Check for unused files, exports, and dependencies
yarn lint-ci         # lint + typecheck + knip + validate:technologies + validate:clients + validate:images (what CI runs)
yarn prettier        # Format CSS/SCSS/Markdown/MDX/YAML (prettier:check to only check)
yarn size            # Check bundle size budgets (.size-limit.json, needs a prior `yarn build`)
```

Biome formats JS/TS/JSON (4-space indent, 120 columns, single quotes, no semicolons, trailing commas es5); Prettier is only used for non-JS files. A Husky pre-commit hook runs `lint-staged`, which applies `biome check --write` to `*.{js,jsx,ts,tsx,mjs,cjs,json}` and `prettier --write` to `*.{css,scss,md,mdx,yaml,yml}`.

### Content Validation

```bash
yarn validate:technologies  # Technologies referenced by projects but undefined, or defined but unused
yarn validate:clients       # Clients referenced by projects but undefined, or defined but unused
yarn validate:images        # Images referenced in MDX but missing from public/, or unused in public/
yarn validate:urls          # External URLs in content returning 404 or redirecting to another domain (not part of lint-ci)
yarn generate:image-metadata # Write blur placeholder + width/height into MDX frontmatter
```

All scripts live in `scripts/` and run with `tsx`.

**IMPORTANT**: Always run `yarn knip` along with `yarn lint` and `yarn typecheck` to ensure code quality. Knip detects:

- Unused files, exports, and types
- Unused or unlisted dependencies in package.json
- Duplicate exports

Fix any issues reported by knip before considering the code quality checks complete.

## Architecture & Structure

### Routing (Next.js App Router)

This project uses **Next.js 16 App Router** (not Pages Router):

- `src/app/page.tsx` - Home page
- `src/app/projets/page.tsx` - Projects listing with search, filters (`technology`, `category`, `industry`, `client`) and pagination, all driven by query params
- `src/app/projets/[slug]/page.tsx` - Dynamic project detail pages (+ `loading.tsx`)
- `src/app/technologies/[slug]/page.tsx` - Technology detail pages (projects using that tech)
- `src/app/contact/page.tsx` - Contact form with Formspree integration
- `src/app/mentions-legales/page.tsx` - Legal notices page
- `src/app/conditions-generales-de-vente/page.tsx` - Terms and conditions page
- `src/app/layout.tsx` - Root layout: metadata, fonts, JSON-LD (Organization + WebSite), providers, `DefaultLayout`, Google Analytics
- `src/app/not-found.tsx` - Custom 404 page
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/robots.ts` - robots.txt (disallows `/api/`, points to the sitemap)

Dynamic routes (`projets/[slug]`, `technologies/[slug]`) are pre-rendered at build time with `generateStaticParams()`. `/projets` reads `searchParams`, so it is rendered per request. Legacy WordPress URLs and old tags are redirected in `next.config.mjs`.

**API Routes**:

- `src/app/api/technologies/route.ts` - JSON endpoint returning the pre-computed project filter data (technologies, categories, industries, projects), cached 1 hour; not called by the site itself

**Fonts & Analytics**:

- Fonts configured in `src/app/fonts.ts` via `next/font/google`: Lato (body, `--body-font`) and Montserrat (brand, `--brand-font`)
- Google Analytics 4 (ID: G-PDTD5T600H), loaded in `src/app/layout.tsx` with two `next/script` tags (`strategy="afterInteractive"`): the gtag.js loader and an inline `gtag('config', …)` snippet

### Content Management (MDX)

Projects and content are stored as MDX files in the `content/` directory at the project root:

- **Projects**: `content/projects/[project-slug]/` directories with:
    - `index.mdx` - Main project overview with YAML frontmatter
    - `*.mdx` - Project iterations/versions (v1.mdx, v2.mdx, etc.)

    **Project frontmatter schema**:

    ```yaml
    title: string
    slug: string (kept equal to the directory name, which is what the code uses as the slug)
    date: string (YYYY-MM-DD)
    excerpt: string
    client: string (slug reference)
    technologies: string[] (slug references)
    published: boolean
    scope: 'full_development' | 'feature_integration' | 'takeover_and_evolution' | 'maintenance_and_support'
    codeOwnership: 'from_scratch' | 'shared_codebase' | 'inherited_codebase'
    category: string
    name: string (optional, product/app name if applicable)
    url: string (optional, live site URL)
    duration: string (optional)
    engagement:
        type: 'project_based' | 'continuous_support' | 'consulting'
        description: string
        deliverables: string[]
    image: string (optional, path under public/, e.g. /images/projects/foo-hero.png)
    image_metadata: object (generated by `yarn generate:image-metadata`, do not edit by hand)
    overview: string
    challenge: object (description, points[])
    solution: object (description, points[])
    ```

    The source of truth is the `ProjectFrontMatter` type in `src/utils/project.ts` (there is no runtime schema validation). Projects with `published: false` or an unknown `client` are skipped.

    Iteration files (`v1.mdx`, …) have `title`, `date` and `project` frontmatter and are listed oldest first.

- **Clients**: `content/clients/*.mdx` with client metadata (optional `logo` + generated `logo_metadata`)
- **Technologies**: `content/technologies/*.mdx` with technology metadata (`name`, optional `name_aliases`, SEO fields, `reasons`)

Content processing pipeline:

- **gray-matter** parses YAML frontmatter
- **next-mdx-remote** (`next-mdx-remote/rsc`'s `MDXRemote`) renders MDX in `src/components/markdown.tsx`, which has a `full` variant (custom headings, lists, code, links, `MDXImage`) and an `inline` variant (no paragraphs/images)
- **Remark plugins**: `remark-gfm` (GitHub Flavored Markdown)
- **Rehype plugins** (`full` variant; the `inline` variant only runs the custom plugin):
    - `rehype-slug` - Adds IDs to headings
    - `rehype-autolink-headings` - Adds anchor links to headings
    - `rehype-unwrap-images` - Removes wrapper paragraphs around images
    - Custom `rehype-auto-link-technologies` (`src/lib/rehype-auto-link-technologies.ts`) - Links technology names and `name_aliases` to `/technologies/[slug]` (class `tech-link`); can be disabled with `autoLinkTechnologies={false}`
- Utilities in `src/utils/project.ts`, `src/utils/technology.ts`, `src/utils/client.ts` handle reading/parsing MDX files

### Component Organization

```
src/components/
├── ui/               # Reusable UI components (badge, button, icons, section, etc.)
├── layouts/          # Page layouts (default.tsx: navbar + main + footer)
├── forms/            # Form components (form-field, input, input-icon, textarea, label, group, help)
├── *.tsx             # Feature-specific components (navbar, footer, project-list, etc.)
```

Context providers live in `src/providers/` (`theme-provider.tsx` for next-themes, `motion-provider.tsx` for `LazyMotion`, `hash-provider.tsx` exposing `useHash()` for the URL hash). They are all mounted in `src/app/layout.tsx`.

**Reusable UI Components** (`src/components/ui/`):

- `active-link.tsx` - Navigation link with active state styling
- `badge.tsx` / `badge-group.tsx` - Badge components for labels and tags
- `button.tsx` - Primary button component
- `fade-in-when-visible.tsx` - Motion scroll animations
- `icons.tsx` - Centralized icon exports
- `lightbox.tsx` - Image lightbox component
- `mdx-image.tsx` - Image component for MDX content (`MDXImage`)
- `mockup.tsx` - Device mockup (`LaptopMockup`)
- `pagination.tsx` - Server-side pagination component
- `project-scope-badge.tsx` - Specialized badge for project scope
- `section.tsx` / `section-header.tsx` / `section-title.tsx` - Section layout components

**Feature Components** (`src/components/`):

- `navbar.tsx` / `footer.tsx` - Layout components
- `hero-section.tsx` - Hero section wrapper
- `project-list.tsx` - Project cards grid
- `projects-content.tsx` - Search result count, project list and pagination
- `projects-hero.tsx` - Projects page hero with search
- `projects-cta.tsx` - Projects call-to-action section
- `projects-list-async.tsx` - Async server component that applies filters and Fuse.js search, then paginates
- `project-filters.tsx` - Project filtering controls
- `search-form.tsx` / `search-input.tsx` - Debounced search box that writes the `search` query param
- `markdown.tsx` - MDX content renderer with custom components
- `contact-form.tsx` - Contact form with react-hook-form validation
- `clients-section.tsx` - Clients showcase section
- `call-to-action.tsx` - Generic CTA component
- `json-ld.tsx` - JSON-LD structured data component
- `theme-toggle.tsx` - Dark/light theme toggle

Components follow these patterns:

- Functional components with TypeScript interfaces for props
- Default exports preferred
- Tailwind CSS for styling with `cn()` utility (clsx + tailwind-merge) for class composition
- Client components explicitly marked with `'use client'` (e.g., forms, animations, search)
- Server components by default (leverage React Server Components)

### Form Handling

Forms use **react-hook-form** with a custom hook pattern:

- `useFormFieldProps<TFieldValues>()` hook (in `src/hooks/form.ts`) abstracts field state, validation, and error handling
- Generic `FormFieldProps<TFieldValues>` interface ensures type safety
- Parent form (e.g., `ContactForm`) manages state with `useForm()`, passes props to fields
- Field components (`Input`, `Textarea`) wrap `FormField` (`src/components/forms/form-field.tsx`), which calls the hook to extract validation state
- `FormFieldProps` lives in `src/types/forms.ts`
- Contact form submits to Formspree (external email service) with `fetch`

### Key Features

**Search Functionality**:

- Fuzzy search powered by **Fuse.js 7**
- Runs server-side in `src/components/projects-list-async.tsx`, after the query-param filters
- Searches project `title`, `name`, `overview`, client name and technology names (weighted)
- Debounced input (300 ms) with **use-debounce** in `src/components/search-form.tsx`
- URL-based search state (`?search=` query param) for shareable searches; filtered/searched listings are `noindex, follow`

**Animations**:

- Scroll-triggered animations via **Motion 13** (formerly Framer Motion)
- `MotionProvider` wraps the app in `<LazyMotion features={domAnimation} strict>`: use the lightweight `m` components (`import * as m from 'motion/react-m'`), never `motion.*`, or strict mode throws
- `FadeInWhenVisible` component for entrance animations (`useInView` once + `animate`), below the fold only: it server-renders its content at opacity 0 until hydration, so above-the-fold content (heroes, the contact form, the 404 message) is rendered without it
- Smooth scrolling enabled globally (see `src/app/layout.tsx`)

**Image Optimization**:

- Blur placeholders generated via `yarn generate:image-metadata`
- Metadata stored in MDX frontmatter: `image_metadata` (`blur`, `width`, `height`) for project hero images, `logo_metadata` for client logos
- Used as `blurDataURL` placeholders for project images and client logos
- CI regenerates it and commits the result when `content/` or `public/images/` changes (see CI below)

### Utilities & Libraries

**Core Utilities** (`src/utils/`):

- `lib.ts` - `cn()` utility (clsx + tailwind-merge) for class composition
- `project.ts` - Project MDX parsing and retrieval functions
- `technology.ts` - Technology metadata handling
- `client.ts` - Client metadata handling
- `url.ts` - Base/canonical URL helpers (`NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`, then localhost) and project filter query params
- `employees.ts` - `getTotalEmployeeHours()` for the home page key figures

**Custom Rehype Plugins** (`src/lib/`):

- `rehype-auto-link-technologies.ts` - Auto-links technology mentions in content

**Structured Data** (`src/lib/schemas/`):

- Schema.org JSON-LD generators (`index.ts`: Organization, WebSite, WebPage, Breadcrumb, Services…; `project.ts`; `technology.ts`), rendered with the `JsonLd` component

### TypeScript Configuration

- Path aliases: `@/*` maps to `./src/*`, `@/public/*` to `./public/*`
- Strict mode enabled
- Use the alias for imports: `import { cn } from '@/utils/lib'`
- Type definitions in `src/types/` (forms.ts, globals.d.ts)

## Coding Conventions

### General Principles

- **Functional components** with TypeScript
- Follow **Biome** (JS/TS/JSON) + **Prettier** (CSS/Markdown/MDX/YAML) configuration (runs automatically on commit)
- Write **self-documenting code** with clear variable names
- Use **async/await** over `.then()` syntax
- Branch naming: `feature/…`, `fix/…`, `content/…`
- Commit messages: imperative style ("Add hero section" not "Added…")

### Component Guidelines

- Keep components **stateless** when possible
- Use **props interfaces** for all components (export the interface)
- Each component in its own file under `src/components/`
- Export components as **default** unless there's a specific reason not to

### Icons

- **ALWAYS import icons from `@/components/ui/icons.tsx`** instead of directly from `react-icons`
- The icons file provides a centralized, curated set of Lucide icons via `react-icons/lu`
- Available icons: `Download`, `Expand`, `Map`, `Clock`, `Phone`, `Person`, `Envelope`, `Check`, `XMark`, `FilterIcon`, `ArrowLeft`, `ArrowRight`, `FileText`, `Calendar`, `Repeat`, `Code`, `Zap`, `Moon`, `SunMoon`, `Sun`
- Custom SVG icons: `FaceSad`, `MenuToggle`, `Spinner`, `Search`, `XCircle`, `ChevronLeft`, `ChevronRight`
- If you need a new icon, add it to `@/components/ui/icons.tsx` first, then import it
- Example:
    - ✅ Good: `import { Check, ArrowRight } from '@/components/ui/icons'`
    - ❌ Bad: `import { LuCheck } from 'react-icons/lu'`

### Styling

- Use **Tailwind CSS** utility classes exclusively
- Follow SILARHI design system: rounded corners, soft shadows, generous spacing
- **ALWAYS use `cn()` utility** from `@/utils/lib` for conditional class composition
- **ALWAYS use object syntax** for conditional classes in `cn()`:
    - ✅ Good: `cn('base-classes', { 'conditional-class': condition })`
    - ❌ Bad: `className={\`base-classes ${condition ? 'conditional-class' : ''}\``
    - ❌ Bad: `className={condition ? 'class-a' : 'class-b'}`
- **Never use template literals or ternaries** for dynamic className - always use `cn()` with object syntax
- **Compute classes inline** - avoid storing className in intermediate constants before passing to `cn()`

### Accessibility & SEO

- Always use semantic HTML (`<button>`, `<nav>`, `<header>`, etc.)
- Include alt text for images
- Optimize metadata via Next.js `metadata` API in layout/page files
- Use `aria-*` attributes when relevant

## Adding New Features

### Adding a New Project

1. Create directory `content/projects/[project-slug]/`
2. Create `index.mdx` with required frontmatter fields:
    - `title`, `slug`, `date`, `excerpt`
    - `client` (slug reference to client in `content/clients/`)
    - `technologies` (array of slugs referencing `content/technologies/`)
    - `published` (boolean)
    - `scope`, `codeOwnership`, `category`, `engagement`
    - `overview`, `challenge`, `solution` (and usually `image`)
3. Optionally add iteration files (v1.mdx, v2.mdx) for multi-phase projects
4. Run `yarn generate:image-metadata` if you added an image (CI also does it), then `yarn lint-ci` (validates client/technology/image references)
5. Project automatically appears on `/projets` page if `published: true`
6. Use `yarn dev` to preview changes locally (hot reload enabled)

### Adding a New Page

1. Create page in `src/app/[route]/page.tsx`
2. Define metadata using Next.js `metadata` export or `generateMetadata()`
3. Do not wrap the page in `DefaultLayout`: the root layout already applies it (navbar + footer) to every page
4. For dynamic routes, implement `generateStaticParams()` for static generation
5. **Update sitemap** (`src/app/sitemap.ts`):
    - For static pages: Add entry to `staticPages` array with appropriate priority and change frequency
    - For dynamic routes: Import utility function (e.g., `getAllTechnologies`), fetch data, and map to sitemap entries
    - Example priorities: homepage (1.0), main pages (0.8), detail pages (0.6-0.7), legal (0.3)

### Adding Form Fields

1. Define field in parent form component using `useForm<FormData>()`
2. Pass `register`, `getFieldState`, `formState` to field component
3. Field components go through `FormField`, which uses the `useFormFieldProps()` hook to extract state/validation
4. Ensure field has proper TypeScript types matching form data structure

## CI & Deployment

The site is deployed on **Vercel**, behind **Cloudflare**. GitHub Actions workflows (`.github/workflows/`, all on Node 24):

- `continuous-integration.yml` - On pull requests and pushes to `main`: `yarn lint-ci`, plus a `CI passed` aggregate job
- `bundle-size.yml` - On pull requests to `main`: builds the base and PR branches, runs `size-limit` (`.size-limit.json`: 500 kB JS / 100 kB CSS gzipped) and posts a comparison comment
- `generate-image-metadata.yml` - On pushes to `main` and pull requests touching `content/**` or `public/images/**`: runs `yarn generate:image-metadata` and commits changed MDX files back to the branch
- `validate-urls.yml` - Weekly (Mondays 09:00 UTC) and on manual dispatch: `yarn validate:urls`

## Philosophy

Build with elegance, simplicity, and technical excellence. The SILARHI website is both a marketing showcase and a reflection of code quality. Prefer concise, readable code over clever tricks. Suggest reusable UI components instead of duplicating layout. Maintain a professional yet friendly tone in all content.
