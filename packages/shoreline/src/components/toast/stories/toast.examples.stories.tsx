import React from 'react'

import { ToastStack, toast } from '../index'
import { Stack } from '../../stack'
import { Button } from '../../button'

export default {
  title: 'components/toast/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function ToastFunction() {
  return (
    <Stack>
      <ToastStack />
      <Button
        onClick={() => {
          toast.informational('Informational!')
        }}
      >
        Informational
      </Button>
      <Button
        onClick={() => {
          toast.success('Success!')
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toast.warning('Warning!')
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toast.critical('Critical!')
        }}
      >
        Critical
      </Button>
      <Button
        onClick={() => {
          toast.promise(
            new Promise(function (resolve) {
              setTimeout(resolve, 2000)
            }),
            {
              success: 'Resolved',
              error: 'Promisse has error',
              loading: 'Loading',
            }
          )
        }}
      >
        Promise
      </Button>
    </Stack>
  )
}
