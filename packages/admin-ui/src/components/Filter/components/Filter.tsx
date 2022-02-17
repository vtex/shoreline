import type { ReactNode } from 'react'
import React from 'react'

import { Button } from '../../Button'
import { Set } from '../../Set'
import type { UseFilterCheckboxReturn } from './FilterCheckbox/useFilterCheckbox'
import type { PopoverStateReturn } from './Popover'
import { PopoverFooter, Popover, PopoverDisclosure } from './Popover'

export function Filter(props: FilterProps) {
  const { state, label, children } = props
  const { onClear, onApply, popover, selectedValues } = state

  const fullLabel = `${label}${
    selectedValues.length ? `: ${selectedValues}` : ''
  }`

  return (
    <Set orientation="vertical">
      <Button as={PopoverDisclosure} state={popover}>
        {fullLabel}
      </Button>
      <Popover state={popover}>
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
    </Set>
  )
}

export interface UseFilterStateReturn {
  popover: PopoverStateReturn
  onClear: () => void
  onApply: () => void
}

export interface FilterProps {
  state: UseFilterCheckboxReturn
  label: string
  children?: ReactNode
}

export interface FilterItem {
  id: string
  label: string
  value: string | number
}
