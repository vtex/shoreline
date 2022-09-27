import type { ReactNode } from 'react'
import React from 'react'
import type { SystemComponentProps } from '../types'
import { Button } from '../button'
import { Flex } from '../flex'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function FilterGroup(props: FilterGroupProps) {
  const { children, state, ...rest } = props

  const formatMessage = useMessageFormatter(messages.actions)

  return (
    <Flex
      wrap="wrap"
      role="group"
      csx={{
        '> .__admin-ui-filter-disclosure:not(:first-child)': {
          marginLeft: '$m',
        },
      }}
      {...rest}
    >
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
