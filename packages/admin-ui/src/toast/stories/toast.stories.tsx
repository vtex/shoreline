import React from 'react'
import type { Meta } from '@storybook/react'

import { ToastProvider, useToast } from '../index'
import { Button } from '../../button'
import { Text } from '../../text'
import { Inline } from '../../inline'
import type { ToastProps } from '../types'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/toast',
} as Meta

function ToastDisclosure(props: { label: string; toast: ToastProps }) {
  const toast = useToast()

  return (
    <Inline>
      <Button
        onClick={() => {
          toast(props.toast)
        }}
      >
        {props.label}
      </Button>
    </Inline>
  )
}

export function Playground() {
  return (
    <ToastProvider>
      <Inline>
        <ToastDisclosure
          label="Info"
          toast={{
            message: 'Type here a longer message but not much longer than that',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          }}
        />
        <ToastDisclosure
          label="Positive"
          toast={{
            message: 'This is a Toast!',
            variant: 'positive',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          }}
        />
        <ToastDisclosure
          label="Critical"
          toast={{
            message: 'This is a Toast!',
            variant: 'critical',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          }}
        />
        <ToastDisclosure
          label="Warning"
          toast={{
            message: 'This is a Toast!',
            variant: 'warning',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          }}
        />
        <ToastDisclosure
          label="Custom"
          toast={{
            message: (
              <>
                <Text variant="pageTitle">Hi there!</Text>
                <br />
                <Text>
                  This is a custom Toast with a higher than average height and a
                  button-like behavior.
                </Text>
              </>
            ),
            variant: 'positive',
            className: csx({
              maxHeight: 'auto',
              ':hover': {
                background: '#C0E1D5',
                cursor: 'pointer',
              },
            }),
            onClick: () => alert('Hello world!'),
          }}
        />
      </Inline>
    </ToastProvider>
  )
}

export function Replace() {
  return (
    <ToastProvider>
      <Inline>
        <ToastDisclosure
          label="creating"
          toast={{
            key: 'create',
            message: 'Creating...',
          }}
        />
        <ToastDisclosure
          label="created"
          toast={{
            key: 'create',
            message: 'Created!',
            variant: 'positive',
          }}
        />
      </Inline>
    </ToastProvider>
  )
}
