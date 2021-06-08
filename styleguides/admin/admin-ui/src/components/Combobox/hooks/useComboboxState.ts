import {
  useCombobox,
  UseComboboxProps,
  UseComboboxReturnValue,
} from 'downshift'
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import { usePersistentState } from './usePersistentState'

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
  }
}

interface RecentValuesParams<C> {
  id: string
  activeValue: C[]
}

function useRecentValues<C>(params: RecentValuesParams<C>) {
  const { id, activeValue } = params

  const [recentValues, setRecentValues] = usePersistentState<C[]>(
    [],
    `@vtex/admin-ui-combobox-${id}`
  )
  const [target, setTarget] = useState(recentValues)

  const onType = (inputValue?: string) => {
    if (inputValue && inputValue !== '') {
      setTarget(activeValue)
    } else {
      setTarget(recentValues)
    }
  }

  const onSelect = (selectedItem?: C | null) => {
    if (selectedItem) {
      setRecentValues((rv) => [...new Set([...rv, selectedItem])])
    }
  }

  return {
    onType,
    onSelect,
    target,
  }
}

export function useComboboxState<C>(params: Params<C>): ComboboxState<C> {
  const {
    id,
    match = defaultMatch,
    render = defaultRender,
    itemToString = defaultItemToString,
    collection,
    onSelectedItemChange,
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
  const { target, onSelect, onType } = useRecentValues({
    id,
    activeValue: value,
  })

  const combobox = useCombobox({
    items: target,
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
      value: target,
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
