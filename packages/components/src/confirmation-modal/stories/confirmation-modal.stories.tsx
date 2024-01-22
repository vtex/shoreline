import React, { useState } from 'react'
import { ConfirmationModal } from '../confirmation-modal'
import { Button } from '../../button'
import { Text } from '../../text'
import { LocaleProvider } from '@vtex/shoreline-primitives'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'shoreline-components/confirmation-modal',
  component: Playground,
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-US', 'pt-BR', 'es-AR', 'ja-JP', 'fr-FR', 'th-TH'],
      description:
        'Locale to be used in the modal. It will be used to format the date and time.',
    },
    content: {
      control: 'text',
      description: 'Content to be displayed in the confirmation modal',
    },
    messages: {
      control: 'object',
      description:
        'Object containing all messages to be displayed in the modal text elements. They include "title", "ok" and "cancel". When using the playground, prefer to edit this property as a JSON.',
    },
  },
  args: {
    locale: 'en-US',
    content: 'This is a confirmation modal',
    messages: {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')

    await userEvent.click(button, {
      delay: 100,
    })

    // Modal is rendered within a portal outside the canvas
    const modal = document.querySelector('[data-testid="confirmation-modal"]')

    await expect(modal).toBeVisible()
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

interface StoryArgs {
  locale: 'en-US' | 'pt-BR' | 'es-AR' | 'ja-JP' | 'fr-FR' | 'th-TH'
  messages: Record<string, string>
  content: string
}

export function Playground(args: StoryArgs) {
  const { content, messages, locale } = args

  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <LocaleProvider locale={locale}>
      <Button onClick={() => setOpen((open) => !open)}>Open modal</Button>
      <ConfirmationModal
        data-testid="confirmation-modal"
        open={open}
        onClose={handleClose}
        onConfirm={handleClose}
        onCancel={handleClose}
        messages={messages}
      >
        <Text variant="body">{content}</Text>
      </ConfirmationModal>
    </LocaleProvider>
  )
}
