import { useState } from 'react'
import { DrawerProvider } from '../drawer-provider'
import { Button } from '../../button'

import { DrawerPopover } from '../drawer-popover'
import { DrawerHeading } from '../drawer-heading'
import { DrawerHeader } from '../drawer-header'
import { DrawerContent } from '../drawer-content'
import { Text } from '../../text'
import { DrawerDismiss } from '../drawer-dismiss'
import { DrawerFooter } from '../drawer-footer'

import './stories.css'

export default {
  title: 'components/drawer',
}

export function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen((o) => !o)}>Open</Button>
      <DrawerProvider open={open} onOpenChange={setOpen}>
        <DrawerPopover size="small">
          <DrawerHeader>
            <DrawerHeading>Drawer Heading</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Text variant="body" as="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare egestas sem. Praesent fringilla at lorem sit amet
              ultricies. Vestibulum hendrerit, lorem ac pellentesque auctor,
              neque dui elementum dui, in consequat orci dui sit amet ipsum.
              Suspendisse id posuere eros, sed blandit diam. Suspendisse auctor
              at neque sed elementum. Nunc tempor, mauris sit amet consequat
              tristique, est dui fringilla tortor, in aliquet nibh orci non
              risus. Donec pharetra enim mauris, ac sodales arcu vulputate
              hendrerit. Aenean nec pulvinar eros. Nam felis ex, venenatis id
              lacinia quis, dictum at ipsum. Morbi aliquam leo eget sem
              sollicitudin, vel porttitor mauris pulvinar. Nam ultricies, ante
              et dictum tristique, dui magna cursus sapien, et interdum diam
              odio in erat.
            </Text>
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
