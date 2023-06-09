import { forwardRef } from 'react'
import Form from 'react-bootstrap/Form'

import InputIcon from './InputIcon'

const BaseWidget = forwardRef(({ value, isValid, isInvalid, ...props }, ref) => {
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

BaseWidget.propTypes = {}
BaseWidget.displayName = 'BaseWidget'

const Textarea = forwardRef(({ value, isValid, isInvalid, iconPrepend, iconAppend, ...props }, ref) => {
    if (iconPrepend || iconAppend) {
        return (
            <InputIcon iconPrepend={iconPrepend} iconAppend={iconAppend}>
                <BaseWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
            </InputIcon>
        )
    }

    return <BaseWidget ref={ref} isValid={isValid} isInvalid={isInvalid} value={value} {...props} />
})

Textarea.propTypes = {}
Textarea.displayName = 'Textarea'

export default Textarea
