import { Metadata } from 'next'

import Button from '@/components/button'
import FadeInWhenVisible from '@/components/fade-in-when-visible'
import HeroTitle from '@/components/hero-title'
import Section from '@/components/section'
import SectionHeader from '@/components/section-header'
import { getAllClients } from '@/utils/client'
import { getProjectsByClient } from '@/utils/project'

export const metadata: Metadata = {
    title: 'Nos Clients - SILARHI',
    description: 'Découvrez les clients qui nous font confiance pour leurs projets web.',
}

export default async function ClientsPage() {
    const clients = await getAllClients()

    // Get project counts for each client
    const clientsWithProjects = await Promise.all(
        clients.map(async (client) => {
            const projects = await getProjectsByClient(client.slug)
            return {
                ...client,
                projectCount: projects.length,
            }
        })
    )

    // Filter clients with at least one project
    const activeClients = clientsWithProjects.filter((client) => client.projectCount > 0)

    return (
        <>
            <HeroTitle
                title="Nos Clients"
                subtitle="Découvrez les entreprises qui nous font confiance pour leurs projets web"
            />

            <Section>
                <SectionHeader
                    title={`${activeClients.length} client${activeClients.length > 1 ? 's' : ''}`}
                    subtitle="Nous accompagnons des entreprises de toutes tailles dans leur transformation digitale"
                />

                <FadeInWhenVisible>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {activeClients.map((client) => (
                            <div
                                key={client.slug}
                                className="border-border flex flex-col rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <h3 className="mb-2 text-xl font-semibold">{client.name}</h3>
                                <p className="text-muted mb-3 text-sm">
                                    {client.projectCount} projet{client.projectCount > 1 ? 's' : ''}
                                </p>
                                <div className="mt-auto">
                                    <Button as="a" href={`/clients/${client.slug}`} variant="outline-primary" size="sm">
                                        Voir les projets
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                    <div className="mt-5 text-center">
                        <Button as="a" href="/projets" variant="outline-dark">
                            Voir tous les projets
                        </Button>
                    </div>
                </FadeInWhenVisible>
            </Section>
        </>
    )
}
