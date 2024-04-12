import React, { useState } from 'react'
import { Button, ConfirmationModal, Text } from '@vtex/shoreline'

export default function Example() {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((o) => !o)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={toggle}>Open modal</Button>
      <ConfirmationModal
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
