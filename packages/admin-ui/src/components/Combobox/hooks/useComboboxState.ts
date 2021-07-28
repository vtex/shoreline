import type { UseComboboxProps, UseComboboxReturnValue } from 'downshift'
import { useCombobox } from 'downshift'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useMemo, useState } from 'react'

import { useCollection } from './useCollection'

type DownshiftRestProps<C> = Omit<
  UseComboboxProps<C>,
  'items' | 'onInputValueChange'
>

interface MatchParams {
  inputValue?: string
  itemString?: string
}

interface Params<C> extends DownshiftRestProps<C> {
  id: string
  collection: C[]
  label?: ReactNode
  recordLabel?: ReactNode
  compare?: (a: C, b: C) => boolean
  match?: (params: MatchParams) => boolean
  render?: (item: C) => ReactNode
}

export interface ComboboxState<C> {
  source: {
    collection: C[]
    render: (item: C) => ReactNode
  }
  combobox: UseComboboxReturnValue<C>
  collection: {
    value: C[]
    setValue: Dispatch<SetStateAction<C[]>>
    label: ReactNode
  }
}

export function unstableUseComboboxState<C>(
  params: Params<C>
): ComboboxState<C> {
  const {
    id,
    match = defaultMatch,
    render = defaultRender,
    itemToString = defaultItemToString,
    collection,
    onSelectedItemChange,
    label,
    recordLabel,
    compare,
    ...downshiftRestProps
  } = params

  const source = useMemo(
    () => ({
      collection,
      render,
    }),
    [render, collection]
  )

  const [value, setValue] = useState(source.collection)
  const { currentCollection, onSelect, currentLabel, onType } = useCollection({
    id,
    value,
    label,
    recordLabel,
    compare,
  })

  const combobox = useCombobox({
    items: currentCollection,
    itemToString,
    onSelectedItemChange: (onChangeProps) => {
      const { selectedItem } = onChangeProps

      onSelect(selectedItem)
      onSelectedItemChange?.(onChangeProps)
    },
    onInputValueChange: ({ inputValue }) => {
      onType(inputValue)
      setValue(
        source.collection.filter((item: any) =>
          match({
            inputValue,
            itemString: itemToString(item),
          })
        )
      )
    },
    ...downshiftRestProps,
  })

  return {
    source,
    combobox,
    collection: {
      value: currentCollection,
      label: currentLabel,
      setValue,
    },
  }
}

/**
 * default match function
 * @param params
 * @returns wheather the itemString starts with the input value
 */
function defaultMatch(params: MatchParams) {
  const { inputValue, itemString } = params

  return String(itemString)
    .toLowerCase()
    .startsWith(String(inputValue).toLowerCase())
}

/**
 * default render function
 * @param item
 * @returns item identity
 */
function defaultRender<C>(item: C) {
  return item
}

/**
 * default itemToString function
 * @param item
 * @returns string representation of a generic item
 */
function defaultItemToString<C>(item?: C): string {
  return item ? String(item) : ''
}
