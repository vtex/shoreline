import '../../../dist/styles.min.css'
import '../toast.css'
import React from 'react'
import { Toaster } from '../toaster'

import { toast } from '../index'
import { Stack } from '../../stack'
import { Toast } from '../toast-markup'
import { Action } from '../../action'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/toast',
}

export function Default() {
  return (
    <div>
      <Toaster position="bottom-right" />
      <Stack>
        <Button
          onClick={() => {
            toast.informational(
              <p>
                This is a note <button>node</button>
              </p>
            )
          }}
        >
          Informational
        </Button>
        <Button
          onClick={() => {
            toast.success('Short message from success')
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            toast.critical('Short message from critical')
          }}
        >
          Critical
        </Button>
        <Button
          onClick={() => {
            toast.warning('Short message from warning')
          }}
        >
          Warning
        </Button>
      </Stack>
    </div>
  )
}

export function WithPromises() {
  return (
    <div>
      <Toaster />
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
        Create item
      </Button>
    </div>
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
