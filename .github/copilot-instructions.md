# 🧠 GitHub Copilot Instructions for SILARHI.fr

## 🏗️ Project Overview

This repository contains the source code for **SILARHI.fr**, the official website of SILARHI, a web development agency based in Toulouse, France.  
The site showcases our services, portfolio, and values, and acts as both a marketing showcase and a demonstration of our technical quality.

The goal is to maintain **clean, modern, and performant code**, with attention to accessibility, SEO, and developer experience.

---

## 🧰 Tech Stack

- **Frontend:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Content:** Markdown / MDX files for blog and portfolio entries
- **Hosting:** Cloudflare Pages (static export)
- **Analytics:** Plausible
- **CI/CD:** GitHub Actions → Cloudflare Pages

---

## 🧩 Coding Conventions

### General
- Prefer **functional components** with TypeScript.
- Follow the **ESLint + Prettier** configuration provided.
- Write **self-documenting code**: clear variable names > comments.
- Use **async/await** over `.then()` syntax.

### Components
- Each component should live in its own file under `src/components/`.
- Keep components **stateless** when possible.
- Use **props interfaces** for all components.
- Export components as **default** unless there’s a good reason not to.

### Styling
- Use **Tailwind CSS** utility classes.
- For complex compositions, use **class-variance-authority (cva)** or component-level style objects.
- Follow **SILARHI design system** (rounded corners, soft shadows, generous spacing).

### Accessibility & SEO
- Always use semantic HTML (e.g., `<button>`, `<nav>`, `<header>`).
- Include alt text for images.
- Optimize metadata via Next.js `metadata` API.
- Use `aria-*` attributes when relevant.

### Git & Project Structure
- Branch naming: `feature/…`, `fix/…`, `content/…`
- Commit messages: imperative style (“Add hero section” not “Added…”).
- Pull requests should include a short description of the feature or fix.

---

## 🧪 Copilot Guidance

When generating code, **Copilot should**:
- Prefer **concise, readable code** over clever tricks.
- Follow the structure and conventions of existing files.
- Suggest **reusable UI components** instead of duplicating layout.
- Provide **Tailwind utility-first** examples.
- When writing text content (e.g., meta descriptions), use **a professional yet friendly tone** consistent with SILARHI’s voice.

---

## 🧭 Example Prompts

> “Add a new section on the homepage showcasing recent projects.”  
> “Create a React component for a testimonial carousel with Tailwind and motion effects.”  
> “Generate MDX content for a new blog post about Symfony best practices.”  
> “Suggest meta tags for the contact page.”

---

## 💡 Philosophy

> Build with elegance, simplicity, and technical excellence.  
> The SILARHI website is both a marketing showcase and a reflection of our code quality.
