import Image from 'next/image'
import { ComponentProps } from 'react'

import { cn } from '@/utils/lib'

interface MDXImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
    src: string
    alt: string
    width?: number
    height?: number
    caption?: string
}

export function MDXImage({ src, alt = '', width = 800, height = 600, caption, className, ...props }: MDXImageProps) {
    let imageSrc = src
    // Handle external images
    if (!imageSrc.startsWith('/')) {
        imageSrc = `/${imageSrc}`
    }

    return (
        <figure className="my-4 d-block">
            <Image
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                className={cn(className, `img-fluid d-block rounded`)}
                {...props}
            />
            {caption && <figcaption className="text-center text-muted mt-2 small">{caption}</figcaption>}
        </figure>
    )
}
