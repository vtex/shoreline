import React, { useState } from 'react'
import { ConfirmationModal } from '../../confirmation-modal'
import { Button } from '../../../button'
import { Text } from '../../../text'
import {
  userEvent,
  within,
  getByText,
  getByTestId,
} from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'components/confirmation-modal/tests',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')

    // Modal is rendered within a portal outside the canvas
    let modal = getByTestId(document.body, 'confirmation-modal')

    // Update modal ref after each action
    async function withModalRefUpdate(action: Promise<any>) {
      await action
      modal = getByTestId(document.body, 'confirmation-modal')
    }

    await withModalRefUpdate(
      userEvent.click(button, {
        delay: 200,
      })
    )
    await expect(modal).toBeVisible()

    const confirmButton = getByText(modal as HTMLElement, 'Confirm')

    await withModalRefUpdate(
      userEvent.click(confirmButton, {
        delay: 200,
      })
    )
    await expect(modal).not.toBeVisible()

    await userEvent.click(button, {
      delay: 200,
    })
    const cancelButton = getByText(modal as HTMLElement, 'Cancel')

    await withModalRefUpdate(
      userEvent.click(cancelButton, {
        delay: 200,
      })
    )
    await expect(modal).not.toBeVisible()

    await userEvent.click(button, {
      delay: 200,
    })
    await withModalRefUpdate(
      userEvent.click(cancelButton, {
        delay: 200,
      })
    )
    await expect(modal).not.toBeVisible()
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function OpenAndClose() {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>Open modal</Button>
      <ConfirmationModal
        data-testid="confirmation-modal"
        open={open}
        onClose={handleClose}
        onConfirm={handleClose}
        onCancel={handleClose}
      >
        <Text variant="body">This is a confirmation modal</Text>
      </ConfirmationModal>
    </>
  )
}
