'use client'

import Section from '@/components/section'

interface HeroTitleProps {
    title: string
    subtitle?: string
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
    return (
        <Section
            className="from-primary relative overflow-hidden bg-gradient-to-br via-blue-700 to-cyan-600"
            fluid
            paddingY={false}
        >
            {/* Modern gradient orbs background */}
            <div className="pointer-events-none absolute inset-0">
                {/* Animated gradient spheres */}
                <div className="animate-float-slow absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl" />
                <div className="animate-float-delayed absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/30 to-cyan-500/30 blur-3xl" />
                <div className="animate-float-reverse absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl" />

                {/* Subtle grid pattern */}
                <div className="grid-pattern absolute inset-0 opacity-5" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 text-center md:py-32 lg:py-40">
                {/* Company badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    <span className="text-sm font-medium text-white">SILARHI</span>
                </div>

                {/* Main title */}
                <h1 className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-cyan-50 sm:text-xl md:text-2xl">
                        {subtitle}
                    </p>
                )}

                {/* Decorative accent line */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
                    <div className="h-1 w-1 rounded-full bg-cyan-400" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
                </div>
            </div>

            <style jsx>{`
                .grid-pattern {
                    background-image:
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                }

                @keyframes float-slow {
                    0%,
                    100% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(30px, 30px);
                    }
                }

                @keyframes float-delayed {
                    0%,
                    100% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(-30px, 30px);
                    }
                }

                @keyframes float-reverse {
                    0%,
                    100% {
                        transform: translate(-50%, -50%);
                    }
                    50% {
                        transform: translate(calc(-50% + 20px), calc(-50% - 20px));
                    }
                }

                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                .animate-float-reverse {
                    animation: float-reverse 30s ease-in-out infinite;
                }
            `}</style>
        </Section>
    )
}
