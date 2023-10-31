import React, { forwardRef } from 'react'
import { SelectItemCheck } from '@ariakit/react'
import { IconCheck } from '@vtex/shoreline-icons'

export const SelectOptionCheck = forwardRef<
  HTMLSpanElement,
  SelectOptionCheckProps
>(function SelectOptionCheck(props, ref) {
  return (
    <SelectItemCheck data-sl-select-option-check ref={ref} {...props}>
      <IconCheck />
    </SelectItemCheck>
  )
})

export interface SelectOptionCheckProps {
  className?: string
}
