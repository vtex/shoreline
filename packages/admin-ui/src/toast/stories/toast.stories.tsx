import React from 'react'
import type { Meta } from '@storybook/react'

import { ToastProvider, useToast } from '../index'
import { Button } from '../../button'
import { Text } from '../../components/Text'
import { Inline } from '../../inline'
import type { Toast } from '../types'

export default {
  title: 'admin-ui-review/toast',
  component: Button,
} as Meta

const ToastButton = () => {
  const toast = useToast()

  return (
    <Inline>
      <Button
        onClick={() => {
          toast.show({
            message: 'Type here a longer message but not much longer than that',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          })
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          toast.show({
            message: 'This is a Toast!',
            variant: 'positive',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          })
        }}
      >
        Positive
      </Button>
      <Button
        onClick={() => {
          toast.show({
            message: 'This is a Toast!',
            variant: 'critical',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          })
        }}
      >
        Critical
      </Button>
      <Button
        onClick={() => {
          toast.show({
            message: 'This is a Toast!',
            variant: 'warning',
            action: {
              label: 'Action',
              onClick: () => {
                alert('Some action!')
              },
            },
          })
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toast.show({
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
            csx: {
              maxHeight: 'auto',
              ':hover': {
                background: '#C0E1D5',
                cursor: 'pointer',
              },
            },
            onClick: () => alert('Hello world!'),
          })
        }}
      >
        Custom
      </Button>
    </Inline>
  )
}

export function Playground() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  )
}

function ToastDisclosure(props: { label: string; toast: Toast }) {
  const toast = useToast()

  return (
    <Inline>
      <Button
        onClick={() => {
          toast.show(props.toast)
        }}
      >
        {props.label}
      </Button>
    </Inline>
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
