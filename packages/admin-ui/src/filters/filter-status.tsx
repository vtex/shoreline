import React from 'react'

import { Text } from '../text'

import { messages } from './messages'
import { useMessageFormatter } from '../i18n'
import { Button } from '../button'
import { Stack } from '../stack'
import { Skeleton } from '../skeleton'

import type { FilterStatus as FilterStatusType } from './use-filter-status'
import { csx, cx } from '@vtex/admin-ui-core'
import { filterStatusTheme } from './filter.style'

export function FilterStatus(props: FilterStatusProps) {
  const { status, onRetry } = props

  const formatMessage = useMessageFormatter(messages)

  if (!status) return null

  if (status === 'ready') return null

  return (
    <>
      {status === 'empty' && (
        <div className={filterStatusTheme}>
          <Text variant="title2">{formatMessage('empty')}</Text>
        </div>
      )}

      {status === 'loading' && (
        <Stack className={filterStatusTheme} space="$space-6">
          <Stack space="$space-4" className={csx({ width: '3/4' })}>
            <Skeleton className={csx({ height: '1.25rem' })} />
            <Skeleton className={csx({ width: '9/12', height: '1.25rem' })} />
            <Skeleton className={csx({ width: '10/12', height: '1.25rem' })} />
            <Skeleton className={csx({ width: '11/12', height: '1.25rem' })} />
            <Skeleton className={csx({ width: '8/12', height: '1.25rem' })} />
          </Stack>

          <Stack
            direction="row"
            className={csx({
              width: '100%',
              justifyContent: 'flex-end',
            })}
          >
            <Skeleton className={csx({ height: '2rem', width: '3.875rem' })} />
            <Skeleton className={csx({ height: '2rem', width: '3.875rem' })} />
          </Stack>
        </Stack>
      )}

      {status === 'error' && (
        <Stack className={cx(filterStatusTheme, '__admin-ui-filter-status')}>
          <Text variant="title2">{formatMessage('errorTitle')}</Text>
          <Button variant="tertiary" onClick={onRetry} bleedX>
            {formatMessage('retry')}
          </Button>
        </Stack>
      )}

      {status === 'not-found' && (
        <Stack
          className={cx(filterStatusTheme, '__admin-ui-filter-status')}
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
