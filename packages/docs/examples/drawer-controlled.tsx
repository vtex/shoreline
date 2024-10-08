import {
  DrawerProvider,
  Button,
  DrawerPopover,
  DrawerHeader,
  DrawerHeading,
  DrawerDismiss,
  DrawerContent,
  DrawerFooter,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'
import { useState } from 'react'

export default function Example() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function someServerAction() {
    if (open) {
      setOpen(false)

      return
    }

    setLoading(true)

    // This promise simulates a call to an API.
    // Using the controlled apporach of the Drawer
    // is particullary useful in programmatic dispatch scenarios.
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })

    setLoading(false)
    setOpen(true)
  }

  return (
    <>
      <Button loading={loading} onClick={someServerAction}>
        Some action
      </Button>
      <DrawerProvider open={open} onOpenChange={setOpen}>
        <DrawerPopover>
          <DrawerHeader>
            <DrawerHeading>Controlled Drawer</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <DecorativeBox height="32rem" color="blue" />
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
    </>
  )
}
