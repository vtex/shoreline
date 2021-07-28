import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface Params {
  initialState: string
  timeoutMs: number
}

export function useInputValue(params: Params): [string, (v: string) => void] {
  const { initialState, timeoutMs } = params
  const [inputValue, setInputValue] = useState(initialState)
  const [deferedInputValue] = useDebounce(inputValue, timeoutMs)

  const setValue = useCallback((value: string) => {
    if (value === undefined && typeof value !== 'string') return

    if (value.includes('object')) setInputValue((prev) => prev)
    else setInputValue(value)
  }, [])

  return [deferedInputValue, setValue]
}
