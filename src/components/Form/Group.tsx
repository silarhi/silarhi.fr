import { ReactNode } from 'react'
import Form from 'react-bootstrap/Form'

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
        <Form.Group className={groupClassName}>
            {label && <Label label={label} htmlFor={id} className={cn({ invalid: !valid })}></Label>}
            {children}
        </Form.Group>
    )
}
