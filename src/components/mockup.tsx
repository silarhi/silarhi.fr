import Image, { StaticImageData } from 'next/image'

export function LaptopMockup({ src, alt }: { src: string | StaticImageData; alt: string }) {
    return (
        <>
            <div className="relative mx-auto h-[294px] max-w-[512px] rounded-t-xl border-[8px] border-gray-800 bg-gray-800 dark:border-gray-800">
                <div className="relative h-[278px] overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="h-[278px] w-full rounded-lg object-cover object-top"
                    />
                </div>
            </div>
            <div className="relative mx-auto h-[21px] max-w-[597px] rounded-t-sm rounded-b-xl bg-gray-900 dark:bg-gray-700">
                <div className="absolute top-0 left-1/2 h-[8px] w-[96px] -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
            </div>
        </>
    )
}
