import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Box } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { Set } from '../Set'
import { useToaster } from '.'
import { Toast } from './components/Toast'
import { ToastProps } from './components/typings'
import { message } from './testUtils'

export default {
  title: 'admin-ui/Toast',
  component: Toast,
} as Meta

export function Basic() {
  const toaster = useToaster()

  return (
    <Set>
      <Button
        onClick={() =>
          toaster.notify({
            message,
          })
        }
      >
        Notify info
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'success',
            message,
          })
        }
      >
        Notify success
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'error',
            message,
          })
        }
      >
        Notify error
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'warning',
            message,
          })
        }
      >
        Notify warning
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'success',
            message: "I'm customized 😎!",
            csx: {
              background:
                'radial-gradient(ellipse at top, #e66465, transparent),radial-gradient(ellipse at bottom, #4d9f0c, transparent);',
              color: 'white',
              borderRadius: '8px',
              height: '72px',
              padding: '22px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            },
            iconProps: {
              children: <Box>🔥</Box>,
            },
          })
        }
      >
        Custom toast
      </Button>
    </Set>
  )
}

export function Interactive() {
  const toaster = useToaster()

  return (
    <Set>
      <Button
        onClick={() =>
          toaster.notify({
            message,
            dismissible: true,
          })
        }
      >
        Dismissable
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'success',
            message,
            action: {
              children: <span>Action</span>,
              onClick: () => alert('Toast callback'),
            },
          })
        }
      >
        Toast with action
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'warning',
            message,
            dismissible: true,
            action: {
              children: <span>Action</span>,
              onClick: () => alert('Toast callback'),
            },
          })
        }
      >
        Dismissable toast with action
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            message: 'Type here a longer message but not much longer than that',
            dismissible: true,
            action: {
              children: <span>Action</span>,
              onClick: () => alert('Toast callback'),
            },
          })
        }
      >
        With long message
      </Button>
    </Set>
  )
}

export const Playground: Story<ToastProps> = (args) => {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.notify({
          ...args,
        })
      }
    >
      Playground toast
    </Button>
  )
}

Playground.args = {
  message: "Let's have fun!",
}
