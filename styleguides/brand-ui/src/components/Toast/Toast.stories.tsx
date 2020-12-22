import React from 'react'
import { Meta, Story } from '@storybook/react'

import { ToastProvider } from '.'
import { Button } from '../Button'
import useToast from './useToast'

export default {
  title: 'beta/Toast',
} as Meta

const ToastView = () => {
  const { createToast } = useToast()

  const handleClickAddToast = () => {
    createToast('New toast')
  }

  return <Button onClick={handleClickAddToast}>Add toast</Button>
}

const Template: Story = () => (
  <ToastProvider>
    <ToastView />
  </ToastProvider>
)

export const Playground = Template.bind({})

const ToastWithActionView = () => {
  const { createToast } = useToast({
    actionText: 'Undo',
    closeOnAction: true,
    onActionClick: () => {},
  })

  const handleClickAddToast = () => {
    createToast('New toast with action')
  }

  return <Button onClick={handleClickAddToast}>Add toast with action</Button>
}

export const WithAction = () => (
  <ToastProvider>
    <ToastWithActionView />
  </ToastProvider>
)
