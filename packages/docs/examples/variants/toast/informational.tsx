import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <>
      <Button
        onClick={() => toast.informational('Informational toast message')}
      >
        Show Informational Toast
      </Button>
      <ToastStack />
    </>
  )
}
