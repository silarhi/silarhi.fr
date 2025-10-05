import { Calendar, Clock, User } from '@/components/icons'

interface ProjectMetadataProps {
    author: string
    readingTime: string
    date: string
    updateDate?: string
    className?: string
}

export default function ProjectMetadata({
    author,
    readingTime,
    date,
    updateDate,
    className = '',
}: ProjectMetadataProps) {
    return (
        <div className={`text-muted flex flex-wrap items-center ${className}`}>
            <span className="mr-3">
                <User className="mr-1 inline" />
                {author}
            </span>
            <span className="mr-3">
                <Clock className="mr-1 inline" />
                {readingTime}
            </span>
            <time dateTime={date}>
                <Calendar className="mr-1 inline" />
                {new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                {updateDate && (
                    <span className="text-muted ml-2">
                        (mis à jour le{' '}
                        {new Date(updateDate).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        )
                    </span>
                )}
            </time>
        </div>
    )
}
