import React from 'react'

import type { AlertProps, AlertVariant } from '../index'
import { Alert } from '../index'
import { Text } from '../../text'
import { Button } from '../../button'

const variants: AlertVariant[] = [
  'success',
  'critical',
  'warning',
  'informational',
]

export default {
  title: 'components/alert',
  argTypes: {
    children: {
      control: 'text',
      description: 'Alert message',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Alert variant',
    },
    withAction: {
      control: 'boolean',
      description: 'Whether to render an action or not',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to render a dismiss button or not',
    },
  },
  args: {
    variant: 'informational',
    children: 'Alert message',
    withAction: false,
    dismissible: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

interface StoryArgs extends AlertProps {
  withAction: boolean
  dismissible: boolean
}

export function Play(args: StoryArgs) {
  const { variant, children, withAction, dismissible, ...props } = args

  const onDismiss = dismissible ? () => null : undefined

  return (
    <Alert variant={variant} {...props} onDismiss={onDismiss}>
      <Text variant="body">{children}</Text>
      {withAction && (
        <Button variant="tertiary" onClick={() => alert('Clicked')}>
          Action
        </Button>
      )}
    </Alert>
  )
}
