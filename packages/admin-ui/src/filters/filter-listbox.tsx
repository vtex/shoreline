import React, { useEffect, useRef } from 'react'

import { ComboboxList } from 'ariakit/combobox'

import { tag, useSystem } from '..'

import * as style from './filter.style'
import { usePopoverContext } from './filter-popover-context'

export const FilterListbox = (props: FilterListboxProps) => {
  const { children, id } = props
  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const { cn } = useSystem()
  const {
    setIsScrollableLayout,
    state: { combobox },
  } = usePopoverContext()

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  useEffect(() => {
    setIsScrollableLayout(scrollHeight > containerHeight)
  }, [scrollHeight, containerHeight])

  const ariakitcomboboxState = { ...combobox, matches: [] }

  return (
    <tag.span ref={optionsContainerRef} csx={style.scrollableContainer}>
      <ComboboxList
        state={{ ...ariakitcomboboxState, visible: true }}
        id={id}
        className={cn(style.list)}
      >
        {children}
      </ComboboxList>
    </tag.span>
  )
}

interface FilterListboxProps {
  id?: string
  children: React.ReactNode
}
