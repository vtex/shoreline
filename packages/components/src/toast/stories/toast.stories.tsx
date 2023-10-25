import '../../../dist/styles.min.css'
import '../toast.css'
import React from 'react'
import { Toaster } from '../toaster'

import { toast } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/toast',
}

export function Default() {
  return (
    <div>
      <Toaster position="bottom-right" />
      <Stack>
        <button
          onClick={() => {
            toast.informational('Short message from informational')
          }}
        >
          Informational
        </button>
        <button
          onClick={() => {
            toast.success('Short message from success')
          }}
        >
          Success
        </button>
        <button
          onClick={() => {
            toast.critical('Short message from critical')
          }}
        >
          Critical
        </button>
        <button
          onClick={() => {
            toast.warning('Short message from warning')
          }}
        >
          Warning
        </button>
      </Stack>
    </div>
  )
}

export function WithPromises() {
  return (
    <div>
      <Toaster />
      <button
        onClick={() => {
          toast.promise(
            new Promise(function (resolve) {
              setTimeout(resolve, 2000)
            })
          )
        }}
      >
        Create item
      </button>
    </div>
  )
}
