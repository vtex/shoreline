import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import { CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from 'ariakit/combobox'

import { itemMultipleTheme } from './combobox.css'
import type { AnyObject } from '@vtex/admin-ui-util'
import { cx } from '@vtex/admin-ui-core'

export const ComboboxMultipleItem = forwardRef(
  (props: ComboboxMultipleItemProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      onChange: onChangeCb,
      item,
      isSelected,
      className = '',
      ...restProps
    } = props

    const checked = isSelected(item)

    return (
      <ComboboxItem
        // All selectable items must have the `aria-selected` attribute
        aria-selected={checked}
        className={cx(itemMultipleTheme, className)}
        onClick={() => onChangeCb?.(item)}
        ref={ref}
        {...restProps}
      >
        {children}
        <CheckboxCheck checked={checked} />
      </ComboboxItem>
    )
  }
)

export type ComboboxMultipleItemProps = ComboboxItemProps & {
  item: AnyObject
  onChange: (item: AnyObject) => void
  isSelected: (item: AnyObject) => boolean
}
