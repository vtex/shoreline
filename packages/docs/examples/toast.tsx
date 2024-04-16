import React from 'react'
import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button onClick={() => toast.informational('Short message')}>
        Show toast
      </Button>
      <ToastStack />
    </>
  )
}
