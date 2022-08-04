import type { ReactNode } from 'react'
import React, { useEffect } from 'react'

import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit/menu'

import * as style from './filter.style'
import { AppliedItemsLabel } from './filter-applied-items-label'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useFilterOptionalContext } from './filter-toggler/filter-optional-context'

const asMulti = (state: any) => state as UseFilterMultipleReturn<any>

const convertAppliedToArray = (
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
) => {
  const singleSelectState = state as UseFilterStateReturn<any>

  return singleSelectState.appliedItem ? [singleSelectState.appliedItem] : []
}

export const FilterDisclosure = createComponent<
  typeof MenuButton,
  FilterDisclosureProps
>((props: FilterDisclosureProps) => {
  const { state, children, id, ...restProps } = props
  const { setMenuState } = useFilterOptionalContext()

  const { menu } = state

  const appliedList =
    asMulti(state)?.appliedItems ?? convertAppliedToArray(state)

  useEffect(() => {
    setMenuState?.(state.menu)
  }, [])

  return useElement(MenuButton, {
    baseStyle: style.disclosure,
    children: (
      <>
        {children}
        <AppliedItemsLabel appliedItems={appliedList} />
        <IconCaretUp size="small" csx={style.caretIcon(menu.mounted)} />
      </>
    ),
    state: menu,
    id,
    ...restProps,
  })
})

interface FilterDisclosureProps {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
  id?: string
  children: ReactNode
}
