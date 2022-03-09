import type { ReactNode } from 'react'
import React from 'react'
import { IconCaretUp } from '@vtex/phosphor-icons'

import { Button } from '../components/Button'
import { FilterPopoverFooter, FilterPopover } from './filter-popover'
import { FilterDisclosure } from './filter-disclosure'
import type { FilterItem, UseFilterStateReturn } from './filter.state'
import { tag, VisuallyHidden } from '..'

export function Filter(props: FilterProps) {
  const { state, children, appliedValuesLabel } = props
  const { onClear, onChange, popover, label, labelProps, ref, listBoxProps } =
    state

  return (
    <>
      <VisuallyHidden>
        <div {...labelProps}>{label}</div>
      </VisuallyHidden>
      <FilterDisclosure state={popover} labelProps={labelProps}>
        {label}
        {appliedValuesLabel}
        <IconCaretUp
          size="small"
          csx={{
            transform: `rotate(${popover.visible ? 0 : 180}deg)`,
            marginLeft: '$s',
          }}
        />
      </FilterDisclosure>
      <FilterPopover state={popover} aria-label={label}>
        <tag.div
          as="ul"
          ref={ref}
          csx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '$l',
            marginTop: '$m',
            maxHeight: 312,
            overflowY: 'auto',
            '> *:not(:last-child)': {
              marginBottom: '$xl',
            },
          }}
          {...listBoxProps}
        >
          {children}
        </tag.div>
        <FilterPopoverFooter
          isContentScrollable={
            ref?.current?.scrollHeight > ref?.current?.clientHeight
          }
        >
          <Button size="small" variant="tertiary" onClick={onClear}>
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
  appliedValuesLabel?: ReactNode
}
