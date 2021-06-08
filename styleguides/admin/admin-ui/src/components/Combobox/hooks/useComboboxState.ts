import {
  useCombobox,
  UseComboboxProps,
  UseComboboxReturnValue,
} from 'downshift'
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'

type DownshiftRestProps<C> = Omit<
  UseComboboxProps<C>,
  'items' | 'itemToString' | 'onInputValueChange'
>

interface MatchParams {
  inputValue?: string
  itemString?: string
}

interface Params<C> extends DownshiftRestProps<C> {
  collection: C[]
  match?: (params: MatchParams) => boolean
  render?: (item: C) => ReactNode
  itemToString?: (item: C | null) => string
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
  }
}

export function useComboboxState<C>(params: Params<C>): ComboboxState<C> {
  const {
    match = defaultMatch,
    render = defaultRender,
    itemToString = defaultItemToString,
    collection,
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

  const combobox = useCombobox({
    items: value,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
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
      value,
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
