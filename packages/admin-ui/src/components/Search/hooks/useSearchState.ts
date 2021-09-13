import type { FormEvent } from 'react'
import { useState, useMemo, useCallback } from 'react'
import { useDebouncedCache } from '@vtex/admin-ui-hooks'

const DEFAULT_TIMEOUT_MS = 250

export function useSearchState(
  params: UseSearchStateParams = {
    initialValue: '',
    timeoutMs: DEFAULT_TIMEOUT_MS,
  }
): SearchFormState {
  const {
    initialValue = '',
    defaultValue = '',
    initiallyLoading = false,
    onSubmit: baseSubmit,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = params

  const [value, debouncedValue, setValue] = useDebouncedCache({
    initialState: initialValue,
    timeoutMs,
  })

  const [loading, setLoading] = useState(initiallyLoading)

  const showClear = useMemo(() => value.toString().length > 0, [value])

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    baseSubmit?.()
  }, [])

  const clear = useCallback(() => {
    setValue(defaultValue)
  }, [value])

  return {
    value,
    debouncedValue,
    setValue,
    loading,
    setLoading,
    showClear,
    onSubmit,
    clear,
  }
}

export interface UseSearchStateParams {
  initialValue?: string
  defaultValue?: string
  initiallyLoading?: boolean
  onSubmit?: () => void
  timeoutMs?: number
}

export interface SearchFormState {
  value: string
  debouncedValue: string
  setValue: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  showClear: boolean
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  clear: () => void
}
