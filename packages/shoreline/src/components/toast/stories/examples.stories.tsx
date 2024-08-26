import { Button } from '../../button'
import { Stack } from '../../stack'
import { ToastStack, toast } from '../index'

export default {
  title: 'components/toast',
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
            new Promise((resolve) => {
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
      <Button
        onClick={() => {
          toast.dismiss()
        }}
      >
        Cleanup all
      </Button>
      <Button
        onClick={() => {
          const id = toast.loading('Loading...')
          setTimeout(() => toast.dismiss(id), 2000)
        }}
      >
        Cleanup loading toast after 2 seconds!
      </Button>
    </Stack>
  )
}
