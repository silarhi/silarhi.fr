import Form from 'react-bootstrap/Form'

export default function Help({ type, children }) {
    if (type === 'help') {
        return <Form.Text muted>{children}</Form.Text>
    }

    return (
        <Form.Control.Feedback type={type} className={'d-block'}>
            {children}
        </Form.Control.Feedback>
    )
}
