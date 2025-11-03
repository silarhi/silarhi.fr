import { ArrowRight, Repeat, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/button'
import { ProjectProject } from '@/utils/project'

interface ProjectListProps {
    projects: ProjectProject[]
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <div className="space-y-24">
            {projects.map((project, index) => (
                <article
                    key={project.slug}
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                        index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}
                >
                    {/* Image */}
                    <div
                        className={`bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl ${
                            index % 2 === 1 ? 'lg:col-start-2' : ''
                        }`}
                    >
                        {project.image ? (
                            <Image src={project.image} alt={project.title} fill className="object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <svg className="text-muted h-24 w-24" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}

                        {/* Project type badge on image */}
                        {project.projectType && (
                            <div className="absolute top-4 right-4">
                                {project.projectType === 'one-shot' ? (
                                    <div className="text-foreground flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
                                        <Zap className="text-secondary h-3.5 w-3.5" />
                                        Mission ponctuelle
                                    </div>
                                ) : (
                                    <div className="text-foreground flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
                                        <Repeat className="text-primary h-3.5 w-3.5" />
                                        Partenariat continu
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                        {/* Category badge */}
                        <div className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                            {project.category}
                        </div>

                        <h2 className="text-foreground mb-3 text-3xl font-bold lg:text-4xl">{project.title}</h2>

                        {project.client && <p className="text-muted mb-6 text-sm">{project.client.name}</p>}

                        <p className="text-foreground/80 mb-8 text-lg leading-relaxed">{project.excerpt}</p>

                        {/* Results - show challenge points if available, otherwise tasks */}
                        {project.challenge?.points && project.challenge.points.length > 0 ? (
                            <div className="border-border bg-surface mb-8 rounded-xl border p-6">
                                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                                    Résultats Clés
                                </h3>
                                <ul className="space-y-3">
                                    {project.challenge.points.slice(0, 3).map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="bg-secondary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                            <span className="text-foreground font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : project.tasks.length > 0 ? (
                            <div className="border-border bg-surface mb-8 rounded-xl border p-6">
                                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                                    Points Clés
                                </h3>
                                <ul className="space-y-3">
                                    {project.tasks.slice(0, 3).map((task) => (
                                        <li key={task.slug} className="flex items-start gap-3">
                                            <div className="bg-secondary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                                            <span className="text-foreground font-medium">{task.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {/* Technologies tags */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech.slug}
                                    className="border-border bg-background text-muted rounded-full border px-3 py-1 text-xs font-medium"
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>

                        <Link href={`/projets/${project.slug}`}>
                            <Button
                                variant="outline-primary"
                                className="group hover:bg-primary bg-transparent hover:text-white"
                            >
                                Voir le cas client
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}
