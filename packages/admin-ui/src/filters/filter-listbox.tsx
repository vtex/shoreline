import type { HTMLProps } from 'react'
import React, { useEffect, useRef } from 'react'

import { ComboboxList } from 'ariakit/combobox'

import { Box, createComponent, useElement } from '..'

import * as style from './filter.style'
import { usePopoverContext } from './filter-popover-context'
import type { Role } from 'ariakit'

export const FilterListbox = createComponent<typeof Role, FilterListboxProps>(
  (props) => {
    const { children, id, ...restProps } = props
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

    return useElement('span', {
      baseStyle: style.scrollableContainer,
      children: (
        <Box
          as={ComboboxList as any}
          state={{ ...ariakitcomboboxState, visible: true }}
          id={id}
          csx={style.list}
        >
          {children}
        </Box>
      ),
      ref: optionsContainerRef as any,
      id,
      ...(restProps as Omit<HTMLProps<'span'>, never>),
    })
  }
)

interface FilterListboxProps {
  id?: string
  children: React.ReactNode
}
