import { ReactNode } from 'react'

import styles from './index.module.scss'

interface IconWrapperProps {
    children: ReactNode
}

export default function IconWrapper({ children }: IconWrapperProps) {
    return (
        <div className={styles.iconWrapper}>
            <div className={styles.icon}>{children}</div>
        </div>
    )
}
