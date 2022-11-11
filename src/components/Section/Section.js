import cx from "classnames"
import PropTypes from "prop-types"
import {ChildrenPropTypes} from "props/types"
import Container from "react-bootstrap/Container"

import styles from './Section.module.scss'

export default function Section({container, fluid, size, children, className, paddingX, paddingY,... props}) {
  return (
    <section className={cx({
        [styles.sectionWithPaddingX]: paddingX,
        [styles.sectionWithPaddingY]: paddingY,
        [styles.sectionXl]: size === 'xl',
        [className]: true
      })} {... props}>
      {container && (<Container fluid={fluid} className={cx({'px-0': paddingX})}>{children}</Container> )}
      {!container && children}
    </section>
  )
}

Section.defaultProps = {
  size: 'default',
  paddingX: true,
  paddingY: true,
  container: true,
  fluid: false,
}

Section.propTypes = {
  size: PropTypes.oneOf(['default', 'xl']),
  className: PropTypes.string,
  container: PropTypes.bool.isRequired,
  paddingX: PropTypes.bool,
  paddingY: PropTypes.bool,
  fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl', 'xxl']),
  children: ChildrenPropTypes.isRequired
}
