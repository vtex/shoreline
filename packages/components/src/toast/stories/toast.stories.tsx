import React from 'react'

import { ToastStack, toast } from '../index'
import { Toast } from '../toast'
import { Stack } from '../../stack'
import { Action } from '../../action'
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
          toast.informational('Message!')
        }}
      >
        Informational
      </Button>
      <Button
        onClick={() => {
          toast.success('Message!')
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toast.warning('Message!')
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toast.critical('Message!')
        }}
      >
        Critical
      </Button>
      <Button
        onClick={() => {
          toast.loading('Message!')
        }}
      >
        Loading
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
        <Action>Label</Action>
      </Toast>
      <Toast variant="informational" loading>
        Short message
      </Toast>
      <Toast variant="informational">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="informational">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Action>Label</Action>
      </Toast>

      <Toast variant="success">Short message</Toast>
      <Toast variant="success">
        Short message
        <Action>Label</Action>
      </Toast>
      <Toast variant="success" loading>
        Short message
      </Toast>
      <Toast variant="success">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="success">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Action>Label</Action>
      </Toast>

      <Toast variant="warning">Short message</Toast>
      <Toast variant="warning">
        Short message
        <Action>Label</Action>
      </Toast>
      <Toast variant="warning" loading>
        Short message
      </Toast>
      <Toast variant="warning">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="warning">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Action>Label</Action>
      </Toast>

      <Toast variant="critical">Short message</Toast>
      <Toast variant="critical">
        Short message
        <Action>Label</Action>
      </Toast>
      <Toast variant="critical" loading>
        Short message
      </Toast>
      <Toast variant="critical">
        This is a long alert message to illustrate this scenario in the
        component specs.
      </Toast>
      <Toast variant="critical">
        This is a long alert message to illustrate this scenario in the
        component specs.
        <Action>Label</Action>
      </Toast>
    </Stack>
  )
}
