import React, { useState } from 'react'
import { ConfirmationModal } from '../confirmation-modal'
import { Button } from '../../button'
import { Text } from '../../text'
import { LocaleProvider } from '@vtex/shoreline-primitives'

export default {
  title: 'shoreline-components/confirmation-modal',
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-US', 'pt-BR', 'es-AR', 'ja-JP', 'fr-FR', 'th-TH'],
      description:
        'Locale to be used in the modal. It will be used to format the date and time.',
    },
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
  const {
    children = 'This is a confirmation modal',
    messages,
    locale = 'en-US',
  } = props

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <LocaleProvider locale={locale}>
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
        <Text variant="body">{children}</Text>
      </ConfirmationModal>
    </LocaleProvider>
  )
}
