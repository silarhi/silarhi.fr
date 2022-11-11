import cx from "classnames"
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {Children, useEffect, useState} from 'react'

export default function ActiveLink({children, className, activeClassName, ...props}) {
  const {asPath, isReady} = useRouter()

  const [linkClassName, setLinkClassName] = useState(className || '')

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as Static route will be matched via props.href
      const linkPathname = new URL(props.as || props.href, location.href).href

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).href

      const newClassName = cx({[className]: true, [activeClassName]: linkPathname === activePathname})

      if (newClassName !== linkClassName) {
        setLinkClassName(newClassName)
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    className,
    activeClassName,
    setLinkClassName,
    linkClassName,
  ])

  return (
    <Link className={linkClassName} {...props}>
      {children}
    </Link>
  )
}
