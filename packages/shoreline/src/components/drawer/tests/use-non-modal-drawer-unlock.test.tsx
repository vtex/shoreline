import { useState } from 'react'
import {
  afterEach,
  describe,
  expect,
  it,
  render,
  fireEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { DrawerProvider } from '../drawer-provider'
import { DrawerPopover } from '../drawer-popover'
import { DrawerContent } from '../drawer-content'
import { DrawerHeader } from '../drawer-header'
import { DrawerHeading } from '../drawer-heading'

function DrawerShell({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <DrawerProvider open={open} onOpenChange={onOpenChange}>
      <DrawerPopover size="small">
        <DrawerHeader>
          <DrawerHeading>Drawer Heading</DrawerHeading>
        </DrawerHeader>
        <DrawerContent>Drawer content</DrawerContent>
      </DrawerPopover>
    </DrawerProvider>
  )
}

function ControlledDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open drawer
      </button>
      <DrawerShell open={open} onOpenChange={setOpen} />
    </>
  )
}

describe('useNonModalDrawerUnlock', () => {
  afterEach(() => {
    document.body.style.pointerEvents = ''
  })

  it('unlocks body pointer-events after a controlled open flip', async () => {
    const { getByRole } = render(<ControlledDrawer />)

    fireEvent.click(getByRole('button', { name: 'Open drawer' }))

    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none')
    })
  })

  it('clears body pointer-events written by the unlock on close', async () => {
    const { rerender } = render(<DrawerShell open={false} />)

    rerender(<DrawerShell open />)
    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none')
    })

    rerender(<DrawerShell open={false} />)
    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('auto')
    })
  })
})
