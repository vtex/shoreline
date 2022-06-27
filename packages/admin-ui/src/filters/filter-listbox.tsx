import React, { useEffect, useRef } from 'react'

import { ComboboxList } from 'ariakit/combobox'

import { tag, useSystem } from '..'

import * as style from './filter.style'
import type { ComboboxState } from '../combobox'
import { usePopoverContext } from './filter-popover-context'

export const FilterListbox = <
  GenericComboboxState extends ComboboxState<any>
>(props: {
  state: GenericComboboxState
  id?: string
  children: React.ReactNode
}) => {
  const { state, children, id } = props
  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const { cn } = useSystem()
  const { setIsScrollableLayout } = usePopoverContext()

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  useEffect(() => {
    setIsScrollableLayout(scrollHeight > containerHeight)
  }, [scrollHeight, containerHeight])

  return (
    <tag.span ref={optionsContainerRef} csx={style.scrollableContainer}>
      <ComboboxList
        state={{ ...state, visible: true }}
        id={id}
        className={cn(style.list)}
      >
        {children}
      </ComboboxList>
    </tag.span>
  )
}
