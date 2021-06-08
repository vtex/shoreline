import { useState, useEffect, Dispatch, SetStateAction } from 'react'

/**
 * Use local storage to persist a state
 * @param defaultValue
 * @param key
 * @returns
 */
export function usePersistentState<T>(
  defaultValue: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key)
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
