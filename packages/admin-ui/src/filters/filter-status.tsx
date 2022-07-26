import React from 'react'

import { Text } from '../components/Text'

import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'
import { Button } from '../button'
import { Stack } from '../stack'
import { Box } from '../box'
import * as style from './filter.style'

import type { FilterStatus as FilterStatusType } from './filter/filter.state'

export function FilterStatus(props: FilterStatusProps) {
  const { status, onRetry } = props

  const formatMessage = useMessageFormatter(messages.status)

  if (!status) return null

  if (status === 'ready') return null

  return (
    <>
      {status === 'error' && (
        <Box csx={style.searchStatusLayout}>
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button variant="tertiary" onClick={onRetry} bleedX>
            {formatMessage('retry')}
          </Button>
        </Box>
      )}

      {status === 'not-found' && (
        <Box csx={style.searchStatusLayout}>
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
  status: FilterStatusType
  onRetry: () => void
}
