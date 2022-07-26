import type { ChangeEvent } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Search } from '../search'
import { usePopoverContext } from './filter-popover-context'

export const FilterSearchbox = createComponent<
  typeof Search,
  ComboboxFieldProps
>((props) => {
  const { id, ...restProps } = props
  const {
    state: { combobox },
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
    baseStyle: { margin: '$l', order: -1 },
  })
})

interface ComboboxFieldProps {
  id?: string
  loading?: boolean
}
