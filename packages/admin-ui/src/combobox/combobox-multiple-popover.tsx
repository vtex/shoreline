import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { ComboboxMultipleItem } from './combobox-multiple-item'
import { ComboboxPopoverBase } from './combobox-popover-base'

export const ComboboxMultiplePopover = createComponent<
  typeof ComboboxPopoverBase
>((props) => {
  return useElement(ComboboxPopoverBase, {
    ...props,
    'aria-multiselectable': true,
    children: props.state.matches.map((value: string) => (
      <ComboboxMultipleItem
        checkbox={{
          value: (props as any).state.selected,
          setValue: (props as any).state.setSelected,
        }}
        key={value}
        value={value}
      />
    )),
  })
})
