import React, { useState } from 'react'
import { ConfirmationModal } from '../confirmation-modal'
import { Button } from '../../button'
import { Text } from '../../text'

export default {
  title: 'shoreline-components/confirmation-modal',
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed in the confirmation modal',
    },
    messages: {
      control: 'object',
      description:
        'Object containing all messages to be displayed in the modal text elements. They include "title", "ok" and "cancel". When using the playground, prefer to edit this property as a JSON.',
    },
  },
}

export function Default(props) {
  const { children = 'This is a confirmation modal', messages } = props
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>
        Open confirmation modal
      </Button>
      <ConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={handleClose}
        onCancel={handleClose}
        messages={messages}
      >
        <Text>{children}</Text>
      </ConfirmationModal>
    </>
  )
}
