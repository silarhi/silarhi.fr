import { cn } from '@/utils/lib'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean
    fluid?: boolean
    paddingY?: boolean
}

export default function Section({
    container = true,
    fluid = false,
    children,
    className,
    paddingY = true,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                {
                    'py-16 lg:py-20': paddingY,
                },
                className
            )}
            {...props}
        >
            {container ? (
                <div className={cn('container mx-auto px-4 lg:px-8', { 'w-full': fluid })}>{children}</div>
            ) : (
                children
            )}
        </section>
    )
}
