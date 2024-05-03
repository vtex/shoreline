import { Button, Flex, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  return (
    <Flex>
      <Button onClick={() => toast.informational('Informational')}>
        Informational
      </Button>
      <Button onClick={() => toast.critical('Critical')}>Critical</Button>
      <Button onClick={() => toast.success('Success')}>Success</Button>
      <Button onClick={() => toast.warning('Warning')}>Warning</Button>
      <Button onClick={() => toast.loading('Loading')}>Loading</Button>
      <ToastStack />
    </Flex>
  )
}
