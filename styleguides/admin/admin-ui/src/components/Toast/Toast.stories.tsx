import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '../Button'
import { Set } from '../Set'
import { useToaster } from '.'

export default {
  title: 'admin-ui/Toast',
} as Meta

export function Basic() {
  const toaster = useToaster()

  return (
    <Set>
      <Button
        onClick={() =>
          toaster.notify({
            message: 'Info!',
          })
        }
      >
        Notify info
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'success',
            message: 'Succes!',
          })
        }
      >
        Notify success
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'error',
            message: 'Error!',
          })
        }
      >
        Notify error
      </Button>
      <Button
        onClick={() =>
          toaster.notify({
            type: 'warning',
            message: 'Warning!',
          })
        }
      >
        Notify warning
      </Button>
    </Set>
  )
}
