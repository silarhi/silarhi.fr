import Image from 'next/image'
import Link from 'next/link'

import { formatProjectPeriod, type Project } from '@/utils/project'

interface ProjectCardProps {
    project: Project
}

/**
 * Compact project card (screenshot, category, title, client and years), the whole card linking to the project page.
 * For short lists such as related projects; the listings use the larger ProjectList.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="bg-surface dark:bg-surface-elevated border-border group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
            {project.image && (
                <div className="bg-muted/10 relative aspect-16/10 overflow-hidden">
                    <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        placeholder={project.imageMetadata?.blur ? 'blur' : 'empty'}
                        blurDataURL={project.imageMetadata?.blur}
                    />
                </div>
            )}
            <div className="flex flex-1 flex-col p-6">
                <span className="text-primary dark:text-primary-light mb-2 text-xs font-semibold tracking-wide uppercase">
                    {project.category}
                </span>
                <h3 className="text-foreground mb-4 text-xl font-bold">
                    {/* Stretched over the whole card */}
                    <Link
                        href={`/projets/${project.slug}`}
                        data-analytics-event="project-view"
                        data-analytics-slug={project.slug}
                        className="group-hover:text-primary text-inherit no-underline transition-colors after:absolute after:inset-0"
                    >
                        {project.name && `${project.name} - `}
                        {project.title}
                    </Link>
                </h3>
                <p className="text-foreground/70 mt-auto mb-0 text-sm">
                    {project.client.name} · {formatProjectPeriod(project, 'year')}
                </p>
            </div>
        </article>
    )
}
