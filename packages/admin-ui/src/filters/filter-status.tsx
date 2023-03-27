import React from 'react'

import { Text } from '../components/Text'

import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'
import { Button } from '../button'
import { Stack } from '../stack'
import { Box } from '../box'
import * as style from './filter.style'
import { Skeleton } from '../skeleton'

import type { FilterStatus as FilterStatusType } from './use-filter-status'
import { csx, cx } from '@vtex/admin-ui-core'

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
        <Stack className={csx(style.statusLayout)} space="$space-6">
          <Stack space="$space-4" className={csx({ width: '3/4' })}>
            <Skeleton className={csx({ height: 20 })} />
            <Skeleton className={csx({ width: '9/12', height: 20 })} />
            <Skeleton className={csx({ width: '10/12', height: 20 })} />
            <Skeleton className={csx({ width: '11/12', height: 20 })} />
            <Skeleton className={csx({ width: '8/12', height: 20 })} />
          </Stack>

          <Stack
            direction="row"
            className={csx({
              width: '100%',
              justifyContent: 'flex-end',
            })}
          >
            <Skeleton className={csx({ height: 32, width: 62 })} />
            <Skeleton className={csx({ height: 32, width: 62 })} />
          </Stack>
        </Stack>
      )}

      {status === 'error' && (
        <Stack
          className={cx(csx(style.statusLayout), '__admin-ui-filter-status')}
        >
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button variant="tertiary" onClick={onRetry} bleedX>
            {formatMessage('retry')}
          </Button>
        </Stack>
      )}

      {status === 'not-found' && (
        <Stack
          className={cx(
            csx({ padding: '$space-4 $space-5' }),
            '__admin-ui-filter-status'
          )}
          space="$space-05"
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
