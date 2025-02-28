import { DrawerProvider } from '../drawer-provider'
import { Button } from '../../button'
import { DrawerTrigger } from '../drawer-trigger'
import { DrawerPopover } from '../drawer-popover'
import { DrawerHeading } from '../drawer-heading'
import { DrawerHeader } from '../drawer-header'
import { DrawerContent } from '../drawer-content'
import { DrawerDismiss } from '../drawer-dismiss'
import { DrawerFooter } from '../drawer-footer'

import { Field, FieldDescription } from '../../field'
import { Label } from '../../label'
import { Input } from '../../input'

import './stories.css'

export default {
  title: 'components/drawer',
}

export function PopoverAsChild() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    alert('Submitted... Or did it?')
  }

  const onReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    alert('Reset... Or did it?')
  }

  return (
    <DrawerProvider>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerPopover asChild>
        <form onSubmit={onSubmit} onReset={onReset}>
          <DrawerHeader>
            <DrawerHeading>Drawer Heading</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Field>
              <Label>Test input</Label>
              <Input name="test" />
              <FieldDescription>Short description</FieldDescription>
            </Field>
          </DrawerContent>
          <DrawerFooter>
            <Button size="large" type="reset">
              Clear
            </Button>
            <Button variant="primary" size="large" type="submit">
              Submit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerPopover>
    </DrawerProvider>
  )
}
