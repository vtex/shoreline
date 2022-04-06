import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { ComboboxMultipleItem } from './combobox-multiple-item'
import { ComboboxPopoverBase } from './combobox-popover-base'
import type { ComboboxMultipleState } from '.'

const arias: any = {
  'aria-multiselectable': true,
}

export const ComboboxMultiplePopover = createComponent<
  typeof ComboboxPopoverBase,
  Props
>((props) => {
  return useElement(ComboboxPopoverBase, {
    ...props,
    ...arias,
    children: props.state.matches.map((item) => {
      const value = props.state.getOptionValue(item)
      const rendered = props.state.renderOption(item)

      return (
        <ComboboxMultipleItem
          checkbox={props.state.checkboxState}
          onItemSelect={(isSelected: boolean) => {
            if (isSelected) {
              // remove
              props.state.removeSelectedItem(item)
            } else {
              // insert
              props.state.addSelectedItem(item)
            }

            props.state.setSelectedItem(item)
          }}
          key={value}
          value={value}
        >
          {rendered}
        </ComboboxMultipleItem>
      )
    }),
  })
})

interface Props {
  state: ComboboxMultipleState<any>
}
