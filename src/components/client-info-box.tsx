import Image from 'next/image'
import Link from 'next/link'

import { ClientMetadata } from '@/utils/client'

interface ClientInfoBoxProps {
    client: ClientMetadata
}

export default function ClientInfoBox({ client }: ClientInfoBoxProps) {
    return (
        <div className="group border-primary/20 from-primary/5 hover:border-primary/40 relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br via-white to-indigo-50 shadow-lg transition-all duration-500 hover:shadow-2xl">
            {/* Decorative elements */}
            <div className="from-primary/10 pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br to-purple-200/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
            <div className="to-primary/10 pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-200/20 blur-2xl transition-transform duration-700 group-hover:scale-125" />

            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden">
                <div className="border-t-primary/10 group-hover:border-t-primary/20 absolute top-0 right-0 h-0 w-0 border-t-[80px] border-l-[80px] border-l-transparent transition-all duration-500" />
                <svg
                    className="text-primary/40 group-hover:text-primary absolute top-2 right-2 h-5 w-5 transition-all duration-500 group-hover:rotate-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </div>

            <div className="relative p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Logo with creative styling */}
                    {client.logo && (
                        <div className="flex-shrink-0">
                            <div className="group/logo relative">
                                {/* Glow effect */}
                                <div className="from-primary absolute -inset-1 rounded-2xl bg-gradient-to-r to-purple-600 opacity-20 blur-lg transition-opacity duration-500 group-hover/logo:opacity-40" />
                                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-white p-3 shadow-xl transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3">
                                    <Image
                                        src={client.logo}
                                        alt={`${client.name} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                {/* Decorative dots */}
                                <div className="absolute -right-2 -bottom-2 flex gap-1">
                                    <div className="bg-primary/60 h-2 w-2 rounded-full" />
                                    <div className="h-2 w-2 rounded-full bg-purple-500/60" />
                                    <div className="h-2 w-2 rounded-full bg-indigo-500/60" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                            <h2 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-2xl font-bold text-transparent">
                                {client.name}
                            </h2>
                            <span className="from-primary inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                                Client
                            </span>
                        </div>

                        {/* Description with decorative quote */}
                        {client.content && (
                            <div className="relative mb-5 pl-4">
                                <div className="from-primary/60 absolute top-0 left-0 h-full w-1 rounded-full bg-gradient-to-b via-purple-500/40 to-transparent" />
                                <p className="leading-relaxed text-gray-700">{client.content}</p>
                            </div>
                        )}

                        {/* Link to client page with creative button */}
                        <Link
                            href={`/clients/${client.slug}`}
                            className="group/link from-primary hover:from-primary/90 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r to-purple-600 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:to-purple-700 hover:shadow-xl"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            <span>Découvrir tous les projets</span>
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
