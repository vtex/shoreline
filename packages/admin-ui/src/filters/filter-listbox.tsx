import React, { useEffect, useRef } from 'react'

import { ComboboxList } from 'ariakit/combobox'

import { tag, useSystem } from '..'

import * as style from './filter.style'
import type { ComboboxState } from '../combobox'
import { usePopoverContext } from './filter-popover-context'
import type { FilterOption } from './filter/filter.state'

export const FilterListbox = <T extends ComboboxState<FilterOption<any>>>(
  props: FilterListboxProps<T>
) => {
  const { state: propState, children, id } = props
  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const { cn } = useSystem()
  const { setIsScrollableLayout, state } = usePopoverContext()

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  useEffect(() => {
    setIsScrollableLayout(scrollHeight > containerHeight)
  }, [scrollHeight, containerHeight])

  const comboboxState = propState?.combobox ?? state.combobox
  const ariakitComboboxState = { ...comboboxState, matches: [] }

  return (
    <tag.span ref={optionsContainerRef} csx={style.scrollableContainer}>
      <ComboboxList
        state={{ ...ariakitComboboxState, visible: true }}
        id={id}
        className={cn(style.list)}
      >
        {children}
      </ComboboxList>
    </tag.span>
  )
}

interface FilterListboxProps<T extends ComboboxState<any>> {
  state?: { combobox: T }
  id?: string
  children: React.ReactNode
}
