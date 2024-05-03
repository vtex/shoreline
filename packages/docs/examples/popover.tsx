import { Popover, PopoverProvider, PopoverTrigger } from '@vtex/shoreline'

export default function Example() {
  return (
    <PopoverProvider>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <Popover>Content</Popover>
    </PopoverProvider>
  )
}
