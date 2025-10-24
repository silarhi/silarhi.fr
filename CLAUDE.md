# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SILARHI.fr is the official website for SILARHI, a web development agency based in Toulouse, France. The site is built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, serving as both a marketing showcase and a demonstration of technical quality.

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
- `src/app/projets/page.tsx` - Projects listing
- `src/app/projets/[slug]/page.tsx` - Dynamic project pages
- `src/app/projets/tag/[tag]/page.tsx` - Projects filtered by tag
- `src/app/contact/page.tsx` - Contact form
- `src/app/layout.tsx` - Root layout with metadata, Google Analytics, fonts

All pages are statically generated at build time using `generateStaticParams()`.

### Content Management (MDX)
Projects and content are stored as MDX files in `src/content/`:
- **Projects**: `src/content/projects/*.mdx` with YAML frontmatter (title, date, excerpt, author, tags, published, readingTime)
- **Tags**: `src/content/tags/*.md` for project categorization

Content processing pipeline:
- **gray-matter** parses frontmatter
- **next-mdx-remote** renders MDX with custom components
- **Remark plugins**: `remark-gfm` (GitHub Flavored Markdown)
- **Rehype plugins**: `rehype-slug`, `rehype-autolink-headings`, `rehype-unwrap-images`
- Utilities in `src/utils/project.ts` handle reading/parsing MDX files

### Component Organization
```
src/components/
├── layouts/          # Page layouts (default layout with navbar/footer)
├── forms/            # Form components (input, textarea, label, group)
├── *.tsx             # UI components (button, hero-title, navbar, footer, etc.)
```

Components follow these patterns:
- Functional components with TypeScript interfaces for props
- Default exports preferred
- Tailwind CSS for styling with `cn()` utility (clsx + tailwind-merge) for class composition
- Client components explicitly marked with `'use client'`

### Form Handling
Forms use **react-hook-form** with a custom hook pattern:
- `useFormFieldProps<TFieldValues>()` hook (in `src/hooks/form.ts`) abstracts field state, validation, and error handling
- Generic `FormFieldProps<TFieldValues>` interface ensures type safety
- Parent form (e.g., `ContactForm`) manages state with `useForm()`, passes props to fields
- Field components (`Input`, `Textarea`) use the hook to extract validation state
- Contact form submits to Formspree (external email service)

### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Use the alias for imports: `import { cn } from '@/utils/lib'`

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

### Styling
- Use **Tailwind CSS** utility classes exclusively
- Follow SILARHI design system: rounded corners, soft shadows, generous spacing
- Use `cn()` utility from `@/utils/lib` for conditional class composition

### Accessibility & SEO
- Always use semantic HTML (`<button>`, `<nav>`, `<header>`, etc.)
- Include alt text for images
- Optimize metadata via Next.js `metadata` API in layout/page files
- Use `aria-*` attributes when relevant

## Adding New Features

### Adding a New Project
1. Create `src/content/projects/[slug].mdx` with required frontmatter
2. Include required fields: title, date, excerpt, author, tags, published, readingTime
3. Project automatically appears on `/projets` page if `published: true`
4. Use `yarn dev` to preview changes locally (no build needed for development)

### Adding a New Page
1. Create page in `src/app/[route]/page.tsx`
2. Define metadata using Next.js `metadata` export or `generateMetadata()`
3. Use `DefaultLayout` wrapper if the page needs navbar/footer (most pages do)
4. For dynamic routes, implement `generateStaticParams()` for static generation

### Adding Form Fields
1. Define field in parent form component using `useForm<FormData>()`
2. Pass `register`, `getFieldState`, `formState` to field component
3. Field component uses `useFormFieldProps()` hook to extract state/validation
4. Ensure field has proper TypeScript types matching form data structure

## Philosophy

Build with elegance, simplicity, and technical excellence. The SILARHI website is both a marketing showcase and a reflection of code quality. Prefer concise, readable code over clever tricks. Suggest reusable UI components instead of duplicating layout. Maintain a professional yet friendly tone in all content.