import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button onClick={() => toast.loading('Loading toast message')}>
        Show Loading Toast
      </Button>
      <ToastStack />
    </>
  )
}
