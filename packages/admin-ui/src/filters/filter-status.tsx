import React from 'react'

import { Text } from '../components/Text'

import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'
import { Button } from '../button'
import { Stack } from '../stack'
import { Box } from '../box'
import * as style from './filter.style'
import { Skeleton } from '../components/Skeleton'

import type { FilterStatus as FilterStatusType } from './use-filter-status'

export function FilterStatus(props: FilterStatusProps) {
  const { status, onRetry } = props

  const formatMessage = useMessageFormatter(messages.status)

  if (!status) return null

  if (status === 'ready') return null

  return (
    <>
      {status === 'empty' && (
        <Box csx={style.statusLayout}>
          <Text variant="title2">{formatMessage('empty')}</Text>
        </Box>
      )}

      {status === 'loading' && (
        <Stack csx={style.statusLayout} space="$2xl">
          <Stack space="$xl" csx={{ width: '3/4' }}>
            <Skeleton csx={{ height: 20 }} />
            <Skeleton csx={{ width: '9/12', height: 20 }} />
            <Skeleton csx={{ width: '10/12', height: 20 }} />
            <Skeleton csx={{ width: '11/12', height: 20 }} />
            <Skeleton csx={{ width: '8/12', height: 20 }} />
          </Stack>

          <Stack
            direction="row"
            csx={{
              width: '100%',
              '> *': { height: 32, width: 62 },
              justifyContent: 'flex-end',
            }}
          >
            <Skeleton />
            <Skeleton />
          </Stack>
        </Stack>
      )}

      {status === 'error' && (
        <Box csx={style.statusLayout} className="__admin-ui-filter-status">
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button
            variant="tertiary"
            onClick={onRetry}
            csx={{ marginTop: '$m' }}
            bleedX
          >
            {formatMessage('retry')}
          </Button>
        </Box>
      )}

      {status === 'not-found' && (
        <Stack
          csx={{ paddingX: '$xl' }}
          space="$s"
          className="__admin-ui-filter-status"
        >
          <Text variant="title2">{formatMessage('noResultsTitle')}</Text>
          <Text variant="body" tone="secondary">
            {formatMessage('noResultsSubtitle')}
          </Text>
        </Stack>
      )}
    </>
  )
}

interface FilterStatusProps {
  status: FilterStatusType
  onRetry: () => void
}
