import React from 'react'
import type { CheckboxState } from 'ariakit/checkbox'
import { Checkbox, CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from 'ariakit/combobox'
import { useSystem } from '@vtex/admin-ui-react'

import * as style from './combobox.style'

export function ComboboxMultipleItem(props: ComboboxMultipleItemProps) {
  const { children, checkbox, value, onItemSelect, ...restProps } = props

  const { cn } = useSystem()

  // TODO: Check the reason that we get a type error if the className is passed directly to Checkbox
  const styleProps: any = {
    className: cn(style.itemMultiple),
  }

  // TODO: Check the type error that forbids onClick param
  const onClick: any = { onClick: () => onItemSelect(isSelected) }

  const isSelected = !!value && checkbox?.value.includes(value)

  return (
    <ComboboxItem
      // All selectable items must have the `aria-selected` attribute set to
      // `true` or `false`.
      aria-selected={isSelected}
      {...onClick}
      {...restProps}
    >
      {(itemProps: React.HTMLAttributes<any> & React.RefAttributes<any>) => {
        return (
          <Checkbox
            {...itemProps}
            {...styleProps}
            // Disable `checked` and `aria-checked` attributes so they don't
            // conflict with the `aria-selected` attribute.
            aria-checked={undefined}
            checked={undefined}
            as="div"
            state={checkbox}
            value={value}
          >
            {children}
            <CheckboxCheck />
          </Checkbox>
        )
      }}
    </ComboboxItem>
  )
}

export type ComboboxMultipleItemProps = ComboboxItemProps & {
  onItemSelect: (isSelected: boolean) => void
  checkbox: CheckboxState<string[]>
}
