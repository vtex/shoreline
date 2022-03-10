import React, { forwardRef } from 'react'
import type { CheckboxState } from 'ariakit/checkbox'
import { Checkbox, CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from 'ariakit/combobox'
import { useSystem } from '@vtex/admin-ui-react'

import * as style from './combobox.style'

export type ComboboxMultipleItemProps = ComboboxItemProps & {
  checkbox: CheckboxState<string[]>
}

export const ComboboxMultipleItem = forwardRef<
  HTMLDivElement,
  ComboboxMultipleItemProps
>(({ value, checkbox, ...props }, ref) => {
  const { cn } = useSystem()

  return (
    <ComboboxItem
      ref={ref}
      // All selectable items must have the `aria-selected` attribute set to
      // `true` or `false`.
      aria-selected={!!value && checkbox?.value.includes(value)}
      className={cn(style.itemMultiple)}
      {...props}
    >
      {(itemProps) => {
        return (
          <Checkbox
            {...itemProps}
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
})
