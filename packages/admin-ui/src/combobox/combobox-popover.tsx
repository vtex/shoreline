import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { ComboboxPopoverBase } from './combobox-popover-base'
// import { ComboboxItem } from './combobox-item'
import { ComboboxItem } from 'ariakit/combobox'
import type { ComboboxState } from '.'

import { itemTheme } from './combobox.css'

export const ComboboxPopover = forwardRef(
  (props: ComboboxPopoverProps, ref: Ref<HTMLDivElement>) => {
    return (
      <ComboboxPopoverBase ref={ref} {...props}>
        {props.state.matches.map((item) => {
          const value = props.state.getOptionValue(item)
          const rendered = props.state.renderOption(item)

          return (
            <ComboboxItem
              key={value}
              value={value}
              onClick={() => {
                props.state.setSelectedItem(item)
              }}
              className={itemTheme}
            >
              {rendered}
            </ComboboxItem>
          )
        })}
      </ComboboxPopoverBase>
    )
  }
)

interface ComboboxPopoverProps extends ComponentPropsWithoutRef<'div'> {
  state: ComboboxState<any>
  onRetry?: () => void
}
