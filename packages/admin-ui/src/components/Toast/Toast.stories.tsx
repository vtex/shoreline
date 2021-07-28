import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Box } from '@vtex/admin-primitives'

import { Button } from '../Button'
import { Set } from '../Set'
import { toast } from './index'
import type { ToastProps } from './components/typings'
import { message } from './testUtils'

export default {
  title: 'admin-ui/Toast',
} as Meta

export function Basic() {
  return (
    <Set>
      <Button
        onClick={() =>
          toast.dispatch({
            message,
          })
        }
      >
        Notify info
      </Button>
      <Button
        onClick={() =>
          toast.dispatch({
            type: 'success',
            message,
          })
        }
      >
        Notify success
      </Button>
      <Button
        onClick={() =>
          toast.dispatch({
            type: 'error',
            message,
          })
        }
      >
        Notify error
      </Button>
      <Button
        onClick={() =>
          toast.dispatch({
            type: 'warning',
            message,
          })
        }
      >
        Notify warning
      </Button>
      <Button
        onClick={() =>
          toast.dispatch({
            type: 'success',
            message: "I'm customized 😎!",
            csx: {
              background: 'black',
              borderRadius: '8px',
              display: 'flex',
              height: '72px',
              padding: '22px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              '> div > span': {
                color: 'white',
              },
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
  return (
    <Set>
      <Button
        onClick={() =>
          toast.dispatch({
            message,
            dismissible: true,
          })
        }
      >
        Dismissable
      </Button>
      <Button
        onClick={() =>
          toast.dispatch({
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
          toast.dispatch({
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
          toast.dispatch({
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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
