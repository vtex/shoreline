import { useState } from 'react'
import {
  userEvent,
  within,
  getByText,
  getByTestId,
  expect,
  waitFor,
} from '@storybook/test'
import { ConfirmationModal } from '../../../confirmation-modal'
import { Button } from '../../../button'
import { Text } from '../../../text'
import { DrawerProvider } from '../../drawer-provider'
import { DrawerPopover } from '../../drawer-popover'
import { DrawerHeader } from '../../drawer-header'
import { DrawerHeading } from '../../drawer-heading'
import { DrawerDismiss } from '../../drawer-dismiss'
import { DrawerContent } from '../../drawer-content'

export default {
  title: 'components/drawer/tests',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    // DrawerPopover portals outside #storybook-root
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }), {
      delay: 200,
    })

    await waitFor(() =>
      expect(document.body.style.pointerEvents).not.toBe('none')
    )

    const openModalButton = body.getByRole('button', {
      name: 'Open confirmation',
    })
    const modal = getByTestId(document.body, 'confirmation-modal')

    await userEvent.click(openModalButton, { delay: 200 })
    await expect(modal).toBeVisible()

    const confirmButton = getByText(modal, 'Confirm')
    await userEvent.click(confirmButton, { delay: 200 })
    await waitFor(() => expect(modal).not.toBeVisible())

    await userEvent.click(openModalButton, { delay: 200 })
    const cancelButton = getByText(modal, 'Cancel')
    await userEvent.click(cancelButton, { delay: 200 })
    await waitFor(() => expect(modal).not.toBeVisible())
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function ModalInsideDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
      <DrawerProvider open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerPopover size="small">
          <DrawerHeader>
            <DrawerHeading>Drawer Heading</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Button onClick={() => setModalOpen(true)}>
              Open confirmation
            </Button>
            <ConfirmationModal
              data-testid="confirmation-modal"
              open={modalOpen}
              onClose={handleClose}
              onConfirm={handleClose}
              onCancel={handleClose}
            >
              <Text variant="body">This is a confirmation modal</Text>
            </ConfirmationModal>
          </DrawerContent>
        </DrawerPopover>
      </DrawerProvider>
    </>
  )
}
