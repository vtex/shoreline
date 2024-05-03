import { IconCaretDownSmall } from '@vtex/shoreline-icons'

import {
  MenuItem,
  MenuProvider,
  MenuSeparator,
  MenuTrigger,
  MenuPopover,
} from '../index'
import { Button } from '../../button'

export default {
  title: 'components/menu/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function FullForm() {
  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>Open</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Item</MenuItem>
        <MenuSeparator />
        <MenuItem>Downloads</MenuItem>
      </MenuPopover>
    </MenuProvider>
  )
}

export function Composition() {
  return (
    <MenuProvider placement="bottom-end">
      <MenuTrigger asChild>
        <Button>
          Open <IconCaretDownSmall />
        </Button>
      </MenuTrigger>
      <MenuPopover asChild>
        <div style={{ border: '5px solid red' }}>
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem asChild>
            <a href="htpps://vtex.com" target="_blank" rel="noreferrer">
              Downloads
            </a>
          </MenuItem>
        </div>
      </MenuPopover>
    </MenuProvider>
  )
}
