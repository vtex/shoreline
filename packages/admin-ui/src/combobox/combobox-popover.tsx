import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { ComboboxPopoverBase } from './combobox-popover-base'
import { ComboboxItem } from './combobox-item'
import type { ComboboxState } from '.'

export const ComboboxPopover = createComponent<
  typeof ComboboxPopoverBase,
  { state: ComboboxState<any> }
>((props) =>
  useElement(ComboboxPopoverBase, {
    ...props,
    children: props.state.matches.map((item) => {
      const value = props.state.getOptionValue(item)
      const rendered = props.state.renderOption(item)

      return (
        <ComboboxItem
          key={value}
          value={value}
          onClick={() => {
            props.state.setSelectedItem(item)
          }}
        >
          {rendered}
        </ComboboxItem>
      )
    }),
  })
)
