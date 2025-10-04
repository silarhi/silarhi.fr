import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/lib'

import InputIcon from './input-icon'

interface BaseInputWidgetProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string | number
    isValid?: boolean
    isInvalid?: boolean
}

interface InputProps extends BaseInputWidgetProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
}

const BaseInputWidget = forwardRef<HTMLInputElement, BaseInputWidgetProps>(
    ({ value, isValid, isInvalid, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                defaultValue={value}
                className={cn(
                    'focus:ring-primary w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none',
                    { 'border-success focus:ring-success': isValid },
                    { 'border-error focus:ring-error': isInvalid },
                    className
                )}
                {...props}
            />
        )
    }
)

BaseInputWidget.displayName = 'BaseInputWidget'

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, isValid, isInvalid, iconPrepend, iconAppend, ...props }, ref) => {
        if (iconPrepend || iconAppend) {
            return (
                <InputIcon iconPrepend={iconPrepend} iconAppend={iconAppend}>
                    <BaseInputWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
                </InputIcon>
            )
        }

        return <BaseInputWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
    }
)

Input.displayName = 'Input'

export default Input
