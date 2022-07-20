import React from 'react'

import { Text } from '../components/Text'

import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'
import { Button } from '../button'
import { Stack } from '../stack'
import { Box } from '../box'

export function FilterStatus(props: FilterStatusProps) {
  const { status, onRetry } = props

  const formatMessage = useMessageFormatter(messages.status)

  if (!status) return null

  // more filter status comming soon
  if (status === 'ready' || status === 'loading' || status === 'empty')
    return null

  return (
    <>
      {status === 'error' && (
        <Box csx={{ marginX: '$xl', height: 256 }}>
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button variant="tertiary" onClick={onRetry} bleedX>
            {formatMessage('retry')}
          </Button>
        </Box>
      )}

      {status === 'not-found' && (
        <Box csx={{ marginX: '$xl', height: 256 }}>
          <Stack space="$s">
            <Text variant="title2">{formatMessage('noResultsTitle')}</Text>
            <Text variant="body" tone="secondary">
              {formatMessage('noResultsSubtitle')}
            </Text>
          </Stack>
        </Box>
      )}
    </>
  )
}

interface FilterStatusProps {
  status: 'error' | 'loading' | 'ready' | 'not-found' | 'empty'
  onRetry: () => void
}
