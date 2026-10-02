'use client'

import Image, { type StaticImageData } from 'next/image'
import { type AnimationEvent, useCallback, useEffect, useState } from 'react'

import { XMark } from '@/components/ui/icons'

interface LightboxProps {
    src: string | StaticImageData
    blurDataURL: string | undefined
    alt: string
    isOpen: boolean
    onClose: () => void
}

export default function Lightbox({ src, blurDataURL, alt, isOpen, onClose }: LightboxProps) {
    // Stays mounted with data-state="closed" while the fade-out plays, then unmounts on its animationend
    const [isMounted, setIsMounted] = useState(isOpen)
    if (isOpen && !isMounted) {
        setIsMounted(true)
    }

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        },
        [onClose]
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, handleKeyDown])

    const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
        if (!isOpen && e.target === e.currentTarget) {
            setIsMounted(false)
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <div
            data-state={isOpen ? 'open' : 'closed'}
            onAnimationEnd={handleAnimationEnd}
            className="animate-lightbox-in data-[state=closed]:animate-lightbox-out fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-sm data-[state=closed]:pointer-events-none"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Image: ${alt}`}
        >
            {/* Close button */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
                className="absolute top-4 right-4 z-10 cursor-pointer rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/20"
                aria-label="Fermer"
            >
                <XMark className="h-6 w-6" />
            </button>

            {/* Image container */}
            <div
                className="animate-lightbox-zoom-in relative h-[80vh] w-[90vw] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="rounded-lg object-contain"
                    priority
                    sizes="90vw"
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                />
            </div>

            {/* Caption */}
            {alt && (
                <p className="animate-lightbox-caption-in absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">
                    {alt}
                </p>
            )}
        </div>
    )
}
