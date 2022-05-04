import {ChildrenPropTypes} from "../../props/types";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import styles from './Section.module.scss';

export default function Section({container, fluid, children, className, ... props}) {
  return (
    <section className={`${styles.section} ${className || ''}`.trim()} {... props}>
      {container && (<Container fluid={fluid}>{children}</Container> )}
      {!container && children}
    </section>
  )
}

Section.defaultProps = {
  container: true,
  fluid: false,
}

Section.propTypes = {
  className: PropTypes.string,
  container: PropTypes.bool.isRequired,
  fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl', 'xxl']),
  children: ChildrenPropTypes.isRequired
}
