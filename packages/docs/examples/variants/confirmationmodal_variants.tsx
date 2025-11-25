import { useState } from 'react'
import { Button, ConfirmationModal, Text } from '@vtex/shoreline'

export function DefaultConfirmationModal() {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Confirmation Modal</Button>
      <ConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={handleClose}
        onCancel={handleClose}
      >
        <Text variant="body">Are you sure you want to proceed?</Text>
      </ConfirmationModal>
    </>
  )
}

export function ConfirmationModalWithCustomText() {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Custom Confirmation Modal
      </Button>
      <ConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={handleClose}
        onCancel={handleClose}
      >
        <Text variant="body">
          This action cannot be undone. Are you absolutely sure you want to
          delete this item?
        </Text>
      </ConfirmationModal>
    </>
  )
}
