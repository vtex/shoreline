import React from 'react'
import type { Meta } from '@storybook/react'

import { ToastProvider, useToast } from '../index'
import { Button } from '../../../button'
import { Set } from '../../Set'

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
            action: { label: 'Action', onClick: () => {} },
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
            action: { label: 'Action', onClick: () => {} },
          })
        }}
      >
        positive
      </Button>
      <Button
        onClick={() => {
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            tone: 'critical',
            action: { label: 'Action', onClick: () => {} },
          })
        }}
      >
        critical
      </Button>
      <Button
        onClick={() => {
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            tone: 'warning',
            action: { label: 'Action', onClick: () => {} },
          })
        }}
      >
        Warning
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
