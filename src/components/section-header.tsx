interface SectionHeaderProps {
    title: string
    subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="mt-4 mb-5 text-center">
            <h2 className="mb-3 text-4xl">{title}</h2>
            {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
        </div>
    )
}
