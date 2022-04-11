import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export function useCheckboxObjectState<T>(
  props: CheckboxObjectStateProps<T>
): CheckboxObjectStateReturn<T> {
  const { getValue, defaultValue = [] } = props

  const [selectedItems, setSelectedItems] = useState(defaultValue)

  const onChange = (item: T) => {
    if (isSelected(item)) {
      onRemove(item)
    } else {
      onAdd(item)
    }
  }

  const isSelected = (item: T) =>
    !!selectedItems.find((i) => getValue(i) === getValue(item))

  const onAdd = (item: T) => setSelectedItems((curr) => [...curr, item])

  const onRemove = (item: T) =>
    setSelectedItems((curr) =>
      curr.filter((i) => getValue(i) !== getValue(item))
    )

  return {
    onChange,
    onAdd,
    onRemove,
    isSelected,
    value: selectedItems,
    setValue: setSelectedItems,
  }
}

interface CheckboxObjectStateReturn<T> {
  onChange: (item: T) => void
  onAdd: (item: T) => void
  onRemove: (item: T) => void
  isSelected: (item: T) => boolean
  value: T[]
  setValue: Dispatch<SetStateAction<T[]>>
}

interface CheckboxObjectStateProps<T> {
  defaultValue?: T[]
  referenceList?: T[]
  getValue: (item: T) => string
}
