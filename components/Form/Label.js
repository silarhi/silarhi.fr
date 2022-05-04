import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";

export default function Label({label, htmlFor, children, ...props}) {
  return (
    <Form.Label htmlFor={htmlFor} {...props}>
      {label}
      {children}
    </Form.Label>
  )
}

Label.propTypes = {
  label: PropTypes.string
}
