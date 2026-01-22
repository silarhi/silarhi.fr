import Link, { LinkProps } from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import type { PluggableList } from 'unified'

import { MDXImage } from '@/components/ui/mdx-image'
import rehypeAutoLinkTechnologies from '@/lib/rehype-auto-link-technologies'

interface MarkdownProps {
    source: string
    variant?: 'full' | 'inline'
    autoLinkTechnologies?: boolean
}

function CustomLink({ href, className, ...props }: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    // Special styling for auto-linked technology keywords
    const isTechLink = className?.includes('tech-link')
    const linkClasses = isTechLink
        ? 'text-primary hover:text-primary-dark font-medium underline decoration-primary/30 hover:decoration-primary transition-colors'
        : 'text-primary hover:text-primary-dark underline'

    if (href.startsWith('/')) {
        return <Link href={href} className={linkClasses} {...props} />
    }

    if (href.startsWith('#')) {
        return <a className={linkClasses} {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" className={linkClasses} {...props} />
}

// Full MDX components for rich content
const fullComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="mb-4" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mt-5 mb-3" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-4 mb-3" {...props} />,
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className="border-primary my-4 border-l-4 pl-3 italic" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => <code className="rounded bg-gray-100 px-1" {...props} />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="text-surface my-3 overflow-auto rounded bg-gray-900 p-3" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="my-3 list-disc pl-6 last:mb-0" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="my-3 list-decimal pl-6" {...props} />,
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="mb-1 last:mb-0" {...props} />,
    a: CustomLink,
    img: MDXImage,
    Image: MDXImage,
}

// Inline components for simple formatting (no paragraphs, no images)
const inlineComponents = {
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <>{props.children}</>,
    a: CustomLink,
    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold" {...props} />,
    em: (props: React.HTMLAttributes<HTMLElement>) => <em {...props} />,
}

export default function Markdown({ source, variant = 'full', autoLinkTechnologies = true }: MarkdownProps) {
    const components = variant === 'inline' ? inlineComponents : fullComponents
    const rehypePlugins =
        variant === 'inline'
            ? [autoLinkTechnologies && rehypeAutoLinkTechnologies]
            : [
                  rehypeSlug,
                  rehypeAutolinkHeadings,
                  rehypeUnwrapImages,
                  autoLinkTechnologies && rehypeAutoLinkTechnologies,
              ]

    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: rehypePlugins.filter(Boolean) as PluggableList,
                },
            }}
        />
    )
}
