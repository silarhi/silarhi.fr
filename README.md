<p align="center">
  <img src="./public/images/logo-vertical-light-4096.png" alt="SILARHI Logo Vertical" width="180" />
</p>

<p align="center">
  <b>Web agency in Toulouse — From design to maintenance</b>
</p>

## 🚀 Overview

[SILARHI.fr](https://silarhi.fr) is the official website of <b>SILARHI</b>, a web agency based in Toulouse, France, specialized in PHP / Symfony websites development.

## 🧰 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack dev server) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX files in `content/` (`clients/`, `projects/`, `technologies/`), rendered with `next-mdx-remote`
- **Tooling**: Biome (JS/TS lint + format), Prettier (CSS/Markdown/MDX/YAML), Knip
- **CI**: GitHub Actions (Node 24)
- **Hosting**: Vercel, behind Cloudflare

## ✨ Main Features

- Agency presentation (methodology, services, key figures)
- Project portfolio with search and filters (`/projets`), plus one page per technology (`/technologies/[slug]`)
- Contact form (Formspree), legal notices, privacy and cookies policies, terms of sale
- Optimized SEO (JSON-LD, sitemap, robots) & accessibility, light/dark theme

The blog is a separate site ([blog.silarhi.fr](https://blog.silarhi.fr)), linked from the navigation.

## 📦 Local Installation

```bash
pnpm install
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## 🔍 Quality Checks

```bash
pnpm lint-ci        # lint + typecheck + knip + validate:technologies/clients/images (run in CI)
pnpm lint:fix       # Biome autofix on src/ and scripts/
pnpm prettier       # format CSS/Markdown/MDX/YAML
pnpm validate:urls  # check external URLs in content (weekly in CI)
```

## 🧑‍💻 Contributing

- Fork the repository
- Create a branch `feature/…` or `fix/…`
- Make sure `pnpm lint-ci` passes
- Open a descriptive Pull Request

## 📄 License

© SILARHI — all rights reserved. The source code is published for reference only; the content (texts, images, logos) is proprietary.
