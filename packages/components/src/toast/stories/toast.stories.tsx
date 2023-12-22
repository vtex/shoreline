import React from 'react'

import { ToastStack, toast } from '../index'
import { Toast } from '../toast'
import { Stack } from '../../stack'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/toast',
}

export function Default() {
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

export function Markup() {
  return (
    <Stack>
      <Toast variant="informational">Short message</Toast>
      <Toast variant="informational">
        Short message
        <Button variant="tertiary">Label</Button>
      </Toast>
      <Toast variant="informational">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="informational">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Button variant="tertiary">Label</Button>
      </Toast>

      <Toast variant="success">Short message</Toast>
      <Toast variant="success">
        Short message
        <Button variant="tertiary">Label</Button>
      </Toast>
      <Toast variant="success">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="success">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Button variant="tertiary">Label</Button>
      </Toast>

      <Toast variant="warning">Short message</Toast>
      <Toast variant="warning">
        Short message
        <Button variant="tertiary">Label</Button>
      </Toast>
      <Toast variant="warning">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="warning">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Button variant="tertiary">Label</Button>
      </Toast>

      <Toast variant="critical">Short message</Toast>
      <Toast variant="critical">
        Short message
        <Button variant="tertiary">Label</Button>
      </Toast>
      <Toast variant="critical">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="critical">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Button variant="tertiary">Label</Button>
      </Toast>
    </Stack>
  )
}
