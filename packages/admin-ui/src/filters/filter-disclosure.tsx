import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '../button'
import { IconCaretUp } from '@vtex/phosphor-icons'
import type { MenuState } from 'ariakit'
import { MenuButton } from 'ariakit'

import * as style from './filter-disclosure.style'

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, children } = props

  return (
    <Button as={MenuButton as any} state={state} csx={style.baseline}>
      {children}
      <IconCaretUp size="small" csx={style.caretIcon(state.mounted)} />
    </Button>
  )
}

interface FilterDisclosureProps {
  state: MenuState<any>
  children: ReactNode
}
