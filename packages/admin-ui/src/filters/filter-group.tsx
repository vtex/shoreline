import type { ReactNode } from 'react'
import React from 'react'
import type { SystemComponentProps } from '../types'
import { Button } from '../components/Button'

import { Flex } from '../components/Flex'

export function FilterGroup(props: FilterBarProps) {
  const { children, state, ...rest } = props

  return (
    <Flex wrap="wrap" {...rest}>
      {children}
      <Button onClick={state.onClear} variant="adaptative-dark" size="small">
        Clear all
      </Button>
    </Flex>
  )
}

export interface FilterBarProps extends SystemComponentProps<{}> {
  children?: ReactNode
  state: { onClear: () => void }
}
