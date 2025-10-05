import ProjectCard from '@/components/project-card'
import { ProjectProject } from '@/utils/project'

interface ProjectGridProps {
    projects: ProjectProject[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <div key={project.slug}>
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    )
}
