import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { ComboboxMultipleItem } from './combobox-multiple-item'
import { ComboboxPopoverBase } from './combobox-popover-base'
import type { ComboboxMultipleState } from '.'

const arias: any = {
  'aria-multiselectable': true,
}

export const ComboboxMultiplePopover = forwardRef(
  (props: ComboboxMultiplePopoverProps, ref: Ref<HTMLDivElement>) => {
    return (
      <ComboboxPopoverBase {...props} {...arias} ref={ref}>
        {props.state.matches.map((item) => {
          const value = props.state.getOptionValue(item)
          const rendered = props.state.renderOption(item)
          const { isSelected, onChange } = props.state

          return (
            <ComboboxMultipleItem
              item={item}
              key={value}
              value={value}
              isSelected={isSelected}
              onChange={onChange}
            >
              {rendered}
            </ComboboxMultipleItem>
          )
        })}
      </ComboboxPopoverBase>
    )
  }
)

interface ComboboxMultiplePopoverProps extends ComponentPropsWithoutRef<'div'> {
  state: ComboboxMultipleState<any>
  onRetry?: () => void
}
