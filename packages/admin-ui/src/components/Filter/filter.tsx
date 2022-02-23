import type { ReactNode } from 'react'
import React from 'react'

import { Button } from '../Button'

import { VisuallyHidden } from '../VisuallyHidden'
import type { FilterItem, UseFilterStateReturn } from './useFilterState'

import { PopoverDisclosure } from 'reakit/Popover'
import { FilterPopoverFooter, FilterPopover } from './popover'

import { IconCaretUp } from '@vtex/phosphor-icons'
import { Set } from '../Set'

// import {
//   Picker,
//   PickerDisclosure,
//   PickerPopover,
//   usePickerState,
// } from '../../picker'

export function Filter(props: FilterProps) {
  const { state, children, selectedValuesLabel } = props
  const {
    onClear,
    onChange,
    popover,

    label,
    labelProps,
    ref,
    listBoxProps,
  } = state

  // const pickerState = usePickerState()

  return (
    <>
      <VisuallyHidden>
        <div {...labelProps}>{label}</div>
      </VisuallyHidden>
      <Button
        as={PopoverDisclosure}
        state={popover}
        csx={{
          bg: '$action.neutral.secondary',
          color: '$secondary',
          ':hover': {
            bg: '$action.neutral.secondaryHover',
            color: '$secondary',
          },
          ':active': {
            bg: '$action.neutral.secondaryPressed',
            color: '$secondary',
          },
        }}
        {...labelProps}
      >
        {label}
        {selectedValuesLabel}
        <IconCaretUp
          csx={{
            transform: `rotate(${popover.visible ? 180 : 0}deg)`,
          }}
        />
      </Button>
      <FilterPopover state={popover} aria-label={label}>
        <Set
          as="ul"
          spacing={5}
          orientation="vertical"
          ref={ref}
          csx={{ margin: '$l', paddingY: '$m' }}
          {...listBoxProps}
        >
          {children}
        </Set>
        <FilterPopoverFooter>
          <Button size="small" variant="adaptative-dark" onClick={onClear}>
            Clear
          </Button>
          <Button size="small" onClick={onChange}>
            Apply
          </Button>
        </FilterPopoverFooter>
      </FilterPopover>
    </>
  )
}

export interface FilterProps {
  state: UseFilterStateReturn<FilterItem>
  children?: ReactNode
  selectedValuesLabel?: any
}
