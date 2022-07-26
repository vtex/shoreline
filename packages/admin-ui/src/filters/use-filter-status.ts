import { useState, useMemo } from 'react'

import type { ComboboxState } from '../combobox/combobox.state'

import type { AnyObject } from '@vtex/admin-ui-util'
import type { FilterStatus } from './filter/filter.state'

export function useFilterStatus<T extends AnyObject>(props: ComboboxState<T>) {
  const { status: comboboxStatus, setStatus: setComboboxStatus } = props

  const [status, setStatus] = useState<FilterStatus>('ready')

  const reducedStatus = useMemo<FilterStatus>(() => {
    if (status) {
      return status
    }

    if (comboboxStatus === 'not-found' || comboboxStatus === 'error') {
      return comboboxStatus
    }

    return 'ready'
  }, [comboboxStatus, status])

  const setStatusB = (newStatus: FilterStatus) => {
    setStatus(newStatus)

    if (newStatus === 'not-found' || newStatus === 'error') {
      setComboboxStatus(newStatus)

      return
    }

    setComboboxStatus('ready')
  }

  return { status: reducedStatus, setStatus: setStatusB }
}
