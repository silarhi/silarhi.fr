import CallToActionButton from "components/CallToActionButton"

import styles from './index.module.scss'

export default function CallToAction() {
  return (
    <div className={"text-center py-5"}>
      <CallToActionButton size={"lg"} variant="primary" className={styles.callToAction}>
        Demander un devis
      </CallToActionButton>
    </div>
  )
}
