import { useMemo, useState } from 'react'
import type { ComboboxStateProps } from 'ariakit/combobox'
import { useComboboxState as useAriakitComboboxState } from 'ariakit/combobox'
import { useDebounce } from '@vtex/admin-ui-hooks'

export function useComboboxState(props: Props = {}) {
  const { timeoutMs = 250, ...comboboxProps } = props

  const state = useAriakitComboboxState({ gutter: 4, ...comboboxProps })
  const [deferredValue] = useDebounce(state.value, timeoutMs)

  // data states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const status = useMemo<Status>(() => {
    if (loading) {
      return 'loading'
    }

    if (error) {
      return 'error'
    }

    const noMatches = !state.matches.length

    if (noMatches && deferredValue === '') {
      return 'empty-search'
    }

    if (noMatches) {
      return 'no-result'
    }

    return 'ready'
  }, [loading, error, state.matches, state.value])

  return {
    deferredValue,
    setError,
    setLoading,
    status,
    ...state,
  }
}

type Status = 'loading' | 'error' | 'empty-search' | 'no-result' | 'ready'

type Props = Pick<ComboboxStateProps, 'list'> & {
  timeoutMs?: number
}

export type ComboboxState = ReturnType<typeof useComboboxState>
