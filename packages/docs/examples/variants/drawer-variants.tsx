import {
  DrawerProvider,
  DrawerTrigger,
  Button,
  DrawerPopover,
  DrawerHeader,
  DrawerHeading,
  DrawerDismiss,
  DrawerContent,
  Text,
  Stack,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <DrawerProvider>
        <DrawerTrigger asChild>
          <Button>Open Small Drawer</Button>
        </DrawerTrigger>
        <DrawerPopover size="small">
          <DrawerHeader>
            <DrawerHeading>Small Drawer</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Text>This is a small drawer</Text>
          </DrawerContent>
        </DrawerPopover>
      </DrawerProvider>

      <DrawerProvider>
        <DrawerTrigger asChild>
          <Button>Open Medium Drawer</Button>
        </DrawerTrigger>
        <DrawerPopover size="medium">
          <DrawerHeader>
            <DrawerHeading>Medium Drawer</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Text>This is a medium drawer</Text>
          </DrawerContent>
        </DrawerPopover>
      </DrawerProvider>
    </Stack>
  )
}
