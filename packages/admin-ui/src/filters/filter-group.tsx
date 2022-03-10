import type { ReactNode } from 'react'
import React from 'react'
import type { SystemComponentProps } from '../types'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function FilterGroup(props: FilterBarProps) {
  const { children, state, ...rest } = props

  const formatMessage = useMessageFormatter(messages.actions)

  return (
    <Flex wrap="wrap" {...rest}>
      {children}
      <Button onClick={state.onClear} variant="adaptative-dark" size="small">
        {formatMessage('clearAll')}
      </Button>
    </Flex>
  )
}

export interface FilterBarProps extends SystemComponentProps<{}> {
  children?: ReactNode
  state: { onClear: () => void }
}
