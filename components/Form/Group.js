import cx from 'classnames'
import PropTypes from "prop-types"
import Form from 'react-bootstrap/Form'

import Label from "./Label"

export default function Group({label, groupClassName, id, valid, children}) {
  return (
    <Form.Group className={groupClassName}>
      {label && (<Label label={label} htmlFor={id} className={cx({'invalid': !valid})}></Label>)}
      {children}
    </Form.Group>
  )
}

Group.defaultProps = {
  groupClassName: 'mb-4',
  valid: true
}

Group.propTypes = {
  label: PropTypes.string,
  valid: PropTypes.bool,
  groupClassName: PropTypes.string,
  id: PropTypes.string,
}
