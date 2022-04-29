import React from 'react'

import { Stack } from '../stack'
import { Text } from '../components/Text'
import type { SwitchOptions } from './types'

export function SwitchMessage(props: SwitchMessageProps) {
  const { helpText, errorText } = props

  const hasMessage = !!(errorText || helpText)

  if (!hasMessage) {
    return null
  }

  return (
    <Stack space="$xs">
      {helpText && (
        <Text variant="detail" tone="secondary">
          {helpText}
        </Text>
      )}
      {errorText && (
        <Text variant="detail" tone="critical">
          {errorText}
        </Text>
      )}
    </Stack>
  )
}

export type SwitchMessageProps = Pick<SwitchOptions, 'errorText' | 'helpText'>
