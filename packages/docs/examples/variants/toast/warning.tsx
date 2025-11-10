import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button onClick={() => toast.warning('Warning toast message')}>
        Show Warning Toast
      </Button>
      <ToastStack />
    </>
  )
}
