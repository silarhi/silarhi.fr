import cx from 'classnames'
import PropTypes from 'prop-types'
import { ChildrenPropTypes } from 'props/types'
import Container from 'react-bootstrap/Container'

import styles from './index.module.scss'

export default function Section({
    container = true,
    fluid = false,
    size = 'default',
    children,
    className,
    paddingX = true,
    paddingY = true,
    ...props
}) {
    return (
        <section
            className={cx({
                [styles.sectionWithPaddingX]: paddingX,
                [styles.sectionWithPaddingY]: paddingY,
                [styles.sectionXl]: size === 'xl',
                [className]: true,
            })}
            {...props}
        >
            {container && (
                <Container fluid={fluid} className={cx({ 'px-0': paddingX })}>
                    {children}
                </Container>
            )}
            {!container && children}
        </section>
    )
}

Section.propTypes = {
    size: PropTypes.oneOf(['default', 'xl']),
    className: PropTypes.string,
    paddingX: PropTypes.bool,
    paddingY: PropTypes.bool,
    fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl', 'xxl']),
    children: ChildrenPropTypes.isRequired,
}
