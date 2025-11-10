import { Button, Stack, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <Button onClick={() => toast.informational('Informational toast')}>
        Informational
      </Button>
      <Button onClick={() => toast.success('Success toast')}>Success</Button>
      <Button onClick={() => toast.critical('Critical toast')}>Critical</Button>
      <Button onClick={() => toast.warning('Warning toast')}>Warning</Button>
      <Button onClick={() => toast.loading('Loading toast')}>Loading</Button>
      <ToastStack />
    </Stack>
  )
}
