import Link from 'next/link'

import { Calendar, Clock, User } from '@/components/Icons'
import { ProjectProject } from '@/utils/project'

interface ProjectCardProps {
    project: ProjectProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="bg-white h-full shadow-sm rounded-lg border-0 overflow-hidden">
            <div className="p-6 flex flex-col h-full">
                <div className="mb-3">
                    <h3 className="text-xl font-medium">
                        <Link
                            href={`/projets/${project.slug}`}
                            className="no-underline text-gray-900 hover:text-primary"
                        >
                            {project.title}
                        </Link>
                    </h3>

                    {project.excerpt && <p className="text-gray-600">{project.excerpt}</p>}
                </div>

                <div className="mt-auto text-sm">
                    {project.tags.length > 0 && (
                        <div className="mb-2">
                            {project.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={`/projets/tag/${tag.slug.toLowerCase()}`}
                                    className="inline-block bg-primary text-white px-2 py-1 rounded mr-1 no-underline text-xs"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap items-center text-gray-600">
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
