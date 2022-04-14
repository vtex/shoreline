import React from 'react'

import { CheckboxCheck } from 'ariakit/checkbox'
import type { ComboboxItemProps } from 'ariakit/combobox'
import { ComboboxItem } from 'ariakit/combobox'
import { useSystem } from '@vtex/admin-ui-react'

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

  const { cn } = useSystem()

  // TODO: Check the reason that we get a type error if the className is passed directly to Checkbox
  const styleProps: any = {
    className: cn(style.itemMultiple),
  }

  // TODO: Check the type error that forbids onClick param
  const onChange: any = {
    onClick: () => onChangeCb?.(item),
  }

  const checked = isSelected(item)

  return (
    <ComboboxItem
      // All selectable items must have the `aria-selected` attribute
      aria-selected={checked}
      {...styleProps}
      {...onChange}
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
