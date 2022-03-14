import React from 'react'
import type { CheckboxState } from 'ariakit/checkbox'
import { Checkbox, CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from 'ariakit/combobox'
import { useSystem } from '@vtex/admin-ui-react'

import * as style from './combobox.style'

export type ComboboxMultipleItemProps = ComboboxItemProps & {
  checkbox: CheckboxState<string[]>
}

export function ComboboxMultipleItem({
  value,
  checkbox,
  ...props
}: ComboboxMultipleItemProps) {
  const { cn } = useSystem()

  const styleProps: any = {
    className: cn(style.itemMultiple),
  }

  return (
    <ComboboxItem
      // All selectable items must have the `aria-selected` attribute set to
      // `true` or `false`.
      aria-selected={!!value && checkbox?.value.includes(value)}
      {...props}
    >
      {(itemProps) => {
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
            {value}
            <CheckboxCheck />
          </Checkbox>
        )
      }}
    </ComboboxItem>
  )
}
