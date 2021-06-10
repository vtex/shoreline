import { ReactNode, useState } from 'react'
import { usePersistentState } from './usePersistentState'

interface Params<C> {
  id: string
  value: C[]
  label?: ReactNode
  recordLabel?: ReactNode
  compare?: (a: C, b: C) => boolean
}

export function useCollection<C>(params: Params<C>) {
  const {
    id,
    value,
    label = null,
    recordLabel = null,
    compare = (a, b) => a === b,
  } = params

  const [record, setRecord] = usePersistentState<C[]>(
    [],
    `@vtex/admin-ui-combobox-${id}`
  )
  const [currentCollection, setCurrentCollection] = useState(record)
  const [currentLabel, setCurrentLabel] = useState(recordLabel)

  const onType = (inputValue?: string) => {
    if (inputValue && inputValue !== '') {
      setCurrentCollection(value)
      setCurrentLabel(label)
    } else {
      setCurrentCollection(record)
      setCurrentLabel(recordLabel)
    }
  }

  const onSelect = (selectedItem?: C | null) => {
    if (selectedItem) {
      if (!record.some((r) => compare(r, selectedItem))) {
        setRecord((rec) => [...rec, selectedItem])
      }
    }
  }

  return {
    onType,
    onSelect,
    currentCollection,
    currentLabel,
  }
}
