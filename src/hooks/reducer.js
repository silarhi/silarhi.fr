import {useState} from "react"

export default function useForceReducer() {
  const [value, setValue] = useState(0)

  return {
    value,
    updateValue: () => setValue(value => value + 1),
    resetValue: () => setValue(value => 0)
  }
}
