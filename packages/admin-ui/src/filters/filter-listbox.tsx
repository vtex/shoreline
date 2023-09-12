import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import { ComboboxList } from 'ariakit/combobox'
import { useForkRef } from '@vtex/admin-ui-hooks'
import { cx } from '@vtex/admin-ui-core'

import { usePopoverContext } from './filter-popover-context'
import { filterListboxTheme, filterListTheme } from './filter.style'

export const FilterListbox = forwardRef(function FilterListBox(
  props: FilterListboxProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, id, className = '', ...htmlProps } = props
  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const {
    isScrollableLayout,
    setIsScrollableLayout,
    state: { combobox, status },
  } = usePopoverContext()

  const scrollHeight = optionsContainerRef?.current?.scrollHeight ?? 0
  const containerHeight = optionsContainerRef?.current?.clientHeight ?? 0

  useEffect(() => {
    const isScrollable = scrollHeight > containerHeight

    if (isScrollableLayout !== isScrollable) {
      setIsScrollableLayout(isScrollable)
    }
  }, [scrollHeight, containerHeight])

  const ariakitComboboxState = { ...combobox, matches: [], visible: true }

  return (
    <div
      ref={useForkRef(optionsContainerRef, ref as any)}
      className={cx(filterListboxTheme, className)}
      data-status={status}
      id={id}
      {...htmlProps}
    >
      <ComboboxList
        state={ariakitComboboxState}
        id={id}
        className={filterListTheme}
      >
        {children}
      </ComboboxList>
    </div>
  )
})

export type FilterListboxProps = ComponentPropsWithoutRef<'div'>
