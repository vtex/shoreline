import type { ReactNode } from 'react'
import React from 'react'
import { Button } from '../button'
import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit'

import * as style from './filter-disclosure.style'

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, children } = props

  return (
    <Button as={MenuButton as any} state={state} csx={style.baseline}>
      {children}
      <IconCaretUp
        size="small"
        csx={{
          transform: `rotate(${state.mounted ? 0 : 180}deg)`,
          marginLeft: '$s',
        }}
      />
    </Button>
  )
}

interface FilterDisclosureProps {
  state: any
  children: ReactNode
}
