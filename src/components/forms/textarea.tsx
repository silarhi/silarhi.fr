import { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils/lib'

import InputIcon from './input-icon'

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
        return (
            <textarea
                ref={ref}
                defaultValue={value}
                className={cn(
                    'focus:ring-primary w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none',
                    {
                        'border-success focus:ring-success': isValid,
                        'border-error focus:ring-error': isInvalid,
                        'border-gray-300': !isValid && !isInvalid,
                    },
                    className
                )}
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
