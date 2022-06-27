import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '../button'
import { IconCaretUp } from '@vtex/phosphor-icons'
import type { MenuState } from 'ariakit/menu'
import { MenuButton } from 'ariakit/menu'

import * as style from './filter.style'
import { AppliedItemsLabel } from './filter-applied-items-label'
import type { AnyObject } from '..'

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, children, appliedItems, getOptionLabel, id } = props

  return (
    <Button as={MenuButton as any} state={state} csx={style.disclosure} id={id}>
      {children}
      <AppliedItemsLabel
        renderItemLabel={getOptionLabel}
        appliedItems={appliedItems}
      />
      <IconCaretUp size="small" csx={style.caretIcon(state.mounted)} />
    </Button>
  )
}

interface FilterDisclosureProps {
  state: MenuState
  appliedItems: AnyObject[]
  getOptionLabel: (item: AnyObject) => string
  id?: string
  children: ReactNode
}
