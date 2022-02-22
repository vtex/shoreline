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
  const { onClear, onChange, popover, selectedValues, label, labelProps } =
    state

  const selectedItemsLabel =
    selectedValues.length > 1
      ? `${selectedValues[0]}, +${selectedValues.length - 1}`
      : selectedValues[0]

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
        {!!selectedValues.length && (
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
          <Button size="small" onClick={onChange}>
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
