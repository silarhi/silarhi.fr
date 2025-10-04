import { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils/lib'

import InputIcon from './InputIcon'

interface BaseWidgetProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    rows: HTMLTextAreaElement['rows']
    value?: string | number
    isValid?: boolean
    isInvalid?: boolean
}

interface TextareaProps extends BaseWidgetProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
}

const BaseWidget = forwardRef<HTMLTextAreaElement, BaseWidgetProps>(
    ({ value, isValid, isInvalid, className, ...props }, ref) => {
        const baseClasses = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2'
        const validClasses = isValid ? 'border-green-500 focus:ring-green-500' : ''
        const invalidClasses = isInvalid ? 'border-red-500 focus:ring-red-500' : ''
        const defaultClasses = !isValid && !isInvalid ? 'border-gray-300 focus:ring-primary' : ''

        return (
            <textarea
                ref={ref}
                defaultValue={value}
                className={cn(baseClasses, validClasses, invalidClasses, defaultClasses, className)}
                {...props}
            />
        )
    }
)

BaseWidget.displayName = 'BaseWidget'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ value, isValid, isInvalid, iconPrepend, iconAppend, ...props }, ref) => {
        if (iconPrepend || iconAppend) {
            return (
                <InputIcon iconPrepend={iconPrepend} iconAppend={iconAppend}>
                    <BaseWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
                </InputIcon>
            )
        }

        return <BaseWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
    }
)

Textarea.displayName = 'Textarea'

export default Textarea
