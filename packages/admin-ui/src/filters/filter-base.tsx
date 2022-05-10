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

import { Stack } from '../stack'
import * as style from './filter.style'

export function BaseFilter(props: BaseFilterProps) {
  const { state, children, appliedValuesLabel = '' } = props
  const { onClear, onChange, label, menu, combobox, baseId } = state

  const formatMessage = useMessageFormatter(messages.actions)

  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const popoverId = baseId ? `${baseId}-popover` : undefined
  const disclosureId = baseId ? `${baseId}-disclosure` : undefined

  // TODO investigate arikit buggy typing
  const comboboxListId = {
    id: baseId ? `${baseId}-combobox-list` : undefined,
  } as any

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  return (
    <>
      <FilterDisclosure state={menu} id={disclosureId}>
        {label}
        {appliedValuesLabel}
      </FilterDisclosure>

      <FilterPopover state={menu} id={popoverId}>
        <tag.span ref={optionsContainerRef} csx={style.scrollableContainer}>
          <Stack
            as={ComboboxList}
            state={combobox}
            space="$xl"
            {...comboboxListId}
          >
            {children}
          </Stack>
        </tag.span>

        <FilterPopoverFooter
          isContentScrollable={scrollHeight > containerHeight}
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
