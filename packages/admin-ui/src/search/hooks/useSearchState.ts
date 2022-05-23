import type { ChangeEventHandler } from 'react'
import { useCallback } from 'react'
import { useDebouncedCache } from '@vtex/admin-ui-hooks'

const DEFAULT_TIMEOUT_MS = 250

export function useSearchState(
  params: UseSearchStateParams = {
    initialValue: '',
    timeout: DEFAULT_TIMEOUT_MS,
  }
): SearchFormState {
  const {
    initialValue = '',
    defaultValue = '',
    timeout = DEFAULT_TIMEOUT_MS,
  } = params

  const [value, debouncedValue, setValue] = useDebouncedCache({
    initialState: initialValue,
    timeoutMs: timeout,
  })

  const onClear = useCallback(() => {
    setValue(defaultValue)
  }, [setValue, defaultValue])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value)
    },
    []
  )

  const getInputProps = () => {
    return {
      value,
      onChange,
      onClear,
    }
  }

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
  /**
   * Search input value
   */
  value: string
  /**
   * Search input change handler event
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * On clear button is clicked event
   */
  onClear: () => void
}

export interface UseSearchStateParams {
  /**
   * Search initial value
   */
  initialValue?: string
  /**
   * Search default value. When clicking the clear button the value should be reseted to the default one
   * @default ''
   */
  defaultValue?: string
  /**
   * Debounced value timeout in milliseconds
   * @default 250
   */
  timeout?: number
  /**
   * Search input change handler event
   */
  onChange?: ChangeEventHandler
}

export interface SearchFormState {
  /**
   * Returns the search input props: value, onChange, onClear
   */
  getInputProps: () => GetInputPropsReturn
  /**
   * Debounced search input value
   */
  debouncedValue: string
  /**
   * Sets the value state
   */
  setValue: (value: string) => void
  /**
   * Search input value
   */
  value: string
  /**
   * On clear button is clicked event
   */
  onClear: () => void
  /**
   * Search input change handler event
   */
  onChange: ChangeEventHandler<HTMLInputElement>
}
