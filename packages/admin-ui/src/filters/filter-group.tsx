import type { ReactNode } from 'react'
import React from 'react'
import type { SystemComponentProps } from '../types'
import { Button } from '../button'
import { Flex } from '../components/Flex'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function FilterGroup(props: FilterGroupProps) {
  const { children, state, ...rest } = props

  const formatMessage = useMessageFormatter(messages.actions)

  return (
    <Flex wrap="wrap" role="group" {...rest}>
      {children}
      <Button onClick={state.onClear} variant="neutralTertiary">
        {formatMessage('clearAll')}
      </Button>
    </Flex>
  )
}

export interface FilterGroupProps extends SystemComponentProps<{}> {
  children?: ReactNode
  state: { onClear: () => void }
}
