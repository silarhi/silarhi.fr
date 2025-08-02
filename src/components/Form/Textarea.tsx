import { forwardRef, ReactNode } from 'react'
import { FormControlProps } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

import InputIcon from './InputIcon'

interface BaseWidgetProps extends FormControlProps {
    rows: HTMLTextAreaElement['rows']
    value?: string | number
    isValid?: boolean
    isInvalid?: boolean
}

interface TextareaProps extends BaseWidgetProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
}

const BaseWidget = forwardRef<HTMLTextAreaElement, BaseWidgetProps>(({ value, isValid, isInvalid, ...props }, ref) => {
    return (
        <Form.Control
            ref={ref}
            as={'textarea'}
            isValid={isValid}
            isInvalid={isInvalid}
            defaultValue={value}
            {...props}
        />
    )
})

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
