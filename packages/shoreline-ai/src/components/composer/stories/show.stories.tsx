import { expect, userEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import type { ReactNode } from 'react'

import {
  AIComposer,
  AIComposerActions,
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerContextItem,
  AIComposerContextItems,
  AIComposerField,
  AIComposerFooter,
  AIComposerHeader,
  AIComposerInput,
  AIComposerSkeleton,
  type AIComposerLayout,
} from '../index'
import { MockRuntimeProvider } from '../../../test-utils'
import { StoryAgentPill } from './agent-pill'
import { InitiativeCard } from './initiative-card'
import type { StreamTransport } from '../../../runtime/types'
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
    <AIComposer messages={{ placeholder: 'Message VTEX My Assistant...' }}>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <StoryAgentPill />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
}

export const WithAttachments: Story = {
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
  render: () => (
    <AIComposer messages={{ placeholder: 'Message VTEX My Assistant...' }}>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <StoryAgentPill />
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

const PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

/** Adds eight files (images and documents), more than one row holds. */
async function uploadManyFiles(canvasElement: HTMLElement) {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByRole('button', { name: /add attachment/i }))

  const fileInputs = document.body.querySelectorAll('input[type="file"]')
  const fileInput = fileInputs.item(fileInputs.length - 1)

  if (!(fileInput instanceof HTMLInputElement)) {
    throw new Error('File input not found after clicking add attachment')
  }

  const binary = atob(PNG_BASE64)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index)
  }

  const image = (name: string) => new File([bytes], name, { type: 'image/png' })

  await userEvent.upload(fileInput, [
    image('preview.png'),
    new File(['%PDF-1.4'], 'relatorio_vendas_outubro.pdf', {
      type: 'application/pdf',
    }),
    image('banner.png'),
    new File(['docx'], 'estoque_parado.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }),
    image('capa.png'),
    new File(['name,amount\nfoo,1'], 'criar_budget.csv', { type: 'text/csv' }),
    image('detalhe.png'),
    new File(['text'], 'notas.txt', { type: 'text/plain' }),
  ])
}

/** More attachments than one row holds: the rest collapse into the "+N" button. */
export const ManyAttachments: Story = {
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
  render: () => (
    <AIComposer messages={{ placeholder: 'Message VTEX My Assistant...' }}>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          <StoryAgentPill />
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  ),
  play: async ({ canvasElement }) => {
    await uploadManyFiles(canvasElement)

    const canvas = within(canvasElement)

    await expect(
      await canvas.findByRole('button', { name: /show all attachments/i })
    ).toHaveAttribute('aria-expanded', 'false')
  },
}

/** The "+N" button opened: every attachment shows and the button reads "Less". */
export const ManyAttachmentsExpanded: Story = {
  // Deferred to the component review (see shoreline-ai-ci-readiness spec)
  tags: ['skip-test'],
  render: ManyAttachments.render,
  play: async ({ canvasElement }) => {
    await uploadManyFiles(canvasElement)

    const canvas = within(canvasElement)

    await userEvent.click(
      await canvas.findByRole('button', { name: /show all attachments/i })
    )
    await expect(canvas.getByRole('button', { name: 'Less' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  },
}

export const Loading: Story = {
  render: () => <AIComposer loading />,
}

export const SkeletonOnly: Story = {
  render: () => <AIComposerSkeleton />,
}

/** Holds the run open, so the composer keeps showing the stop button. */
const holdingTransport: StreamTransport = {
  async *run() {
    await new Promise<never>(() => {})

    return { parts: [], status: 'ready' }
  },
}

function LayoutComposer(props: {
  layout: AIComposerLayout
  placeholder?: string
  agent?: 'name' | 'compact'
  contextItems?: ReactNode
  children?: ReactNode
}) {
  const { layout, placeholder, agent, contextItems, children } = props

  return (
    <AIComposer
      layout={layout}
      messages={placeholder ? { placeholder } : undefined}
    >
      {contextItems}
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          {agent ? <StoryAgentPill compact={agent === 'compact'} /> : null}
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
      {children}
    </AIComposer>
  )
}

async function typeDraft(canvasElement: HTMLElement, text: string) {
  const input = within(canvasElement).getByRole('textbox')

  await userEvent.type(input, text)
}

/** Design "enviando": a run is active, so the stop button shows. */
export const StackedStreaming: Story = {
  decorators: [
    (Story) => (
      <MockRuntimeProvider transport={holdingTransport}>
        <Story />
      </MockRuntimeProvider>
    ),
  ],
  render: () => (
    <LayoutComposer layout="stacked" placeholder="Type a message..." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await typeDraft(canvasElement, 'Hi')
    await userEvent.click(canvas.getByRole('button', { name: /send/i }))
    await canvas.findByRole('button', { name: /stop/i })
    await typeDraft(canvasElement, 'Analyzing your store data...')
  },
}

/** Design "com anexos": chips above the text. */
export const StackedWithAttachments: Story = {
  tags: ['skip-test'],
  render: () => (
    <LayoutComposer layout="stacked" placeholder="Type a message..." />
  ),
  play: async ({ canvasElement }) => {
    await uploadComposerFiles(canvasElement)
    await typeDraft(canvasElement, 'Here are the files')
  },
}

/** Design "compacta": one row. */
export const Inline: Story = {
  render: () => (
    <LayoutComposer layout="inline" placeholder="Quick message..." />
  ),
}

/** Design "com agente" and "ações na mesma linha": the pill shows only its avatar. */
export const InlineWithAgent: Story = {
  render: () => (
    <LayoutComposer
      layout="inline"
      placeholder="Message VTEX My Assistant..."
      agent="compact"
    />
  ),
}

/** Design "ações abaixo do texto": the layout the package had before. */
export const StackedWithAgent: Story = {
  render: () => (
    <LayoutComposer
      layout="stacked"
      placeholder="Message VTEX My Assistant..."
      agent="name"
    />
  ),
}

/** Design "com contexto": removable items above the pill. */
export const StackedWithContext: Story = {
  render: () => (
    <LayoutComposer
      layout="stacked"
      placeholder="Message Search Optimizer..."
      agent="name"
      contextItems={
        <AIComposerHeader>
          <AIComposerContextItems>
            <AIComposerContextItem onRemove={() => {}}>
              Post-Checkout Order Finalization Is Failingetail Pages are
              showcasing Low-Quality Content
            </AIComposerContextItem>
            <AIComposerContextItem onRemove={() => {}}>
              High-Demand Products are at Risk of Stockoutshowcasing Low-Quality
              Content
            </AIComposerContextItem>
          </AIComposerContextItems>
        </AIComposerHeader>
      }
    />
  ),
}

/** An app card inside the neutral header: it draws its own surface and clears the pill. */
export const StackedWithHeaderCard: Story = {
  render: () => (
    <LayoutComposer
      layout="stacked"
      placeholder="Message VTEX My Assistant..."
      agent="name"
      contextItems={
        <AIComposerHeader>
          <InitiativeCard defaultOpen />
        </AIComposerHeader>
      }
    />
  ),
}

export const LoadingInline: Story = {
  render: () => <AIComposer loading layout="inline" />,
}
