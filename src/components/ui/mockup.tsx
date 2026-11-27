'use client'

import Image, { type StaticImageData } from 'next/image'
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
            {/* A button, so the zoom is reachable with the keyboard; spans because a button only takes phrasing content */}
            <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Agrandir la capture : ${alt}`}
                className="group focus-visible:outline-primary relative block w-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4"
                onClick={() => setIsLightboxOpen(true)}
            >
                <span className="relative mx-auto block h-73.5 max-w-lg rounded-t-xl border-8 border-gray-800 bg-gray-800 dark:border-gray-800">
                    <span className="relative block h-69.5 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            // Screen is capped by max-w-lg minus borders (496px); below 560px it spans the viewport minus paddings
                            sizes="(max-width: 560px) calc(100vw - 4rem), 496px"
                            className="h-69.5 w-full rounded-lg object-cover object-top"
                            placeholder={blurDataURL ? 'blur' : 'empty'}
                            blurDataURL={blurDataURL}
                        />
                    </span>
                </span>
                <span className="relative mx-auto block h-5.25 max-w-149.25 rounded-t-sm rounded-b-xl bg-gray-900 dark:bg-gray-700">
                    <span className="absolute top-0 left-1/2 block h-2 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800" />
                </span>
                {/* Zoom hint on hover or keyboard focus - only on md+ screens */}
                <span className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                    <span className="scale-0 transform rounded-full bg-white/90 p-3 shadow-lg transition-transform group-hover:scale-100 group-focus-visible:scale-100">
                        <Expand className="h-6 w-6 text-gray-800" aria-hidden="true" />
                    </span>
                </span>
            </button>

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
