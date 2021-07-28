import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'

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
    const persistedValue = window.localStorage.getItem(key)

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
