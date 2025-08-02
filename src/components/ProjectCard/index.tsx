import Link from 'next/link'

import { Calendar, Clock, User } from '@/components/Icons'
import { ProjectProject } from '@/utils/project'

interface ProjectCardProps {
    project: ProjectProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column">
                <div className="mb-3">
                    <h3 className="card-title h5">
                        <Link href={`/projets/${project.slug}`} className="text-decoration-none text-dark">
                            {project.title}
                        </Link>
                    </h3>

                    {project.excerpt && <p className="card-text text-muted">{project.excerpt}</p>}
                </div>

                <div className="mt-auto small">
                    {project.tags.length > 0 && (
                        <div className="mb-2">
                            {project.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/project/tag/${tag.toLowerCase()}`}
                                    className="badge bg-primary me-1 text-decoration-none"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className="d-flex flex-wrap align-items-center text-muted">
                        <span className="me-3">
                            <User className="me-1" />
                            {project.author}
                        </span>
                        <span className="me-3">
                            <Clock className="me-1" />
                            {project.readingTime}
                        </span>
                        <time dateTime={project.date}>
                            <Calendar className="me-1" />
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
