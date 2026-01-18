'use client'

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface HashContextValue {
    hash: string
    setHash: (hash: string) => void
}

const HashContext = createContext<HashContextValue>({ hash: '', setHash: () => {} })

export function useHash() {
    return useContext(HashContext)
}

export function HashProvider({ children }: { children: ReactNode }) {
    const [hash, setHash] = useState('')

    useEffect(() => {
        const updateHash = () => setHash(window.location.hash)
        updateHash()

        window.addEventListener('hashchange', updateHash)
        window.addEventListener('popstate', updateHash)

        return () => {
            window.removeEventListener('hashchange', updateHash)
            window.removeEventListener('popstate', updateHash)
        }
    }, [])

    const value = useMemo(() => ({ hash, setHash }), [hash])

    return <HashContext.Provider value={value}>{children}</HashContext.Provider>
}
