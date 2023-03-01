import type { ReactNode } from 'react'
import React from 'react'

import { Stack } from '../stack'
import { Text } from '../components/Text'

export function FormControlMessage(props: FormControlMessageProps) {
  const { helpText, error, errorText, className } = props

  const hasError = error && errorText
  const hasMessage = hasError || helpText

  return hasMessage ? (
    <Stack className={className} space="$space-0">
      {helpText ? (
        <Text variant="detail" tone="secondary">
          {helpText}
        </Text>
      ) : null}
      {hasError ? (
        <Text variant="detail" tone="critical" role="alert">
          {errorText}
        </Text>
      ) : null}
    </Stack>
  ) : null
}

export interface FormControlMessageProps {
  helpText?: ReactNode
  errorText?: ReactNode
  error?: boolean
  className?: string
}
