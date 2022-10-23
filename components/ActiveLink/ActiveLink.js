import cx from "classnames"
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {Children, useEffect, useState} from 'react'

export default function ActiveLink({children, activeClassName, ...props}) {
  const {asPath, isReady} = useRouter()

  const child = Children.only(children)
  const childClassName = child.props.className || ''
  const [className, setClassName] = useState(childClassName)

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as Static route will be matched via props.href
      const linkPathname = new URL(props.as || props.href, location.href).href

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).href

      const newClassName = cx({[childClassName]: true, [activeClassName]: linkPathname === activePathname})

      if (newClassName !== className) {
        setClassName(newClassName)
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ])

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}
