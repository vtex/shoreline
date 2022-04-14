import type { ReactNode } from 'react'
import React from 'react'

import { Set } from '../components/Set'
import { Text } from '../components/Text'

export function Message(props: MessageProps) {
  const { helpText, criticalText, tone } = props

  const isCritical = tone === 'critical' && criticalText
  const hasMessage = isCritical || helpText

  return hasMessage ? (
    <Set spacing="$xs" orientation="vertical">
      {helpText ? (
        <Text variant="detail" tone="secondary">
          {helpText}
        </Text>
      ) : null}
      {isCritical ? (
        <Text variant="detail" tone="critical">
          {criticalText}
        </Text>
      ) : null}
    </Set>
  ) : (
    <></>
  )
}

export interface MessageProps {
  helpText?: ReactNode
  criticalText?: ReactNode
  tone?: 'critical' | 'neutral'
}
