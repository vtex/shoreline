import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '../button'
import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit'

import * as style from './filter.style'
import type { GenericFilterStateReturn } from '.'
import { AppliedListLabel } from './filter-applied-list-label'
import type { AnyObject } from '..'

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, children, appliedItems } = props

  const disclosureId = state.baseId ? `${state.baseId}-disclosure` : undefined

  return (
    <Button
      as={MenuButton as any}
      state={state.menu}
      csx={style.disclosure}
      id={disclosureId}
    >
      {children}
      <AppliedListLabel
        renderItem={state.getOptionLabel}
        appliedItems={appliedItems}
      />
      <IconCaretUp size="small" csx={style.caretIcon(state.menu.mounted)} />
    </Button>
  )
}

interface FilterDisclosureProps {
  state: GenericFilterStateReturn<any>
  appliedItems: AnyObject[]
  children: ReactNode
}
