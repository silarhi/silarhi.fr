import Link from 'next/link'

import Button from '@/components/button'
import { Calendar, Clock, User } from '@/components/icons'
import { ProjectProject } from '@/utils/project'

interface ProjectCardProps {
    project: ProjectProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="bg-surface border-border h-full overflow-hidden rounded-lg border shadow-sm">
            <div className="flex h-full flex-col p-6">
                <div className="mb-3">
                    <h3 className="mb-4 text-xl font-medium">
                        <Link
                            href={`/projets/${project.slug}`}
                            className="hover:text-primary text-inherit no-underline"
                        >
                            {project.title}
                        </Link>
                    </h3>

                    {project.excerpt && <p className="text-muted">{project.excerpt}</p>}
                </div>

                <div className="mt-auto text-sm">
                    {project.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1">
                            {project.tags.map((tag) => (
                                <Button as="a" key={tag.slug} href={`/projets/tag/${tag.slug.toLowerCase()}`} size="xs">
                                    {tag.name}
                                </Button>
                            ))}
                        </div>
                    )}
                    <div className="text-muted flex flex-wrap items-center">
                        <span className="mr-3">
                            <User className="mr-1 inline" />
                            {project.author}
                        </span>
                        <span className="mr-3">
                            <Clock className="mr-1 inline" />
                            {project.readingTime}
                        </span>
                        <time dateTime={project.date}>
                            <Calendar className="mr-1 inline" />
                            {new Date(project.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </div>
            </div>
        </article>
    )
}
