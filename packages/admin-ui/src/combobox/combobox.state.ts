import type { Dispatch, SetStateAction, ReactNode } from 'react'

import { useEffect, useMemo, useState } from 'react'
import type {
  ComboboxStateProps as AriakitComboboxStateProps,
  ComboboxState as AriakitComboboxState,
} from 'ariakit/combobox'
import { useComboboxState as useAriakitComboboxState } from 'ariakit/combobox'
import { useDebounce } from '@vtex/admin-ui-hooks'

// TODO: allow dev to customize the matches func
const matchesSearch = (itemValue: string, inputValue: string) => {
  return itemValue.indexOf(inputValue) > -1
}

export function useComboboxState<T>(
  props: ComboboxStateProps<T> = {}
): ComboboxState<T> {
  const {
    timeoutMs = 250,
    list,
    getOptionValue = (item: T) =>
      typeof item === 'string' ? item : JSON.stringify(item),
    renderOption = (item: T) => item,
    ...comboboxProps
  } = props

  const state = useAriakitComboboxState({ gutter: 4, ...comboboxProps })
  const [deferredValue] = useDebounce(state.value, timeoutMs)

  // replacing ariakits matches for a custom one of any type
  const [matches, setMatches] = useState<T[]>(list || [])
  const [selectedItem, setSelectedItem] = useState<T>()

  // data states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // filters matches when input changes
  useEffect(() => {
    if (!list) return

    const sanitizedValue = state.value.toLocaleLowerCase()

    if (sanitizedValue === '') {
      setMatches(list)
    } else {
      setMatches(
        list.filter((item) =>
          matchesSearch(
            getOptionValue(item).toLocaleLowerCase(),
            sanitizedValue
          )
        )
      )
    }
  }, [state.value])

  const status = useMemo<Status>(() => {
    if (loading) {
      return 'loading'
    }

    if (error) {
      return 'error'
    }

    const noMatches = !matches.length

    if (noMatches && deferredValue === '') {
      return 'empty-search'
    }

    if (noMatches) {
      return 'no-result'
    }

    return 'ready'
  }, [loading, error, matches, state.value])

  return {
    ...state,
    deferredValue,
    setError,
    setLoading,
    status,
    getOptionValue,
    renderOption,
    setSelectedItem,
    selectedItem,
    setMatches,
    matches,
  }
}

type Status = 'loading' | 'error' | 'empty-search' | 'no-result' | 'ready'

export type ComboboxStateProps<T> = Pick<
  AriakitComboboxStateProps,
  'virtualFocus'
> & {
  /** Initial list of values that will be filtered on search, should be set unless the input will be controlled */
  list?: T[]
  /** Function for transforming item shape into a string value, no need to use it on string[] lists */
  getOptionValue?: (item: T) => string
  /** Function for transforming item shape into renderable node, no need to use it on string[] lists */
  renderOption?: (item: T) => ReactNode
  /** Debounce interval */
  timeoutMs?: number
}

export type ComboboxState<T> = Omit<AriakitComboboxState, 'matches'> & {
  /** Debounced value. */
  deferredValue: string
  /** Sets component state to error */
  setError: Dispatch<SetStateAction<boolean>>
  /** Sets component state to loading */
  setLoading: Dispatch<SetStateAction<boolean>>
  /** Component status */
  status: Status
  /** Function that gets text value from the items in matches or list */
  getOptionValue: (item: T) => string
  /** Function that render items from matches or list */
  renderOption: (item: T) => ReactNode
  /** Array of options that matched with the input value */
  matches: T[]
  /** Setter for array of options that matched with the input value */
  setMatches: (arg: T[]) => void
  /** Full value of current selected item */
  selectedItem: T | undefined
  /** Setter for current selected item */
  setSelectedItem: (arg?: T) => void
}
