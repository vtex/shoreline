import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '../Button'
import { Set } from '../Set'
import { useToast } from '.'

export default {
  title: 'admin-ui/Toast',
} as Meta

export function Basic() {
  const toast = useToast()

  return (
    <Set>
      <Button
        onClick={() =>
          toast.notify({
            message: 'Info!',
          })
        }
      >
        Notify info
      </Button>
      <Button
        onClick={() =>
          toast.notify({
            type: 'success',
            message: 'Succes!',
          })
        }
      >
        Notify success
      </Button>
      <Button
        onClick={() =>
          toast.notify({
            type: 'error',
            message: 'Error!',
          })
        }
      >
        Notify error
      </Button>
      <Button
        onClick={() =>
          toast.notify({
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
