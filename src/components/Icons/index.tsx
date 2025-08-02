import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons/faCloudBolt'
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFileContract } from '@fortawesome/free-solid-svg-icons/faFileContract'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils/lib'

type BaseIconProps = FontAwesomeIconProps

type IconProps = Omit<BaseIconProps, 'icon'>

export function BaseIcon({ className, ...props }: BaseIconProps) {
    return <FontAwesomeIcon className={cn('icon', className)} {...props} />
}

export const Calendar = (props: IconProps) => <BaseIcon icon={faCalendar} {...props} />
export const Download = (props: IconProps) => <BaseIcon icon={faDownload} {...props} />
export const Map = (props: IconProps) => <BaseIcon icon={faMapMarkerAlt} {...props} />
export const Clock = (props: IconProps) => <BaseIcon icon={faClock} {...props} />
export const Phone = (props: IconProps) => <BaseIcon icon={faPhone} {...props} />
export const Person = (props: IconProps) => <BaseIcon icon={faUser} {...props} />
export const User = (props: IconProps) => <BaseIcon icon={faUser} {...props} />
export const Enveloppe = (props: IconProps) => <BaseIcon icon={faEnvelope} {...props} />
export const Check = (props: IconProps) => <BaseIcon icon={faCheck} {...props} />
export const CloudBolt = (props: IconProps) => <BaseIcon icon={faCloudBolt} {...props} />
export const Code = (props: IconProps) => <BaseIcon icon={faCode} {...props} />
export const LightBulb = (props: IconProps) => <BaseIcon icon={faLightbulb} {...props} />
export const FileContract = (props: IconProps) => <BaseIcon icon={faFileContract} {...props} />
export const XMark = (props: IconProps) => <BaseIcon icon={faXmark} {...props} />
