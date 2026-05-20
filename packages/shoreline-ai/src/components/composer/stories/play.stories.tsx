import { expect, userEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import {
  AIComposer,
  AIComposerActions,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerSend,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '../index'
import { ComposerStoryDecorator } from './decorators'

const meta: Meta = {
  title: 'shoreline-ai/composer',
  decorators: [
    (Story) => (
      <ComposerStoryDecorator>
        <div style={{ maxWidth: 640, padding: 16 }}>
          <Story />
        </div>
      </ComposerStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj

export const TypeAndSend: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput placeholder="Type a message" />
        <AIComposerFooter>
          <AIComposerActions>
            <AIComposerSend />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type a message')

    await userEvent.type(input, 'Hello Shoreline')
    await expect(input).toHaveValue('Hello Shoreline')
  },
}

export const AddAttachment: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput placeholder="Type a message" />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <AIComposerActions>
            <AIComposerSend />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const field = canvasElement.querySelector('[data-sl-ai-composer-field]')

    if (!field) {
      throw new Error('Composer field not found')
    }

    const addButton = canvas.getByRole('button', { name: /add attachment/i })

    await userEvent.click(addButton)

    const fileInputs = document.body.querySelectorAll('input[type="file"]')
    const fileInput = fileInputs.item(fileInputs.length - 1)

    if (!(fileInput instanceof HTMLInputElement)) {
      throw new Error('File input not found after clicking add attachment')
    }

    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' })

    await userEvent.upload(fileInput, file)

    await expect(canvas.getByText('notes.txt')).toBeInTheDocument()
    expect(field.contains(canvas.getByText('notes.txt'))).toBe(true)
  },
}
