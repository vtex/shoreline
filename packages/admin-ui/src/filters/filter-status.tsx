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

  // more filter status comming soon
  if (
    status === 'ready' ||
    status === 'loading' ||
    status === 'empty' ||
    status === 'error'
  )
    return null

  return (
    <>
      {status === 'search-error' && (
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

// import { Skeleton } from '../components/Skeleton'
// import { Flex } from '../flex'
// import { FilterFooter } from './filter-footer'

// {status === 'empty' && (
//   <Box csx={{ padding: '$l' }}>
//     <Text variant="title2">{formatMessage('empty')}</Text>
//   </Box>
// )}

//   <Box csx={{ padding: '$l' }}>
//   <Stack space="$xl" csx={{ width: '3/4' }}>
//     <Skeleton csx={{ height: 20 }} />
//     <Skeleton csx={{ height: 20, width: '9/12' }} />
//     <Skeleton csx={{ height: 20, width: '10/12' }} />
//     <Skeleton csx={{ height: 20, width: '11/12' }} />
//     <Skeleton csx={{ height: 20, width: '8/12' }} />
//   </Stack>

//   <Flex justify="end" csx={{ marginTop: '$2xl' }}>
//     <Skeleton csx={{ height: 32, width: 62, marginRight: '$m' }} />
//     <Skeleton csx={{ height: 32, width: 62 }} />
//   </Flex>
// </Box>

// {status === 'error' && (
//   <Box csx={{ padding: '$l' }}>
//     <Text variant="title2">{formatMessage('errorTitle')}</Text>
//     <Button variant="tertiary" onClick={onRetry} bleedX>
//       {formatMessage('retry')}
//     </Button>
//     <FilterFooter csx={{ marginTop: '$l', padding: 0 }} />
//   </Box>
// )}
