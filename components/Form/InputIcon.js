import PropTypes from "prop-types";

export default function InputIcon({iconPrepend, iconAppend, children}) {
  return (
    <div className="input-icon">
      {iconPrepend && <div className="input-icon-addon">{iconPrepend}</div> }
      {children}
      {iconAppend && <div className="input-icon-addon">{iconAppend}</div> }
    </div>
  )
}

InputIcon.propTypes = {
  iconPrepend: PropTypes.element,
  iconAppend: PropTypes.element,
}
