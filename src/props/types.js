import PropTypes from 'prop-types'

export const ChildrenPropTypes = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
