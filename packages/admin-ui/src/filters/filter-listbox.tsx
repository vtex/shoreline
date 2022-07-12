import React, { useEffect, useRef } from 'react'
import { ComboboxList } from 'ariakit/combobox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './filter.style'
import { usePopoverContext } from './filter-popover-context'
import { Box } from '..'

export const FilterListbox = createComponent<'span', FilterListboxProps>(
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
      ...restProps,
    })
  }
)

interface FilterListboxProps {
  id?: string
  children: React.ReactNode
}
