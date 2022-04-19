import type { ReactNode } from 'react'
import React from 'react'

import { Set } from '../components/Set'
import { Text } from '../components/Text'

export function Message(props: MessageProps) {
  const { helpText, errorText, error } = props

  const hasError = error && errorText
  const hasMessage = hasError || helpText

  return hasMessage ? (
    <Set spacing="$xs" orientation="vertical">
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
    </Set>
  ) : (
    <></>
  )
}

export interface MessageProps {
  helpText?: ReactNode
  errorText?: ReactNode
  error?: boolean
}
