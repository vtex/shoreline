import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '../button'
import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit/menu'

import * as style from './filter.style'
import { AppliedItemsLabel } from './filter-applied-items-label'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'

const isMulti = (
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
) => {
  return (state as UseFilterMultipleReturn<any>).appliedItems !== undefined
}

const asMulti = (state: any) => state as UseFilterMultipleReturn<any>
const asSingle = (state: any) => state as UseFilterStateReturn<any>

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, children, id } = props

  const { menu } = state

  // TODO deal with this
  const appliedList = isMulti(state)
    ? asMulti(state).appliedItems
    : asSingle(state).appliedItem
    ? [asSingle(state).appliedItem!]
    : []

  return (
    <Button as={MenuButton as any} state={menu} csx={style.disclosure} id={id}>
      {children}
      <AppliedItemsLabel appliedItems={appliedList} />
      <IconCaretUp size="small" csx={style.caretIcon(menu.mounted)} />
    </Button>
  )
}

interface FilterDisclosureProps {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
  id?: string
  children: ReactNode
}
