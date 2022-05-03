import type { ReactNode } from 'react'
import React, { useRef } from 'react'

import { Button } from '../button'
import { FilterPopoverFooter, FilterPopover } from './filter-popover'
import { FilterDisclosure } from './filter-disclosure'

import type { GenericFilterStateReturn } from './filter.state'
import { ComboboxList } from 'ariakit'

import { tag } from '@vtex/admin-ui-react'

import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function BaseFilter(props: BaseFilterProps) {
  const { state, children, appliedValuesLabel = '' } = props
  const { onClear, onChange, label, menu, combobox } = state

  const formatMessage = useMessageFormatter(messages.actions)

  const optionsContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <FilterDisclosure state={menu}>
        {label}
        {appliedValuesLabel}
      </FilterDisclosure>

      <FilterPopover state={menu}>
        <tag.span
          ref={optionsContainerRef}
          csx={{
            marginTop: '$m',
            padding: '$l',
            maxHeight: 312,
            overflowY: 'auto',
          }}
        >
          <tag.ul
            as={ComboboxList}
            state={combobox}
            csx={{
              display: 'flex',
              flexDirection: 'column',
              '> *:not(:last-child)': {
                marginBottom: '$xl',
              },
            }}
          >
            {children}
          </tag.ul>
        </tag.span>

        <FilterPopoverFooter
          isContentScrollable={
            (optionsContainerRef?.current?.scrollHeight ?? 0) >
            (optionsContainerRef?.current?.clientHeight ?? 0)
          }
        >
          <Button variant="tertiary" onClick={onClear}>
            {formatMessage('clear')}
          </Button>
          <Button onClick={onChange}>{formatMessage('apply')}</Button>
        </FilterPopoverFooter>
      </FilterPopover>
    </>
  )
}

export interface BaseFilterProps {
  state: GenericFilterStateReturn<any>
  children?: ReactNode
  appliedValuesLabel?: ReactNode
}
