import type { ChangeEvent } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Search } from '../search'
import { usePopoverContext } from './filter-popover-context'
import * as style from './filter.style'

export const FilterSearchbox = createComponent<
  typeof Search,
  ComboboxFieldProps
>((props) => {
  const { id, ...restProps } = props
  const {
    state: { combobox, status },
  } = usePopoverContext()

  const { setValue, value } = combobox

  return useElement(Search, {
    ...restProps,
    value: value as string,
    onClear: () => {
      setValue('')
    },
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    baseStyle: style.searchbox({ omitBottomMargin: status === 'error' }),
  })
})

interface ComboboxFieldProps {
  id?: string
  loading?: boolean
}
