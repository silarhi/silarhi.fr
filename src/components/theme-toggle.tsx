'use client'

import { Moon, Sun } from '@/components/ui/icons'
import { useTheme } from '@/providers/theme-provider'
import { cn } from '@/utils/lib'

interface ThemeToggleProps {
    className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'rounded-lg p-2 transition-colors duration-200',
                'hover:bg-primary/10 dark:hover:bg-primary-light/10',
                className
            )}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
    )
}
