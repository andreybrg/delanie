import { useState } from "react"

const useToggleMode = (initialValue) => {
    const [ value, setValue] = useState(initialValue)

    const toggleValue = (newValue=null) => {
        setValue(prev => newValue ? newValue : !prev)
    }

    return [ value, toggleValue ]
}

export { useToggleMode }