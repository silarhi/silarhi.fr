import Image from 'next/image'
import Link from 'next/link'

import Badge from '@/components/ui/badge'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import type { ClientMetadata } from '@/utils/client'
import { cn } from '@/utils/lib'
import type { Project } from '@/utils/project'

interface ClientsSectionProps {
    clients: ClientMetadata[]
    projects: Project[]
}

export default function ClientsSection({ clients, projects }: ClientsSectionProps) {
    // Filter clients that have projects
    const clientsWithProjects = clients.filter((client) => client.slug)

    // Helper function to get the correct link for each client
    const getClientLink = (clientSlug: string): string => {
        const clientProjects = projects.filter((project) => project.client.slug === clientSlug)

        // If only one project, link directly to it
        if (clientProjects.length === 1) {
            return `/projets/${clientProjects[0].slug}`
        }

        // Otherwise, link to projects page with client filter
        return `/projets?client=${clientSlug}`
    }

    return (
        <Section id="clients" className="bg-surface border-border border-t">
            <SectionHeader
                title={
                    <span>
                        Ils nous font <span className="text-primary">confiance</span>
                    </span>
                }
                subtitle={<Badge variant="secondary">Nos clients</Badge>}
            />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
                {clientsWithProjects.map((client, index) => (
                    <FadeInWhenVisible key={client.slug} delay={index * 0.05}>
                        <Link
                            href={getClientLink(client.slug)}
                            title={client.name}
                            className="bg-surface dark:bg-surface-elevated border-border group block overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                            <div className="flex aspect-square items-center justify-center p-6">
                                {client.logo ? (
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className={cn(
                                                'object-contain transition-opacity duration-300 group-hover:opacity-80 dark:invert',
                                                client.logoClassName
                                            )}
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-center">
                                        <span className="text-foreground/70 group-hover:text-primary text-sm font-semibold transition-colors duration-300">
                                            {client.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </FadeInWhenVisible>
                ))}
            </div>
        </Section>
    )
}
