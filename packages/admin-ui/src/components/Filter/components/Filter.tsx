import type { ReactNode } from 'react'
import React from 'react'

import { Button } from '../../Button'

import { VisuallyHidden } from '../../VisuallyHidden'
import type { UseMultipleFilterReturn } from './FilterCheckbox/useMultipleFilter'
import type { PopoverStateReturn } from './Popover'
import { PopoverFooter, Popover, PopoverDisclosure } from './Popover'
import { tag } from '@vtex/admin-ui-react'
import { IconCaretUp } from '@vtex/phosphor-icons'

export function Filter(props: FilterProps) {
  const { state, children } = props
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
            transition: 'transform 200ms ease',
            transform: `rotate(${popover.visible ? 180 : 0}deg)`,
          }}
        />
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
  state: UseMultipleFilterReturn<FilterItem>

  children?: ReactNode
}

export interface FilterItem {
  id: string | number
  label: string
  value: any
}
