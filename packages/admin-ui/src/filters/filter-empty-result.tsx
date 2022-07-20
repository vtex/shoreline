import { createComponent, useElement } from '@vtex/admin-ui-react'
import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'

import { Box } from '../box'
import type { Role } from 'ariakit'
import React from 'react'
import { ErrorStatus } from './error-status'
import { Text } from '../components/Text'
import { Stack } from '../stack'
import type { ComboboxStatus } from '../combobox'

export const FilterEmptyResult = createComponent<
  typeof Role,
  FilterEmptyResultProps
>((props) => {
  const { onRetry, status = 'not-found', ...restProps } = props

  console.log({ status })

  if (status !== 'not-found' && status !== 'error') {
    return null
  }

  const formatMessage = useMessageFormatter(messages.searchBox)

  return useElement(Box, {
    baseStyle: { marginX: '$xl', height: 245 },
    children:
      status === 'not-found' ? (
        <Stack space="$s">
          <Text variant="title2">{formatMessage('noResultsTitle')}</Text>
          <Text variant="body" tone="secondary">
            {formatMessage('noResultsSubtitle')}
          </Text>
        </Stack>
      ) : (
        <ErrorStatus onRetry={onRetry} />
      ),
    ...restProps,
  })
})

interface FilterEmptyResultProps {
  status?: ComboboxStatus
  onRetry?: () => void
}
