import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons/faCloudBolt'
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone"
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser"
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

export function BaseIcon({icon, className, ...props}) {
  return (
    <FontAwesomeIcon icon={icon} className={`${className || ''} icon`.trim()} {...props} />
  )
}

BaseIcon.propTypes = {
  icon: PropTypes.object
}

export const Phone = ({ ...props }) => <BaseIcon icon={faPhone} {...props} />
export const Person = ({ ...props }) => <BaseIcon icon={faUser} {...props} />
export const Enveloppe = ({ ...props }) => <BaseIcon icon={faEnvelope} {...props} />
export const Check = ({ ...props }) => <BaseIcon icon={faCheck} {...props} />
export const CloudBolt = ({ ...props }) => <BaseIcon icon={faCloudBolt} {...props} />
export const Code = ({ ...props }) => <BaseIcon icon={faCode} {...props} />
export const LightBulb = ({ ...props }) => <BaseIcon icon={faLightbulb} {...props} />
export const MagnifyingGlass = ({ ...props }) => <BaseIcon icon={faMagnifyingGlass} {...props} />
export const XMark = ({ ...props }) => <BaseIcon icon={faXmark} {...props} />
