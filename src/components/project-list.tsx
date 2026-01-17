import Link from 'next/link'

import Badge from '@/components/ui/badge'
import BadgeGroup from '@/components/ui/badge-group'
import Button from '@/components/ui/button'
import { ArrowRight } from '@/components/ui/icons'
import { LaptopMockup } from '@/components/ui/mockup'
import ProjectScopeBadge from '@/components/ui/project-scope-badge'
import { cn } from '@/utils/lib'
import { Project } from '@/utils/project'

interface ProjectListProps {
    projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <div className="space-y-24">
            {projects.map((project, index) => (
                <article
                    key={project.slug}
                    className={cn('grid items-center gap-8 lg:grid-cols-2 lg:gap-16', {
                        'lg:grid-flow-dense': index % 2 === 1,
                    })}
                >
                    {/* Image */}
                    {project.image && (
                        <div
                            className={cn(
                                'bg-muted/10 dark:bg-muted/5 relative flex h-full items-center justify-center overflow-hidden rounded-2xl p-2 lg:p-4',
                                {
                                    'lg:col-start-2': index % 2 === 1,
                                }
                            )}
                        >
                            <div className="flex-1">
                                <LaptopMockup src={project.image} alt={project.title} />
                            </div>

                            {/* Project type badge on image */}
                            <div className="absolute top-4 right-4">
                                <ProjectScopeBadge
                                    scope={project.scope}
                                    size="sm"
                                    className="text-foreground dark:text-foreground bg-surface/95 dark:bg-light/95 shadow-lg backdrop-blur-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className={cn({
                            'lg:col-start-1 lg:row-start-1': index % 2 === 1,
                            'col-span-2': !project.image,
                        })}
                    >
                        {/* Badges */}
                        <BadgeGroup gap="md" size="sm" className="mb-4">
                            <Badge size="sm">{project.category}</Badge>
                            <Badge size="sm">{project.client.sector}</Badge>
                            {!project.image && <ProjectScopeBadge scope={project.scope} size="sm" />}
                        </BadgeGroup>

                        <h2 className="text-foreground mb-3 text-3xl font-bold lg:text-4xl">
                            <Link
                                href={`/projets/${project.slug}`}
                                className="hover:text-primary text-inherit no-underline transition-colors"
                            >
                                {project.name && project.name + ' - '}
                                {project.title}
                            </Link>
                        </h2>

                        <p className="text-foreground/80 mb-6 text-sm uppercase">
                            {project.client.name} -{' '}
                            {project.date.toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                            })}
                        </p>
                        <p className="text-foreground/80 mb-8 text-lg leading-relaxed">{project.excerpt}</p>

                        {/* Technologies tags */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {[...project.technologies]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .slice(0, 4)
                                .map((tech) => (
                                    <Link
                                        key={tech.slug}
                                        href={`/technologies/${tech.slug}`}
                                        className="hover:border-primary hover:bg-primary/5 hover:text-primary bg-surface dark:bg-light dark:border-border dark:text-foreground dark:hover:border-primary-light dark:hover:bg-primary-light/10 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 no-underline transition-colors"
                                    >
                                        {tech.name}
                                    </Link>
                                ))}
                        </div>

                        <Link href={`/projets/${project.slug}`}>
                            <Button variant="primary" className="group">
                                Le projet en détail
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}
