import { ReactNode } from 'react'
import Form from 'react-bootstrap/Form'

interface HelpProps {
    type?: 'help' | 'invalid' | 'valid'
    children: ReactNode
}

export default function Help({ type, children }: HelpProps) {
    if (type === 'help') {
        return <Form.Text muted>{children}</Form.Text>
    }

    return (
        <Form.Control.Feedback type={type} className={'d-block'}>
            {children}
        </Form.Control.Feedback>
    )
}
