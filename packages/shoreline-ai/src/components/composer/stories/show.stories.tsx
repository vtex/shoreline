import { expect, userEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { IconSparkle, Text } from '@vtex/shoreline'

import {
  AIComposer,
  AIComposerActions,
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIComposerSkeleton,
} from '../index'
import { ComposerStoryDecorator } from './decorators'

const meta: Meta<typeof AIComposer> = {
  title: 'shoreline-ai/composer',
  component: AIComposer,
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

type Story = StoryObj<typeof AIComposer>

function MockAgentPill() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        height: 32,
        padding: '4px 8px 4px 4px',
        borderRadius: 30,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          color: 'var(--sl-color-purple-8)',
        }}
      >
        <IconSparkle />
      </span>
      <Text variant="body" style={{ fontSize: 14, fontWeight: 500 }}>
        Meu assistente
      </Text>
    </div>
  )
}

async function uploadComposerFiles(canvasElement: HTMLElement) {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByRole('button', { name: /add attachment/i }))

  const fileInputs = document.body.querySelectorAll('input[type="file"]')
  const fileInput = fileInputs.item(fileInputs.length - 1)

  if (!(fileInput instanceof HTMLInputElement)) {
    throw new Error('File input not found after clicking add attachment')
  }

  const csvFile = new File(['name,amount\nfoo,1'], 'criar_budget.csv', {
    type: 'text/csv',
  })

  const pngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
  const binary = atob(pngBase64)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index)
  }

  const imageFile = new File([bytes], 'preview.png', { type: 'image/png' })

  await userEvent.upload(fileInput, [csvFile, imageFile])
}

export const Empty: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
}

/** Send disabled when draft is empty (Chromatic: muted circle + dark arrow). */
export const SendDisabled: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput placeholder="Type a message…" />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
}

export const ReferenceLayout: Story = {
  decorators: [
    (Story) => (
      <ComposerStoryDecorator locale="pt-BR">
        <div style={{ maxWidth: 640, padding: 16 }}>
          <Story />
        </div>
      </ComposerStoryDecorator>
    ),
  ],
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput placeholder="Mensagem para Meu assistente…" />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <MockAgentPill />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
}

export const WithAttachments: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput placeholder="Mensagem para Meu assistente…" />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <MockAgentPill />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
  play: async ({ canvasElement }) => {
    await uploadComposerFiles(canvasElement)

    const canvas = within(canvasElement)

    await expect(canvas.getByText('criar_budget.csv')).toBeInTheDocument()
    await expect(canvas.getByAltText('preview.png')).toBeInTheDocument()
  },
}

export const Loading: Story = {
  render: () => <AIComposer loading />,
}

export const SkeletonOnly: Story = {
  render: () => <AIComposerSkeleton />,
}
