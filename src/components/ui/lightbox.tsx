'use client'

import { AnimatePresence, m } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useCallback, useEffect } from 'react'

import { XMark } from '@/components/ui/icons'

interface LightboxProps {
    src: string | StaticImageData
    alt: string
    isOpen: boolean
    onClose: () => void
}

export default function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-sm"
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
                    <m.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                        className="relative h-[80vh] w-[90vw] max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={src} alt={alt} fill className="rounded-lg object-contain" priority sizes="90vw" />
                    </m.div>

                    {/* Caption */}
                    {alt && (
                        <m.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/80"
                        >
                            {alt}
                        </m.p>
                    )}
                </m.div>
            )}
        </AnimatePresence>
    )
}
