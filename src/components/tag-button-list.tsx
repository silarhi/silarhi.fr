import Button from '@/components/button'
import { type TagMetadata } from '@/utils/tags'

interface TagButtonListProps {
    tags: TagMetadata[]
    variant?: 'outline-primary' | 'outline-dark'
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function TagButtonList({ tags, variant = 'outline-primary', size = 'md' }: TagButtonListProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Button as="a" key={tag.slug} href={`/projets/tag/${tag.slug}`} variant={variant} size={size}>
                    {tag.name}
                </Button>
            ))}
        </div>
    )
}
