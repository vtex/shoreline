import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export function useCheckboxObjectState<T>(
  props: CheckboxObjectStateProps<T>
): CheckboxObjectStateReturn<T> {
  const { compare = (a, b) => a === b, defaultValue = [] } = props

  const [value, setValue] = useState(defaultValue)

  const toggle = (item: T) => {
    if (isSelected(item)) {
      unselect(item)
    } else {
      select(item)
    }
  }

  const isSelected = (candidate: T) =>
    !!value.some((item) => compare(item, candidate))

  const select = (item: T) => setValue((curr) => [...curr, item])

  const unselect = (item: T) =>
    setValue((curr) => curr.filter((i) => !compare(i, item)))

  return {
    toggle,
    select,
    unselect,
    isSelected,
    value,
    setValue,
  }
}

interface CheckboxObjectStateReturn<T> {
  toggle: (item: T) => void
  select: (item: T) => void
  unselect: (item: T) => void
  isSelected: (item: T) => boolean
  value: T[]
  setValue: Dispatch<SetStateAction<T[]>>
}

interface CheckboxObjectStateProps<T> {
  defaultValue?: T[]
  referenceList?: T[]
  compare?: (a: T, b: T) => boolean
}
