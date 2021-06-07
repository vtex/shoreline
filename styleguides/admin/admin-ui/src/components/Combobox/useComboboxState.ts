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

function defaultMatch(params: MatchParams) {
  const { inputValue, itemString } = params
  return String(itemString)
    .toLowerCase()
    .startsWith(String(inputValue).toLowerCase())
}

function defaultRender<C>(item: C) {
  return item
}

function defaultItemToString<C>(item?: C): string {
  return item ? String(item) : ''
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
