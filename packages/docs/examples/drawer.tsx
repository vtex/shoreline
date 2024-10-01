import {
  DrawerProvider,
  DrawerTrigger,
  Button,
  DrawerPopover,
  DrawerHeader,
  DrawerHeading,
  DrawerDismiss,
  DrawerContent,
  DrawerFooter,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <DrawerProvider>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerPopover>
        <DrawerHeader>
          <DrawerHeading>Drawer Heading</DrawerHeading>
          <DrawerDismiss />
        </DrawerHeader>
        <DrawerContent>
          <DecorativeBox height="20rem" color="blue" />
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => null} size="large">
            Label
          </Button>
          <Button variant="primary" onClick={() => null} size="large">
            Label
          </Button>
        </DrawerFooter>
      </DrawerPopover>
    </DrawerProvider>
  )
}
