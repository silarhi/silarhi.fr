import Form from 'react-bootstrap/Form'
import { FormLabelOwnProps } from 'react-bootstrap/FormLabel'

interface LabelProps extends FormLabelOwnProps {
    label?: string
}

export default function Label({ label, htmlFor, children, ...props }: LabelProps) {
    return (
        <Form.Label htmlFor={htmlFor} {...props}>
            {label}
            {children}
        </Form.Label>
    )
}
