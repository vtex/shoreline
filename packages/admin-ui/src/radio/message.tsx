import type { ReactNode } from 'react'
import React from 'react'

import { Stack } from '../stack'
import { Text } from '../components/Text'

export function Message(props: MessageProps) {
  const { helpText, errorText, error } = props

  const hasError = error && errorText
  const hasMessage = hasError || helpText

  return hasMessage ? (
    <Stack space="$xs">
      {helpText ? (
        <Text variant="detail" tone="secondary">
          {helpText}
        </Text>
      ) : null}
      {hasError ? (
        <Text variant="detail" tone="critical">
          {errorText}
        </Text>
      ) : null}
    </Stack>
  ) : (
    <></>
  )
}

export interface MessageProps {
  helpText?: ReactNode
  errorText?: ReactNode
  error?: boolean
}
