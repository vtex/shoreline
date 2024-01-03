import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { SelectItemCheck as ItemCheck } from '@ariakit/react'
import { IconCheck } from '@vtex/shoreline-icons'

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

export interface SelectItemCheckProps {
  className?: string
  children?: ReactNode
}
