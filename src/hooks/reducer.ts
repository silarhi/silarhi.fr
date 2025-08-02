import { useState } from 'react'

interface UseForceReducerReturn {
    value: number
    updateValue: () => void
    resetValue: () => void
}

export default function useForceReducer(): UseForceReducerReturn {
    const [value, setValue] = useState<number>(0)

    return {
        value,
        updateValue: () => setValue((value) => value + 1),
        resetValue: () => setValue(() => 0),
    }
}
