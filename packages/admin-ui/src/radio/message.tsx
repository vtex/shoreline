import type { ReactNode } from 'react'
import React from 'react'

import { Set } from '../components/Set'
import { Text } from '../components/Text'

export function Message(props: MessageProps) {
  const { helpText, invalidText, invalid } = props

  const isInvalid = invalid && invalidText
  const hasMessage = isInvalid || helpText

  return hasMessage ? (
    <Set spacing="$xs" orientation="vertical">
      {helpText ? (
        <Text variant="detail" tone="secondary">
          {helpText}
        </Text>
      ) : null}
      {isInvalid ? (
        <Text variant="detail" tone="critical">
          {invalidText}
        </Text>
      ) : null}
    </Set>
  ) : (
    <></>
  )
}

export interface MessageProps {
  helpText?: ReactNode
  invalidText?: ReactNode
  invalid?: boolean
}
