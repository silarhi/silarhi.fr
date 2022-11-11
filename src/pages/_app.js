import '../../styles/app.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import DefaultLayout from "_layouts/DefaultLayout/DefaultLayout"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => (<DefaultLayout navbarFloatingClass={Component.navbarFloatingClass} navbarInitialClass={Component.navbarFloatingClass}>{page}</DefaultLayout>))

  return getLayout(<Component {...pageProps} />)
}
