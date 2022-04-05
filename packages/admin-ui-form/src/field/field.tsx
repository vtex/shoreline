import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui'
import type { ReactNode } from 'react'

export interface FieldProps {
  name: string
  label: ReactNode
  /**
   * Field tone of voice
   * @default neutral
   */
  tone?: 'neutral' | 'critical'
  helperMessage?: ReactNode
  criticalMessage?: ReactNode
}

export const Field = createComponent<'div', FieldProps>((props) => {
  const {
    name,
    children,
    label,
    tone,
    helperMessage,
    criticalMessage,
    ...fieldProps
  } = props

  return useElement('div', {
    ...fieldProps,
    baseStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    children: (
      <>
        <Label htmlFor={name}>{label}</Label>
        {children}
        <FieldMessage
          tone={tone}
          helperMessage={helperMessage}
          criticalMessage={criticalMessage}
        />
      </>
    ),
  })
})

export const Label = createComponent<'label'>((props) => {
  return useElement('label', {
    ...props,
    baseStyle: {
      text: '$body',
      color: '$secondary',
    },
  })
})

export const FieldMessage = createComponent<
  'div',
  Omit<FieldProps, 'label' | 'name'>
>((props) => {
  const { helperMessage, criticalMessage, tone, ...messageProps } = props

  const isCritical = tone === 'critical'
  const message = isCritical ? criticalMessage : helperMessage

  if (!message) {
    return null
  }

  return useElement('div', {
    ...messageProps,
    baseStyle: {
      text: '$detail',
      color: isCritical ? '$critical' : '$primary',
    },
    children: message,
  })
})
