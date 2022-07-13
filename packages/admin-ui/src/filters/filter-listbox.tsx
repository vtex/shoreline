import React, { useEffect, useRef } from 'react'
import { ComboboxList } from 'ariakit/combobox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './filter.style'
import { usePopoverContext } from './filter-popover-context'
import { Box } from '../box'
import { useForkRef } from '@vtex/admin-ui-hooks'

export const FilterListbox = createComponent<'div', FilterListboxProps>(
  (props) => {
    const { children, id, ref: htmlRef, ...restProps } = props
    const optionsContainerRef = useRef<HTMLDivElement>(null)

    const {
      isScrollableLayout,
      setIsScrollableLayout,
      state: { combobox },
    } = usePopoverContext()

    const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
    const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

    useEffect(() => {
      const isScrollable = scrollHeight > containerHeight

      if (isScrollableLayout !== isScrollable) {
        setIsScrollableLayout(isScrollable)
      }
    }, [scrollHeight, containerHeight])

    const ariakitcomboboxState = { ...combobox, matches: [] }

    return useElement('div', {
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
      ref: useForkRef(optionsContainerRef, htmlRef as any),
      id,
      ...restProps,
    })
  }
)

interface FilterListboxProps {
  id?: string
  children: React.ReactNode
}
