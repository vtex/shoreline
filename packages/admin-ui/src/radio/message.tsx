import type { ReactNode } from 'react'
import React from 'react'

import { Set } from '../components/Set'
import { Text } from '../components/Text'

export function Message(props: MessageProps) {
  const { helperText, criticalMessage, tone } = props

  const isCritical = tone === 'critical' && criticalMessage
  const hasMessage = isCritical || helperText

  return hasMessage ? (
    <Set spacing="$xs" orientation="vertical">
      {helperText ? (
        <Text variant="detail" tone="secondary">
          {helperText}
        </Text>
      ) : null}
      {isCritical ? (
        <Text variant="detail" tone="critical">
          {criticalMessage}
        </Text>
      ) : null}
    </Set>
  ) : (
    <></>
  )
}

export interface MessageProps {
  helperText?: ReactNode
  criticalMessage?: ReactNode
  tone?: 'critical' | 'neutral'
}
