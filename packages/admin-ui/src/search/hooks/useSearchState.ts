import type { ChangeEventHandler } from 'react'
import { useCallback } from 'react'
import { useDebouncedCache } from '@vtex/admin-ui-hooks'

const DEFAULT_TIMEOUT_MS = 250

export function useSearchState(
  params: UseSearchStateParams = {
    initialValue: '',
    timeoutMs: DEFAULT_TIMEOUT_MS,
  }
): SearchFormStateReturn {
  const {
    initialValue = '',
    defaultValue = '',
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = params

  const [value, debouncedValue, setValue] = useDebouncedCache({
    initialState: initialValue,
    timeoutMs,
  })

  const onClear = useCallback(() => {
    setValue(defaultValue)
  }, [value])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value)
    },
    []
  )

  const getInputProps = useCallback(() => {
    return {
      value,
      onChange,
      onClear,
    }
  }, [value, onChange])

  return {
    getInputProps,
    debouncedValue,
    setValue,
    value,
    onChange,
    onClear,
  }
}

export interface GetInputPropsReturn {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClear: () => void
}

export interface UseSearchStateParams {
  initialValue?: string
  defaultValue?: string
  timeoutMs?: number
  onChange?: ChangeEventHandler
}

export interface SearchFormStateReturn {
  getInputProps: () => GetInputPropsReturn
  debouncedValue: string
  setValue: (value: string) => void
  value: string
  onClear: () => void
  onChange: ChangeEventHandler<HTMLInputElement>
}
