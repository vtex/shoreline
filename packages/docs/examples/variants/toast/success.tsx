import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button onClick={() => toast.success('Success toast message')}>
        Show Success Toast
      </Button>
      <ToastStack />
    </>
  )
}
