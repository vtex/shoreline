import React from 'react'

import { CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from './combobox-item'

import * as style from './combobox.style'
import type { AnyObject } from '..'

export function ComboboxMultipleItem(props: ComboboxMultipleItemProps) {
  const {
    children,
    onChange: onChangeCb,
    item,
    isSelected,
    ...restProps
  } = props

  const checked = isSelected(item)

  return (
    <ComboboxItem
      // All selectable items must have the `aria-selected` attribute
      aria-selected={checked}
      style={style.itemMultiple}
      onClick={() => onChangeCb?.(item)}
      {...restProps}
    >
      {children}
      <CheckboxCheck checked={checked} />
    </ComboboxItem>
  )
}

export type ComboboxMultipleItemProps = ComboboxItemProps & {
  item: AnyObject
  onChange: (item: AnyObject) => void
  isSelected: (item: AnyObject) => boolean
}
