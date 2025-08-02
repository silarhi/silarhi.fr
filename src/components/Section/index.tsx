'use client'

import Container from 'react-bootstrap/Container'

import { cn } from '@/utils/lib'

import styles from './index.module.scss'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean
    fluid?: boolean
    size?: 'default' | 'xl'
    paddingX?: boolean
    paddingY?: boolean
}

export default function Section({
    container = true,
    fluid = false,
    size = 'default',
    children,
    className,
    paddingX = true,
    paddingY = true,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(className, {
                [styles.sectionWithPaddingX]: paddingX,
                [styles.sectionWithPaddingY]: paddingY,
                [styles.sectionXl]: size === 'xl',
            })}
            {...props}
        >
            <>
                {container && (
                    <Container fluid={fluid} className={cn({ 'px-0': paddingX })}>
                        {children}
                    </Container>
                )}
                {!container && children}
            </>
        </section>
    )
}
