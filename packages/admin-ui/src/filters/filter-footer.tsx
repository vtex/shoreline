import { Role } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import React from 'react'
import { Button } from '../button'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'
import { usePopoverContext } from './filter-popover-context'
import { Stack } from '../stack'

export const FilterFooter = createComponent<typeof Role>(() => {
  const { state } = usePopoverContext()

  const { onChange, onClear } = state

  const formatMessage = useMessageFormatter(messages.actions)
  const { isScrollableLayout } = usePopoverContext()

  return useElement(Role, {
    baseStyle: {
      borderTop: isScrollableLayout ? '$neutral' : 'none',
      padding: '$l',
      paddingTop: isScrollableLayout ? undefined : 0,
      display: 'flex',
      justifyContent: 'end',
    },
    children: (
      <Stack direction="row" space="$m">
        <Button variant="tertiary" onClick={onClear}>
          {formatMessage('clear')}
        </Button>
        <Button onClick={onChange}>{formatMessage('apply')}</Button>
      </Stack>
    ),
  })
})
