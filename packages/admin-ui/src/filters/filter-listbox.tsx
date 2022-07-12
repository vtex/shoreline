import React, { useEffect, useRef } from 'react'

import { ComboboxList } from 'ariakit/combobox'

import { Box, tag } from '..'

import * as style from './filter.style'
import { usePopoverContext } from './filter-popover-context'

export const FilterListbox = (props: FilterListboxProps) => {
  const { children, id } = props
  const optionsContainerRef = useRef<HTMLDivElement>(null)

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
      <Box
        as={ComboboxList as any}
        state={{ ...ariakitcomboboxState, visible: true }}
        id={id}
        csx={style.list}
      >
        {children}
      </Box>
    </tag.span>
  )
}

interface FilterListboxProps {
  id?: string
  children: React.ReactNode
}
