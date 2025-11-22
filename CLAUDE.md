# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SILARHI.fr is the official website for SILARHI, a web development agency based in Toulouse, France. The site is built with Next.js 16 (App Router), React 19, TypeScript 5, and Tailwind CSS 4, serving as both a marketing showcase and a demonstration of technical quality.

### Tech Stack (Major Versions)

- **Framework**: Next.js 16 with Turbopack dev server
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **Content**: MDX via next-mdx-remote + gray-matter
- **Forms**: react-hook-form 7
- **Animation**: framer-motion 12
- **Search**: fuse.js 7
- **Icons**: lucide-react, react-icons 5
- **Utilities**: clsx, tailwind-merge, use-debounce

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
yarn lint            # Run ESLint
yarn typecheck       # Run TypeScript compiler checks
yarn knip            # Check for unused exports, dependencies, and files
yarn lint-ci         # Run all checks (lint + typecheck + knip for unused code)
```

**IMPORTANT**: Always run `yarn knip` along with `yarn lint` and `yarn typecheck` to ensure code quality. Knip detects:

- Unused exports and files
- Unused dependencies in package.json
- Unreachable code
- Duplicate exports

Fix any issues reported by knip before considering the code quality checks complete.

## Architecture & Structure

### Routing (Next.js App Router)

This project uses **Next.js 16 App Router** (not Pages Router):

- `src/app/page.tsx` - Home page
- `src/app/projets/page.tsx` - Projects listing with search
- `src/app/projets/[slug]/page.tsx` - Dynamic project detail pages
- `src/app/technologies/page.tsx` - Technologies listing
- `src/app/technologies/[slug]/page.tsx` - Technology detail pages (projects using that tech)
- `src/app/clients/page.tsx` - Clients listing
- `src/app/clients/[slug]/page.tsx` - Client detail pages (projects for that client)
- `src/app/contact/page.tsx` - Contact form with Formspree integration
- `src/app/mentions-legales/page.tsx` - Legal notices page
- `src/app/conditions-generales-de-vente/page.tsx` - Terms and conditions page
- `src/app/layout.tsx` - Root layout with metadata, Google Analytics (G-PDTD5T600H), fonts
- `src/app/sitemap.ts` - Dynamic sitemap generation

All pages are statically generated at build time using `generateStaticParams()`.

**API Routes**:

- `src/app/api/technologies/route.ts` - JSON API endpoint for technologies data

**Fonts & Analytics**:

- Custom fonts configured in `src/app/fonts.ts` (Montserrat)
- Google Analytics 4 integrated (ID: G-PDTD5T600H)
- Analytics script in `src/app/layout.tsx` with `next/script`

### Content Management (MDX)

Projects and content are stored as MDX files in the `content/` directory at the project root:

- **Projects**: `content/projects/[project-slug]/` directories with:
    - `index.mdx` - Main project overview with YAML frontmatter
    - `*.mdx` - Project iterations/versions (v1.mdx, v2.mdx, etc.)

    **Project frontmatter schema**:

    ```yaml
    title: string
    slug: string
    date: string (YYYY-MM-DD)
    excerpt: string
    client: string (slug reference)
    technologies: string[] (slug references)
    published: boolean
    type: 'one-shot' | 'recurring'
    scope: 'full_development' | 'feature_integration' | etc.
    codeOwnership: 'from_scratch' | 'shared_codebase'
    category: string
    name: string (optional, product/app name if applicable)
    engagement: object (type, description, deliverables/ongoing)
    image: string (path to image)
    overview: string
    challenge: object (description, points[])
    solution: object (description, points[])
    ```

- **Clients**: `content/clients/*.mdx` with client metadata
- **Technologies**: `content/technologies/*.mdx` with technology metadata

Content processing pipeline:

- **gray-matter** parses YAML frontmatter
- **next-mdx-remote** renders MDX with custom components
- **Remark plugins**: `remark-gfm` (GitHub Flavored Markdown)
- **Rehype plugins**:
    - `rehype-slug` - Adds IDs to headings
    - `rehype-autolink-headings` - Adds anchor links to headings
    - `rehype-unwrap-images` - Removes wrapper paragraphs around images
    - Custom `rehype-auto-link-technologies` - Auto-links technology names
- Utilities in `src/utils/project.ts`, `src/utils/technology.ts`, `src/utils/client.ts` handle reading/parsing MDX files

### Component Organization

```
src/components/
├── ui/               # Reusable UI components (badge, button, icons, section, etc.)
├── layouts/          # Page layouts (default layout with navbar/footer)
├── forms/            # Form components (input, textarea, label, group, help)
├── *.tsx             # Feature-specific components (navbar, footer, project-list, etc.)
```

**Reusable UI Components** (`src/components/ui/`):

- `active-link.tsx` - Navigation link with active state styling
- `badge.tsx` / `badge-group.tsx` - Badge components for labels and tags
- `button.tsx` - Primary button component
- `fade-in-when-visible.tsx` - Framer Motion scroll animations
- `icons.tsx` - Centralized icon exports
- `mdx-image.tsx` - Image component for MDX content
- `mockup.tsx` - Device mockup components
- `pagination.tsx` - Server-side pagination component
- `project-scope-badge.tsx` - Specialized badge for project scope
- `section.tsx` / `section-header.tsx` / `section-title.tsx` - Section layout components
- `skeleton.tsx` - Loading skeleton component

**Feature Components** (`src/components/`):

- `navbar.tsx` / `footer.tsx` - Layout components
- `hero-section.tsx` - Hero section wrapper
- `project-list.tsx` - Project listing display
- `projects-content.tsx` - Main projects listing with search/filter
- `search-form.tsx` / `search-input.tsx` - Fuse.js-powered fuzzy search
- `markdown.tsx` - MDX content renderer with custom components
- `contact-form.tsx` - Contact form with react-hook-form validation

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
- Field components (`Input`, `Textarea`) use the hook to extract validation state
- Contact form submits to Formspree (external email service)

### Key Features

**Search Functionality**:

- Fuzzy search powered by **Fuse.js 7**
- Searches project titles, excerpts, categories, client names, technology names
- Debounced input with **use-debounce** for performance
- URL-based search state (query params) for shareable searches
- Located in `src/components/search-form.tsx` and `src/components/projects-content.tsx`

**Animations**:

- Scroll-triggered animations via **Framer Motion 12**
- `FadeInWhenVisible` component for entrance animations
- Smooth scrolling enabled globally (see `src/app/layout.tsx`)
- Optimized animations with `initial`, `whileInView`, `viewport` props

**Image Optimization**:

- Optimized image handling via `src/lib/images.ts`
- Supports both static imports and public paths
- Used throughout for project images, client logos, technology icons

### Utilities & Libraries

**Core Utilities** (`src/utils/`):

- `lib.ts` - `cn()` utility (clsx + tailwind-merge) for class composition
- `project.ts` - Project MDX parsing and retrieval functions
- `technology.ts` - Technology metadata handling
- `client.ts` - Client metadata handling
- `dates.ts` - Date formatting utilities
- `employees.ts` - Employee/author data

**Custom Rehype Plugins** (`src/lib/`):

- `rehype-auto-link-technologies.ts` - Auto-links technology mentions in content
- `images.ts` - Image optimization helpers

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Use the alias for imports: `import { cn } from '@/utils/lib'`
- Type definitions in `src/types/` (forms.ts, globals.d.ts)

## Coding Conventions

### General Principles

- **Functional components** with TypeScript
- Follow **ESLint + Prettier** configuration (runs automatically)
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
- Available icons: `Download`, `Map`, `Clock`, `Phone`, `Person`, `Envelope`, `Check`, `XMark`, `FilterIcon`, `ArrowLeft`, `ArrowRight`, `FileText`, `Calendar`, `Repeat`, `Code`, `Zap`
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
    - `projectType` ('one-shot' | 'recurring')
    - `projectScope`, `codeOwnership`, `category`, `engagement`
    - `image`, `overview`, `challenge`, `solution`
3. Optionally add iteration files (v1.mdx, v2.mdx) for multi-phase projects
4. Project automatically appears on `/projets` page if `published: true`
5. Use `yarn dev` to preview changes locally (hot reload enabled)

### Adding a New Page

1. Create page in `src/app/[route]/page.tsx`
2. Define metadata using Next.js `metadata` export or `generateMetadata()`
3. Use `DefaultLayout` wrapper if the page needs navbar/footer (most pages do)
4. For dynamic routes, implement `generateStaticParams()` for static generation
5. **Update sitemap** (`src/app/sitemap.ts`):
    - For static pages: Add entry to `staticPages` array with appropriate priority and change frequency
    - For dynamic routes: Import utility function (e.g., `getAllTechnologies`), fetch data, and map to sitemap entries
    - Example priorities: homepage (1.0), main pages (0.8), detail pages (0.6-0.7), legal (0.3)

### Adding Form Fields

1. Define field in parent form component using `useForm<FormData>()`
2. Pass `register`, `getFieldState`, `formState` to field component
3. Field component uses `useFormFieldProps()` hook to extract state/validation
4. Ensure field has proper TypeScript types matching form data structure

## SEO Documentation

The project includes comprehensive SEO documentation:

- **README_SEO.md** - Main SEO entry point and overview
- **SEO_STRATEGY.md** - Complete SEO strategy (2800+ lines)
- **SEO_IMPLEMENTATION.md** - Code changes and implementation guide
- **CONTENT_OPTIMIZATION_GUIDE.md** - Project content optimization guide
- **SEO_QUICK_REFERENCE.md** - Quick lookup cards and checklists
- **GOOGLE_SEARCH_CONSOLE_SETUP.md** - Monitoring and measurement guide

Refer to these documents when working on SEO-related features or content optimization.

## Philosophy

Build with elegance, simplicity, and technical excellence. The SILARHI website is both a marketing showcase and a reflection of code quality. Prefer concise, readable code over clever tricks. Suggest reusable UI components instead of duplicating layout. Maintain a professional yet friendly tone in all content.
