import { ReactNode } from 'react'

import Help from '@/components/forms/help'
import { cn } from '@/utils/lib'

import Label from './label'

export interface GroupProps {
    label?: ReactNode
    groupClassName?: string
    id?: string
    isValid?: boolean
    isInvalid?: boolean
    error?: ReactNode
    children: ReactNode
}

export default function Group({ label, groupClassName = 'mb-4', id, error, children, isInvalid, isValid }: GroupProps) {
    return (
        <div className={groupClassName}>
            {label && (
                <Label
                    htmlFor={id}
                    className={cn('transition-colors duration-200', {
                        'text-error': isInvalid,
                        'text-success': isValid,
                    })}
                >
                    {label}
                </Label>
            )}
            <div className="flex flex-col gap-1">
                {children}
                {error && <Help type="invalid">{error}</Help>}
            </div>
        </div>
    )
}
