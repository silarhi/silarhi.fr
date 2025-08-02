import { ReactNode } from 'react'

interface InputIconProps {
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
    children: ReactNode
}

export default function InputIcon({ iconPrepend, iconAppend, children }: InputIconProps) {
    return (
        <div className="input-icon">
            {iconPrepend && <div className="input-icon-addon">{iconPrepend}</div>}
            {children}
            {iconAppend && <div className="input-icon-addon">{iconAppend}</div>}
        </div>
    )
}
