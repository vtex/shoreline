import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import {
  ComboboxInput,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
} from '@vtex/shoreline'
import { useState } from 'react'

import {
  AIComposer,
  AIComposerActions,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerContextItem,
  AIComposerContextItems,
  AIComposerSend,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '../index'
import { useAIComposer } from '../../../hooks/use-ai-composer'
import { useAIStatus } from '../../../hooks/use-ai-status'
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
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
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

// The Shoreline ComboboxItem type omits this Ariakit prop; it is forwarded at runtime.
// It keeps the clicked entry out of the draft.
const KEEP_DRAFT = { setValueOnClick: false }

const SUGGESTIONS = ['Alpha', 'Beta']

/** The PR #1013 panel recipe: a combobox on the input, opened while the draft is empty. */
function PanelComposer(props: { onPick: (text: string) => void }) {
  const { onPick } = props
  const { text, setText } = useAIComposer()
  const { isStreaming } = useAIStatus()
  const [requested, setRequested] = useState(false)
  const open = requested && !text.trim() && !isStreaming

  return (
    <AIComposer>
      <AIComposerField>
        <ComboboxProvider
          open={open}
          setOpen={setRequested}
          value={text}
          setValue={setText}
        >
          <AIComposerInput asChild placeholder="Type a message">
            <ComboboxInput asChild>
              <textarea />
            </ComboboxInput>
          </AIComposerInput>
          <ComboboxPopover>
            {SUGGESTIONS.map((suggestion) => (
              <ComboboxItem
                key={suggestion}
                value={suggestion}
                {...KEEP_DRAFT}
                onClick={() => onPick(suggestion)}
              >
                {suggestion}
              </ComboboxItem>
            ))}
          </ComboboxPopover>
        </ComboboxProvider>
        <AIComposerFooter>
          <AIComposerActions>
            <AIComposerSend />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  )
}

const onPick = fn()

export const ComboboxOnInput: Story = {
  render: () => <PanelComposer onPick={onPick} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByPlaceholderText('Type a message')

    await userEvent.click(input)
    await expect(await page.findByRole('listbox')).toBeInTheDocument()

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(onPick).toHaveBeenCalledWith('Alpha'))

    await userEvent.type(input, 'x')
    await waitFor(() => expect(page.queryByRole('listbox')).toBeNull())
  },
}

export const RemoveContextItem: Story = {
  render: () => {
    function Items() {
      const [items, setItems] = useState(['Order 1042', 'Order 1043'])

      return (
        <AIComposer>
          <AIComposerContextItems>
            {items.map((item) => (
              <AIComposerContextItem
                key={item}
                onRemove={() =>
                  setItems((current) => current.filter((i) => i !== item))
                }
              >
                {item}
              </AIComposerContextItem>
            ))}
          </AIComposerContextItems>
          <AIComposerField>
            <AIComposerInput placeholder="Type a message" />
          </AIComposerField>
        </AIComposer>
      )
    }

    return <Items />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getAllByRole('button', { name: /remove context/i })[0]
    )
    await waitFor(() => expect(canvas.queryByText('Order 1042')).toBeNull())
    await expect(canvas.getByText('Order 1043')).toBeInTheDocument()

    await userEvent.click(
      canvas.getByRole('button', { name: /remove context/i })
    )
    await waitFor(() => expect(canvas.queryByText('Order 1043')).toBeNull())

    const band = canvasElement.querySelector(
      '[data-sl-ai-composer-context-items]'
    )

    await expect(band).not.toBeNull()
    await expect(getComputedStyle(band as Element).display).toBe('none')
  },
}
