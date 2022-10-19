import CallToActionButton from "components/CallToActionButton/CallToActionButton"

import styles from './CallToAction.module.scss'

export default function CallToAction() {
  return (
    <div className={"text-center py-5"}>
      <CallToActionButton size={"lg"} variant="sub-primary" className={styles.callToAction}>
        Demander un devis
      </CallToActionButton>
    </div>
  )
}
