import type { UseComboboxProps, UseComboboxReturnValue } from 'downshift'
import { useCombobox } from 'downshift'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import { useInputValue } from './useInputValue'
import { usePersistentState } from './usePersistentState'

type DownshiftRestProps<C> = Omit<UseComboboxProps<C>, 'items'>

interface MatchParams<T> {
  inputValue?: string
  itemString?: string
  item?: T
}

interface Params<T> extends DownshiftRestProps<T> {
  id: string
  collection: T[]
  historySize?: number
  compare?: (a: T, b: T) => boolean
  match?: (params: MatchParams<T>) => boolean
  render?: (item: T) => ReactNode
}

type CollectionType = 'storage' | 'search' | 'seed'

export interface ComboboxState<T> {
  combobox: UseComboboxReturnValue<T>
  collection: {
    items: T[]
    type: CollectionType
    setItems: Dispatch<SetStateAction<T[]>>
  }
}

export function unstableUseSearchBoxState<C>(
  params: Params<C>
): ComboboxState<C> {
  const {
    id,
    historySize = 10,
    match = defaultMatch,
    render = defaultRender,
    itemToString = defaultItemToString,
    collection,
    onSelectedItemChange,
    compare = (a, b) => a === b,
    onInputValueChange,
    ...downshiftRestProps
  } = params

  const [inputValue, setInputValue] = useInputValue({
    initialState: '',
    timeoutMs: 480,
  })

  const [type, setType] = useState<CollectionType>('storage')
  const [items, setItems] = useState<any[]>([])
  const [history, setHistory] = usePersistentState<C[]>(
    [],
    `@vtex/admin-ui-searchbox-${id}`
  )

  const combobox = useCombobox({
    items,
    itemToString,
    onSelectedItemChange: (downshiftOnChangeCb) => {
      const { selectedItem } = downshiftOnChangeCb

      if (selectedItem) {
        if (!history.some((ls) => compare(ls, selectedItem))) {
          setHistory((ls) => {
            const draft = [...ls]

            if (history.length >= historySize) {
              draft.pop()
            }

            return [selectedItem, ...draft]
          })
        }
      }

      onSelectedItemChange?.(downshiftOnChangeCb)

      return selectedItem
    },
    onInputValueChange: (downshiftInputCb) => {
      const { inputValue: downshiftInputValue } = downshiftInputCb

      if (
        downshiftInputValue === undefined &&
        typeof downshiftInputValue !== 'string'
      )
        return

      if (downshiftInputValue === '') {
        if (history.length > 0) {
          setItems(history)
          setType('storage')
        }
      }

      setInputValue(downshiftInputValue)

      onInputValueChange?.(downshiftInputCb)
    },
    ...downshiftRestProps,
  })

  useEffect(() => {
    if (inputValue === '') {
      if (history.length > 0) {
        setItems(history)
        setType('storage')
      } else {
        setItems([])
        setType('seed')
      }
    } else {
      setType('search')
      setItems(
        collection.filter((item: any) =>
          match({
            inputValue,
            itemString: itemToString(item),
            item,
          })
        )
      )
    }
  }, [inputValue])

  return {
    combobox,
    collection: {
      items,
      type,
      setItems,
    },
  }
}

/**
 * default match function
 * @param params
 * @returns whether the itemString starts with the input value
 */
function defaultMatch<T>(params: MatchParams<T>) {
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
