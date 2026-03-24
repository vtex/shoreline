import {
  Button,
  Popover,
  PopoverDismiss,
  PopoverProvider,
  PopoverTrigger,
  Text,
} from '@vtex/shoreline'

export function DefaultPopover() {
  return (
    <PopoverProvider>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <Popover>
        <Text variant="body">Popover content</Text>
      </Popover>
    </PopoverProvider>
  )
}

export function PopoverWithDismiss() {
  return (
    <PopoverProvider>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <Popover>
        <Text variant="body">Popover with dismiss button</Text>
        <PopoverDismiss>Close</PopoverDismiss>
      </Popover>
    </PopoverProvider>
  )
}

export function PopoverWithPlacement() {
  return (
    <PopoverProvider placement="bottom-start">
      <PopoverTrigger asChild>
        <Button>Bottom Start</Button>
      </PopoverTrigger>
      <Popover>
        <Text variant="body">Placed at bottom-start</Text>
      </Popover>
    </PopoverProvider>
  )
}
