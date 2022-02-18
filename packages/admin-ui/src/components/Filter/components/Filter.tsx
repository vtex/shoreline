import type { ReactNode } from 'react'
import React from 'react'

import { Button } from '../../Button'

import { VisuallyHidden } from '../../VisuallyHidden'
import type { UseFilterCheckboxReturn } from './FilterCheckbox/useFilterCheckbox'
import type { PopoverStateReturn } from './Popover'
import { PopoverFooter, Popover, PopoverDisclosure } from './Popover'

export function Filter(props: FilterProps) {
  const { state, children } = props
  const { onClear, onApply, popover, selectedValues, label, labelProps } = state

  const fullLabel = `${label}${
    selectedValues.length ? `: ${selectedValues}` : ''
  }`

  return (
    <>
      <VisuallyHidden>
        <div {...labelProps}>{label}</div>
      </VisuallyHidden>
      <Button as={PopoverDisclosure} state={popover} {...labelProps}>
        {fullLabel}
      </Button>
      <Popover state={popover} aria-label={label}>
        {children}

        <PopoverFooter>
          <Button size="small" variant="adaptative-dark" onClick={onClear}>
            Clear
          </Button>
          <Button size="small" onClick={onApply}>
            Apply
          </Button>
        </PopoverFooter>
      </Popover>
    </>
  )
}

export interface UseFilterStateReturn {
  popover: PopoverStateReturn
  onClear: () => void
  onApply: () => void
}

export interface FilterProps {
  state: UseFilterCheckboxReturn<FilterItem>

  children?: ReactNode
}

export interface FilterItem {
  id: string | number
  label: string
  value: any
}
