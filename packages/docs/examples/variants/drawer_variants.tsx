import {
  Button,
  DrawerContent,
  DrawerDismiss,
  DrawerHeader,
  DrawerHeading,
  DrawerPopover,
  DrawerProvider,
  DrawerTrigger,
  Text,
} from '@vtex/shoreline'

export function SmallDrawer() {
  return (
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
          <Text variant="body">This is a small drawer</Text>
        </DrawerContent>
      </DrawerPopover>
    </DrawerProvider>
  )
}

export function MediumDrawer() {
  return (
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
          <Text variant="body">This is a medium drawer</Text>
        </DrawerContent>
      </DrawerPopover>
    </DrawerProvider>
  )
}
