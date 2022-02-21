import type { ReactNode } from 'react'
import React from 'react'

import { Button } from '../Button'

import { VisuallyHidden } from '../VisuallyHidden'
import type {
  FilterItem,
  UseMultipleFilterReturn,
} from './useMultipleFilterState'
import { PopoverDisclosure } from 'reakit/Popover'
import { PopoverFooter, Popover } from './popover'
import { tag } from '@vtex/admin-ui-react'
import { IconCaretUp } from '@vtex/phosphor-icons'
import { MultipleSelectContent } from './multiple-select-content'

export function Filter(props: FilterProps) {
  const { state } = props
  const { onClear, onApply, popover, selectedValues, label, labelProps } = state

  const selectedItemsLabel =
    selectedValues.length &&
    `${selectedValues[0]}${
      selectedValues.length > 1 ? `, +${selectedValues.length - 1}` : ''
    }`

  return (
    <>
      <VisuallyHidden>
        <div {...labelProps}>{label}</div>
      </VisuallyHidden>
      <Button
        as={PopoverDisclosure}
        state={popover}
        csx={{
          bg: '$secondary',
          color: '$secondary',
          ':hover': {
            // correct color \/
            // bg: colors.gray10,
            bg: '$secondary',
            color: '$secondary',
          },
          ':active': {
            bg: '$disabled',
            color: '$secondary',
          },
        }}
        {...labelProps}
      >
        {label}
        {!!selectedItemsLabel && (
          <>
            :
            <tag.span csx={{ color: '$primary', marginLeft: '$s' }}>
              {selectedItemsLabel}
            </tag.span>
          </>
        )}
        <IconCaretUp
          csx={{
            transform: `rotate(${popover.visible ? 180 : 0}deg)`,
          }}
        />
      </Button>
      <Popover state={popover} aria-label={label}>
        <MultipleSelectContent state={state} />
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

export interface FilterProps {
  state: UseMultipleFilterReturn<FilterItem>
  children?: ReactNode
}
