import React from 'react'
import {
    LuArrowLeft,
    LuArrowRight,
    LuCalendar,
    LuCheck,
    LuClock,
    LuCode,
    LuDownload,
    LuFileText,
    LuFilter,
    LuMail,
    LuMapPin,
    LuMoon,
    LuPhone,
    LuRepeat,
    LuSun,
    LuSunMoon,
    LuUser,
    LuX,
    LuZap,
} from 'react-icons/lu'

import { cn } from '@/utils/lib'

export const Download = LuDownload
export const Map = LuMapPin
export const Clock = LuClock
export const Phone = LuPhone
export const Person = LuUser
export const Envelope = LuMail
export const Check = LuCheck
export const XMark = LuX
export const FilterIcon = LuFilter
export const ArrowLeft = LuArrowLeft
export const ArrowRight = LuArrowRight
export const FileText = LuFileText
export const Calendar = LuCalendar
export const Repeat = LuRepeat
export const Code = LuCode
export const Zap = LuZap
export const Moon = LuMoon
export const SunMoon = LuSunMoon
export const Sun = LuSun

// Custom SVG icons
export function FaceSad(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
}

export function MenuToggle({ open, className, ...props }: React.SVGProps<SVGSVGElement> & { open: boolean }) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className} {...props}>
            {/* Top line - rotates to first diagonal of X */}
            <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                strokeLinecap="round"
                strokeWidth={2}
                className={cn('origin-[5px_10px] transition-transform duration-200 ease-in-out', {
                    'rotate-45': open,
                })}
            />
            {/* Middle line - fades out */}
            <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                strokeLinecap="round"
                strokeWidth={2}
                className={cn('transition-all duration-200 ease-in-out', {
                    'scale-x-0 opacity-0': open,
                })}
            />
            {/* Bottom line - rotates to second diagonal of X */}
            <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                strokeLinecap="round"
                strokeWidth={2}
                className={cn('origin-[5px_14px] transition-transform duration-200 ease-in-out', {
                    '-rotate-45': open,
                })}
            />
        </svg>
    )
}

export function Spinner(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    )
}

export function Search(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    )
}

export function XCircle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
            />
        </svg>
    )
}

export function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    )
}

export function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            />
        </svg>
    )
}
