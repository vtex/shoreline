import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
import { isBrowser } from '@vtex/admin-ui-util'

/**
 * Use local storage to persist a state
 * @param defaultValue - value if the key is not found within localstorage
 * @param key - localstorage key
 * @example
 * const [state, setState] = usePersistentState('')
 */
export function usePersistentState<T>(
  defaultValue: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) return defaultValue

    const persistedValue = window.localStorage?.getItem(key) ?? null

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue
  })

  useEffect(() => {
    window?.localStorage?.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
