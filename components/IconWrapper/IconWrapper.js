import styles from './IconWrapper.module.scss'

export default function IconWrapper({children}) {
  return (
    <div className={styles.iconWrapper}>
      <div className={styles.icon}>
        {children}
      </div>
    </div>
  )
}
