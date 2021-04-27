import React from 'react'
import { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { Set } from '../Set'
import { useToaster } from '.'

export default {
  title: 'admin-ui/Toast',
} as Meta

export function Basic() {
  const toaster = useToaster()
  // TODO: add option to render on iframe

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
      <Button
        onClick={() =>
          toaster.notify({
            type: 'success',
            message: "I'm customized 😎!",
            csx: {
              background:
                'radial-gradient(ellipse at top, #e66465, transparent),radial-gradient(ellipse at bottom, #4d9f0c, transparent);',
              color: 'white',
              borderRadius: '8px',
              height: '72px',
              padding: '22px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
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
