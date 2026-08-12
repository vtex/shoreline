import { useState } from 'react'
import {
  userEvent,
  within,
  getByText,
  getByTestId,
  expect,
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
  play: async () => {
    // DrawerPopover portals outside #storybook-root
    const body = within(document.body)

    const openModalButton = body.getByRole('button', {
      name: 'Open confirmation',
    })

    await userEvent.click(openModalButton, { delay: 200 })

    const modal = getByTestId(document.body, 'confirmation-modal')
    await expect(modal).toBeVisible()

    const confirmButton = getByText(modal as HTMLElement, 'Confirm')
    await userEvent.click(confirmButton, { delay: 200 })
    await expect(modal).not.toBeVisible()

    await userEvent.click(openModalButton, { delay: 200 })
    const openModal = getByTestId(document.body, 'confirmation-modal')
    const cancelButton = getByText(openModal as HTMLElement, 'Cancel')
    await userEvent.click(cancelButton, { delay: 200 })
    await expect(
      getByTestId(document.body, 'confirmation-modal')
    ).not.toBeVisible()
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function ModalInsideDrawer() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <DrawerProvider open>
      <DrawerPopover size="small">
        <DrawerHeader>
          <DrawerHeading>Drawer Heading</DrawerHeading>
          <DrawerDismiss />
        </DrawerHeader>
        <DrawerContent>
          <Button onClick={() => setModalOpen(true)}>Open confirmation</Button>
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
  )
}
