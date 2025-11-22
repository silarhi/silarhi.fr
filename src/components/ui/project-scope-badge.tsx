import Badge from '@/components/ui/badge'
import { Code, Repeat, Zap } from '@/components/ui/icons'
import { cn } from '@/utils/lib'
import { ProjectScope } from '@/utils/project'

interface ProjectTypeBadgeProps {
    scope: ProjectScope
    size?: 'sm' | 'md'
    className?: string
}

export default function ProjectScopeBadge({ scope, size = 'md', className }: ProjectTypeBadgeProps) {
    const scopeLabels = {
        full_development: 'Développement complet',
        feature_integration: 'Intégration de fonctionnalités',
        takeover_and_evolution: 'Reprise et évolution',
        maintenance_and_support: 'Maintenance et support',
    }

    const scopeIcons = {
        full_development: Code,
        feature_integration: Zap,
        takeover_and_evolution: Repeat,
        maintenance_and_support: Repeat,
    }

    const IconComponent = scopeIcons[scope]
    const label = scopeLabels[scope]
    return (
        <Badge
            variant="secondary"
            size={size}
            icon={
                <IconComponent
                    className={cn('text-secondary', {
                        'h-3.5 w-3.5': size === 'sm',
                        'h-4 w-4': size === 'md',
                    })}
                />
            }
            className={className}
        >
            {label}
        </Badge>
    )
}
