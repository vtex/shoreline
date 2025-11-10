import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button onClick={() => toast.critical('Critical toast message')}>
        Show Critical Toast
      </Button>
      <ToastStack />
    </>
  )
}
