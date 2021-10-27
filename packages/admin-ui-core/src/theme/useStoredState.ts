import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { isBrowser } from '@vtex/admin-ui-util'

export function useStoredState<T>(
  defaultValue: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) return defaultValue

    const persistedValue = window.localStorage?.getItem(key) ?? null

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue
  })

  useEffect(() => {
    if (isBrowser) {
      window?.localStorage?.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return useMemo(() => [value, setValue], [value, setValue])
}
