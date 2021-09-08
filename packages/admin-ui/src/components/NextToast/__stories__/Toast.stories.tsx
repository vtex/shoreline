import React from 'react'
import type { Meta } from '@storybook/react'

import { Toast, ToastProvider, useToast } from '../index'
import { Button } from '../../Button'
import { Set } from '../../Set'

export default {
  title: 'admin-ui/NextToast',
  component: Toast,
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
            type: 'success',
            action: { label: 'Action', onClick: () => {} },
          })
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            type: 'error',
            action: { label: 'Action', onClick: () => {} },
          })
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          showToast({
            message: 'This is a Toast!',
            dismissible: true,
            type: 'warning',
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
