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
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

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
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'cursor-pointer rounded-lg p-2 transition-colors duration-200',
                'hover:bg-primary/10 dark:hover:bg-primary-light/10',
                className
            )}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
    )
}
