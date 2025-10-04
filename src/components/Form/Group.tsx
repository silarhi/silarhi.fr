import { ReactNode } from 'react'

import { cn } from '@/utils/lib'

import Label from './Label'

interface GroupProps {
    label?: string
    groupClassName?: string
    id?: string
    valid?: boolean
    children: ReactNode
}

export default function Group({ label, groupClassName = 'mb-4', id, valid = true, children }: GroupProps) {
    return (
        <div className={groupClassName}>
            {label && <Label label={label} htmlFor={id} className={cn({ 'text-red-600': !valid })}></Label>}
            {children}
        </div>
    )
}
