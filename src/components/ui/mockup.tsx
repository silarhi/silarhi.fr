'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { Expand } from '@/components/ui/icons'
import Lightbox from '@/components/ui/lightbox'

interface LaptopMockupProps {
    src: string | StaticImageData
    alt: string
    blurDataURL?: string
}

export function LaptopMockup({ src, alt, blurDataURL }: LaptopMockupProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    return (
        <>
            <div className="group relative md:cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <div className="relative mx-auto h-73.5 max-w-lg rounded-t-xl border-8 border-gray-800 bg-gray-800 dark:border-gray-800">
                    <div className="relative h-69.5 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                            className="h-69.5 w-full rounded-lg object-cover object-top"
                            placeholder={blurDataURL ? 'blur' : 'empty'}
                            blurDataURL={blurDataURL}
                        />
                    </div>
                </div>
                <div className="relative mx-auto h-5.25 max-w-149.25 rounded-t-sm rounded-b-xl bg-gray-900 dark:bg-gray-700">
                    <div className="absolute top-0 left-1/2 h-2 w-[96px] -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
                </div>
                {/* Hover overlay - only visible on md+ screens */}
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                    <div className="scale-0 transform rounded-full bg-white/90 p-3 shadow-lg transition-transform group-hover:scale-100">
                        <Expand className="h-6 w-6 text-gray-800" />
                    </div>
                </div>
            </div>

            <Lightbox
                src={src}
                blurDataURL={blurDataURL}
                alt={alt}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />
        </>
    )
}
