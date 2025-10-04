interface SectionHeaderProps {
    title: string
    subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="mt-4 mb-5 text-center">
            <h2 className="text-4xl mb-3">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
    )
}
