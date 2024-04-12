import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { SelectItemCheck as ItemCheck } from '@ariakit/react'
import { IconCheck } from '@vtex/shoreline-icons'

/**
 * Check indicator of the SelectItem
 */
export const SelectItemCheck = forwardRef<
  HTMLSpanElement,
  SelectItemCheckProps
>(function SelectItemCheck(props, ref) {
  const { children, ...domProps } = props

  return (
    <ItemCheck data-sl-select-item-check ref={ref} {...domProps}>
      {children || <IconCheck />}
    </ItemCheck>
  )
})

export interface SelectItemCheckOptions {
  /**
   * Indicator icon override
   */
  children?: ReactNode
}

export type SelectItemCheckProps = SelectItemCheckOptions &
  ComponentPropsWithoutRef<'span'>
