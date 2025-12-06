import { cn } from '@/utils/lib'

interface OverlapContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export default function OverlapContent({ children, className, ...props }: OverlapContentProps) {
    return (
        <div className="container mx-auto px-4 lg:px-8">
            <div
                className={cn(
                    'bg-background -mt-16 rounded-2xl p-6 shadow-lg lg:-mt-24 lg:rounded-3xl lg:p-10',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </div>
    )
}
