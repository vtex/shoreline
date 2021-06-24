import {
  useCombobox,
  UseComboboxProps,
  UseComboboxReturnValue,
} from 'downshift'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { useInputValue } from './useInputValue'
import { usePersistentState } from './usePersistentState'

type DownshiftRestProps<C> = Omit<
  UseComboboxProps<C>,
  'items'
>

interface MatchParams {
  inputValue?: string
  itemString?: string
}

interface Params<C> extends DownshiftRestProps<C> {
  id: string,
  collection: C[]
  compare?: (a: C, b: C) => boolean
  match?: (params: MatchParams) => boolean
  render?: (item: C) => ReactNode
}

type CollectionType = 'storage' | 'search' | 'seed'

export interface ComboboxState<C> {
  combobox: UseComboboxReturnValue<C>
  collection: {
    items: C[]
    type: CollectionType
    setItems: Dispatch<SetStateAction<C[]>>
  }
}

export function unstableUseSearchBoxState<C>(
  params: Params<C>
): ComboboxState<C> {
  const {
    id,
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
    timeoutMs: 480
  })
  const [type, setType] = useState<CollectionType>('storage')
  const [items, setItems] = useState<any[]>([])
  const [lastSearches, setLastSearches] = usePersistentState<C[]>(
    [],
    `@vtex/admin-ui-searchbox-${id}`
  )

  const combobox = useCombobox({
    items: items,
    itemToString,
    onSelectedItemChange: (downshiftOnChangeCb) => {
      const { selectedItem } = downshiftOnChangeCb
      
      if (selectedItem) {
        if (!lastSearches.some((ls) => compare(ls, selectedItem))) {
          setLastSearches((ls) => [...ls, selectedItem])
        }
      }

      onSelectedItemChange?.(downshiftOnChangeCb)

      return selectedItem
    },
    onInputValueChange: (dowshiftInputCb) => {
      const { inputValue: downshiftInputValue } = dowshiftInputCb
      if (downshiftInputValue === undefined && typeof downshiftInputValue !== 'string') return

      if (downshiftInputValue === '') {
        if (lastSearches.length > 0) {
          setItems(lastSearches)
          setType('storage')
        }
      }
      
      setInputValue(downshiftInputValue)

      onInputValueChange?.(dowshiftInputCb)
    },
    ...downshiftRestProps,
  })

  useEffect(() => {
    if (inputValue === '') {
      if (lastSearches.length > 0) {
        setItems(lastSearches)
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
