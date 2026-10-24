import Link from 'next/link'
import { Children, isValidElement, type ReactNode } from 'react'

import LegalIdentityCard from '@/components/legal-identity-card'
import type { LegalSectionProps } from '@/components/legal-section'
import LegalToc from '@/components/legal-toc'
import Badge from '@/components/ui/badge'
import { ChevronRight, Clock, Cookie, FileText, House, Landmark, ShieldCheck } from '@/components/ui/icons'
import Section from '@/components/ui/section'
import { cn } from '@/utils/lib'

const legalPages = [
    { href: '/mentions-legales', label: 'Mentions légales', icon: Landmark },
    { href: '/politique-de-confidentialite', label: 'Confidentialité', icon: ShieldCheck },
    { href: '/cookies', label: 'Cookies', icon: Cookie },
    { href: '/conditions-generales-de-vente', label: 'CGV', icon: FileText },
] as const

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' })

interface LegalLayoutProps {
    /** Path of the current legal page, which selects its tab */
    current: (typeof legalPages)[number]['href']
    title: string
    lead: ReactNode
    /** Date of the last update, as YYYY-MM-DD */
    updated: string
    /** Extra actions under the date (e.g. a PDF download) */
    actions?: ReactNode
    /** Opens the content with the publisher and company card (mentions légales only) */
    identity?: boolean
    /** LegalSection elements: each one becomes a numbered card listed in the table of contents */
    children: ReactNode
}

export default function LegalLayout({ current, title, lead, updated, actions, identity, children }: LegalLayoutProps) {
    const currentPage = legalPages.find((page) => page.href === current)
    const sections = Children.toArray(children)
        .filter(isValidElement<LegalSectionProps>)
        .map((section) => ({ id: section.props.id, title: section.props.title }))

    const tocItems = [
        ...(identity ? [{ id: 'informations-legales', title: 'Informations légales' }] : []),
        ...sections.map((section, index) => ({ ...section, number: index + 1 })),
    ]

    return (
        <>
            <div className="bg-surface border-border border-b pt-28 pb-10 lg:pt-36 lg:pb-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <nav aria-label="Fil d’Ariane" className="mb-8">
                        <ol className="text-foreground/70 flex flex-wrap items-center gap-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-foreground/70 hover:text-primary flex min-h-6 items-center gap-1.5 hover:no-underline"
                                >
                                    <House aria-hidden="true" />
                                    Accueil
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <ChevronRight className="text-muted size-4" />
                            </li>
                            <li>Informations juridiques</li>
                            <li aria-hidden="true">
                                <ChevronRight className="text-muted size-4" />
                            </li>
                            <li className="text-primary font-semibold" aria-current="page">
                                {currentPage?.label}
                            </li>
                        </ol>
                    </nav>
                    <div className="max-w-3xl">
                        <Badge size="sm" className="mb-5 uppercase tracking-wide">
                            Informations juridiques
                        </Badge>
                        <h1 className="text-foreground mb-5 text-4xl font-bold text-balance lg:text-5xl">{title}</h1>
                        <p className="text-foreground/80 mb-6 text-lg leading-relaxed">{lead}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="bg-background border-border text-foreground/80 mb-0 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm">
                                <Clock className="text-primary" aria-hidden="true" />
                                <span>
                                    Dernière mise à jour&nbsp;:{' '}
                                    <time dateTime={updated}>{dateFormatter.format(new Date(updated))}</time>
                                </span>
                            </p>
                            {actions}
                        </div>
                    </div>
                    <nav
                        aria-label="Documents juridiques"
                        className="bg-background border-border mt-10 grid grid-cols-2 gap-1.5 rounded-xl border p-1.5 sm:flex sm:w-fit sm:flex-wrap"
                    >
                        {legalPages.map((page) => {
                            const Icon = page.icon
                            const isCurrent = page.href === current

                            return (
                                <Link
                                    key={page.href}
                                    href={page.href}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={cn(
                                        'flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:no-underline',
                                        {
                                            'bg-primary text-white shadow-sm hover:text-white': isCurrent,
                                            'text-foreground/80 hover:bg-surface hover:text-foreground': !isCurrent,
                                        }
                                    )}
                                >
                                    <Icon className="shrink-0" aria-hidden="true" />
                                    {page.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
            <Section className="py-10 lg:py-16">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <aside className="hidden lg:col-span-4 lg:block">
                        <LegalToc items={tocItems} />
                    </aside>
                    <article className="space-y-6 [counter-reset:legal-section] lg:col-span-8">
                        {identity && <LegalIdentityCard />}
                        {children}
                    </article>
                </div>
            </Section>
        </>
    )
}
