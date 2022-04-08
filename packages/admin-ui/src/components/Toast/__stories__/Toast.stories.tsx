import React from 'react'
import type { Meta } from '@storybook/react'

import { ToastProvider, useToast } from '../index'
import { Button } from '../../../button'
import { Set } from '../../Set'
import { Text } from '../../Text'

export default {
  title: 'admin-ui/Toast',
  component: Button,
} as Meta

const ToastButton = () => {
  const showToast = useToast()

  return (
    <Set>
      <Button
        onClick={() => {
          showToast({
            message: 'Type here a longer message but not much longer than that',
            dismissible: true,
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
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            tone: 'positive',
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
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            tone: 'critical',
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
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            tone: 'warning',
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
          showToast({
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
            dismissible: true,
            tone: 'positive',
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
    </Set>
  )
}

export function Playground() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  )
}
