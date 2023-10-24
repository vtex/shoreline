import '../../../dist/styles.min.css'
import '../toast.css'
import React from 'react'
import { Toaster } from 'react-hot-toast'

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
            toast({
              variant: 'informational',
              message: 'Short message',
            })
          }}
        >
          Informational
        </button>
        <button
          onClick={() => {
            toast({
              variant: 'success',
              message: 'Short message',
            })
          }}
        >
          Success
        </button>
        <button
          onClick={() => {
            toast({
              variant: 'critical',
              message: 'Short message',
            })
          }}
        >
          Critical
        </button>
        <button
          onClick={() => {
            toast({
              variant: 'warning',
              message: 'Short message',
            })
          }}
        >
          Warning
        </button>
      </Stack>
    </div>
  )
}

export function Promi() {
  return (
    <div>
      <Toaster />
      <button
        onClick={() => {
          toast({
            variant: 'warning',
            message: 'Short message',
            promise: new Promise(function (resolve) {
              setTimeout(resolve, 1000)
            }),
          })
        }}
      >
        Warning
      </button>
    </div>
  )
}
