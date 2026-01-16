'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Moon, Sun, SunMoon } from '@/components/ui/icons'
import { cn } from '@/utils/lib'

interface ThemeToggleProps {
    className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()
    // Separate state for animation that updates after theme change
    const [displayTheme, setDisplayTheme] = useState<string | undefined>(undefined)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    // Update display theme after a short delay to allow animation
    useEffect(() => {
        if (mounted && resolvedTheme) {
            // Small delay to let next-themes re-enable transitions
            const timeout = setTimeout(() => {
                setDisplayTheme(resolvedTheme)
            }, 10)
            return () => clearTimeout(timeout)
        }
    }, [resolvedTheme, mounted])

    if (!mounted) {
        return (
            <button
                className={cn(
                    'cursor-pointer rounded-lg p-2 transition-colors duration-200',
                    'hover:bg-primary/10 dark:hover:bg-primary-light/10',
                    className
                )}
            >
                <SunMoon className="h-5 w-5" />
            </button>
        )
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    const isLight = displayTheme === 'light'

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'relative cursor-pointer rounded-lg p-2 transition-colors duration-200',
                'hover:bg-primary/10 dark:hover:bg-primary-light/10',
                className
            )}
            aria-label={resolvedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {/* Moon - visible in light mode */}
            <Moon
                className={cn('h-5 w-5 transition-all duration-300 ease-in-out', {
                    'scale-100 rotate-0 opacity-100': isLight,
                    'scale-0 -rotate-90 opacity-0': !isLight,
                })}
            />
            {/* Sun - visible in dark mode */}
            <Sun
                className={cn('absolute top-2 left-2 h-5 w-5 transition-all duration-300 ease-in-out', {
                    'scale-0 rotate-90 opacity-0': isLight,
                    'scale-100 rotate-0 opacity-100': !isLight,
                })}
            />
        </button>
    )
}
