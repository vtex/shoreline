import type { ReactNode } from 'react'
import React from 'react'

import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit/menu'

import * as style from './filter.style'
import { AppliedItemsLabel } from './filter-applied-items-label'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { createComponent, useElement } from '@vtex/admin-ui-react'

const isMulti = (
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
) => {
  return (state as UseFilterMultipleReturn<any>).appliedItems !== undefined
}

const asMulti = (state: any) => state as UseFilterMultipleReturn<any>
const asSingle = (state: any) => state as UseFilterStateReturn<any>

export const FilterDisclosure = createComponent<
  typeof MenuButton,
  FilterDisclosureProps
>((props: FilterDisclosureProps) => {
  const { state, children, id, ...restProps } = props

  const { menu } = state

  const appliedList = isMulti(state)
    ? asMulti(state).appliedItems
    : asSingle(state).appliedItem
    ? [asSingle(state).appliedItem!]
    : []

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
