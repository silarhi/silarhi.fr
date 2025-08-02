import { forwardRef, ReactNode } from 'react'
import { FormControlProps } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

import InputIcon from './InputIcon'

interface BaseWidgetProps extends FormControlProps {
    value?: string | number
    isValid?: boolean
    isInvalid?: boolean
}

interface InputProps extends BaseWidgetProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
}

const BaseWidget = forwardRef<HTMLInputElement, BaseWidgetProps>(({ value, isValid, isInvalid, ...props }, ref) => {
    return <Form.Control ref={ref} isValid={isValid} isInvalid={isInvalid} defaultValue={value} {...props} />
})

BaseWidget.displayName = 'BaseWidget'

const Input = forwardRef<HTMLInputElement, InputProps>(
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

Input.displayName = 'Input'

export default Input
