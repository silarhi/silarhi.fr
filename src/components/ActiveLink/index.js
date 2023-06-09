import cx from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ActiveLink({ children, className, activeClassName, ...props }) {
    const pathname = usePathname()

    const [linkClassName, setLinkClassName] = useState(className || '')

    useEffect(() => {
        if (pathname) {
            // Dynamic route will be matched via props.as Static route will be matched via props.href
            const linkPathname = new URL(props.as || props.href, location.href).href

            // Using URL().pathname to get rid of query and hash
            const activePathname = new URL(pathname, location.href).href

            const newClassName = cx({ [className]: true, [activeClassName]: linkPathname === activePathname })

            if (newClassName !== linkClassName) {
                setLinkClassName(newClassName)
            }
        }
    }, [pathname, props.as, props.href, className, activeClassName, setLinkClassName, linkClassName])

    return (
        <Link className={linkClassName} {...props}>
            {children}
        </Link>
    )
}
