import type { ReactNode } from 'react'
import React, { useRef } from 'react'

import { Button } from '../button'
import { FilterPopoverFooter, FilterPopover } from './filter-popover'

import type { GenericFilterStateReturn } from './filter/filter.state'
import { ComboboxList } from 'ariakit'

import { tag } from '@vtex/admin-ui-react'

import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

import { Stack } from '../stack'
import * as style from './filter.style'

export function BaseFilter(props: BaseFilterProps) {
  const { state, children } = props
  const { onClear, onChange, menu, combobox, baseId } = state

  const formatMessage = useMessageFormatter(messages.actions)

  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const popoverId = baseId ? `${baseId}-popover` : undefined

  const comboboxListId = { id: baseId ? `${baseId}-combobox-list` : undefined }

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  return (
    <>
      <FilterPopover state={menu} id={popoverId}>
        <tag.span ref={optionsContainerRef} csx={style.scrollableContainer}>
          <Stack
            as={ComboboxList as any}
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
}
