import type { ReactNode } from 'react'
import React from 'react'
import { IconCaretUp } from '@vtex/phosphor-icons'

import { Button } from '../components/Button'
import { FilterPopoverFooter, FilterPopover } from './filter-popover'
import { FilterDisclosure } from './filter-disclosure'
import type { UseFilterStateReturn } from './filter.state'
import { VisuallyHidden } from '../components/VisuallyHidden'
import { tag } from '@vtex/admin-ui-react'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function Filter(props: FilterProps) {
  const { state, children, appliedValuesLabel } = props
  const { onClear, onChange, popover, label, labelProps, ref, listBoxProps } =
    state

  const formatMessage = useMessageFormatter(messages.actions)

  return (
    <>
      <VisuallyHidden>
        <div {...labelProps}>{label}</div>
      </VisuallyHidden>
      <FilterDisclosure state={popover} {...labelProps}>
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
        <tag.ul
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
        </tag.ul>
        <FilterPopoverFooter
          isContentScrollable={
            ref?.current?.scrollHeight > ref?.current?.clientHeight
          }
        >
          <Button size="small" variant="tertiary" onClick={onClear}>
            {formatMessage('clear')}
          </Button>
          <Button size="small" onClick={onChange}>
            {formatMessage('apply')}
          </Button>
        </FilterPopoverFooter>
      </FilterPopover>
    </>
  )
}

export interface FilterProps {
  state: UseFilterStateReturn
  children?: ReactNode
  appliedValuesLabel?: ReactNode
}
