'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { Expand } from '@/components/ui/icons'
import Lightbox from '@/components/ui/lightbox'

// Shimmer placeholder for blur effect on dynamic images
const shimmerPlaceholder =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjI3OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjNmNGY2Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+'

export function LaptopMockup({ src, alt }: { src: string | StaticImageData; alt: string }) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    return (
        <>
            <div className="group relative md:cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <div className="relative mx-auto h-[294px] max-w-[512px] rounded-t-xl border-[8px] border-gray-800 bg-gray-800 dark:border-gray-800">
                    <div className="relative h-[278px] overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                            className="h-[278px] w-full rounded-lg object-cover object-top"
                            placeholder="blur"
                            blurDataURL={typeof src === 'string' ? shimmerPlaceholder : undefined}
                        />
                    </div>
                </div>
                <div className="relative mx-auto h-[21px] max-w-[597px] rounded-t-sm rounded-b-xl bg-gray-900 dark:bg-gray-700">
                    <div className="absolute top-0 left-1/2 h-[8px] w-[96px] -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
                </div>
                {/* Hover overlay - only visible on md+ screens */}
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                    <div className="scale-0 transform rounded-full bg-white/90 p-3 shadow-lg transition-transform group-hover:scale-100">
                        <Expand className="h-6 w-6 text-gray-800" />
                    </div>
                </div>
            </div>

            <Lightbox src={src} alt={alt} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
        </>
    )
}
