import { createComponent, useElement } from '@vtex/admin-ui-react'
import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'

import { Box } from '../box'
import type { Role } from 'ariakit'
import React from 'react'
import { Button } from '../button'
import { Text } from '../components/Text'

export const ErrorStatus = createComponent<typeof Role, ErrorStatusProps>(
  (props) => {
    const { onRetry = () => {}, ...restProps } = props

    const formatMessage = useMessageFormatter(messages.status)

    return useElement(Box, {
      children: (
        <>
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button variant="tertiary" bleedX>
            {formatMessage('retry')}
          </Button>
        </>
      ),
      ...restProps,
    })
  }
)

interface ErrorStatusProps {
  onRetry?: () => void
}
