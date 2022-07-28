import { useState, useMemo } from 'react'
import type { ComboboxState } from '../combobox/combobox.state'
import type { AnyObject } from '@vtex/admin-ui-util'

export function useFilterStatus<T extends AnyObject>(props: ComboboxState<T>) {
  const { value, matches } = props

  const [status, setStatus] = useState<FilterStatus>()

  const reducedStatus = useMemo<FilterStatus>(() => {
    if (status) {
      return status
    }

    if (!matches.length && value !== '') {
      return 'not-found'
    }

    return 'ready'
  }, [status, matches, value])

  return {
    status: reducedStatus,
    setStatus,
  }
}

export type FilterStatus = 'error' | 'loading' | 'ready' | 'empty' | 'not-found'
