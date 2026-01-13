import Image from 'next/image'
import Link from 'next/link'

import Badge from '@/components/ui/badge'
import FadeInWhenVisible from '@/components/ui/fade-in-when-visible'
import Section from '@/components/ui/section'
import SectionHeader from '@/components/ui/section-header'
import type { Client } from '@/utils/client'
import type { ClientLinkData } from '@/utils/project'

interface ClientsSectionProps {
    clients: Client[]
    clientLinks: Record<string, ClientLinkData>
}

export default function ClientsSection({ clients, clientLinks }: ClientsSectionProps) {
    // Filter clients that have projects (use pre-computed data)
    const clientsWithProjects = clients.filter((client) => clientLinks[client.slug])

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
                            href={clientLinks[client.slug].link}
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
                                            className="object-contain transition-opacity duration-300 group-hover:opacity-80 dark:invert"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                            placeholder={client.blurDataURL ? 'blur' : 'empty'}
                                            blurDataURL={client.blurDataURL}
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
