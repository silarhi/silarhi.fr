import cx from "classnames"
import PropTypes from "prop-types"
import Container from "react-bootstrap/Container"

import {ChildrenPropTypes} from "../../props/types"
import styles from './Section.module.scss'

export default function Section({container, fluid, size, children, className, ... props}) {
  return (
    <section className={cx({[styles.section]: true, [styles.sectionXl]: size === 'xl', [className]: true})} {... props}>
      {container && (<Container fluid={fluid}>{children}</Container> )}
      {!container && children}
    </section>
  )
}

Section.defaultProps = {
  size: 'default',
  container: true,
  fluid: false,
}

Section.propTypes = {
  size: PropTypes.oneOf(['default', 'xl']),
  className: PropTypes.string,
  container: PropTypes.bool.isRequired,
  fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl', 'xxl']),
  children: ChildrenPropTypes.isRequired
}
