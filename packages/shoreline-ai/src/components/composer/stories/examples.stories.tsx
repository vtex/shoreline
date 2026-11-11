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
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '../index'
import { useAIComposer } from '../../../hooks/use-ai-composer'
import { useAIStatus } from '../../../hooks/use-ai-status'
import { useAIThread } from '../../../hooks/use-ai-thread'
import { ComposerStoryDecorator } from './decorators'

const meta: Meta = {
  title: 'shoreline-ai/composer',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <ComposerStoryDecorator locale="pt-BR">
        <div style={{ maxWidth: 720, padding: 24 }}>
          <Story />
        </div>
      </ComposerStoryDecorator>
    ),
  ],
}

export default meta

type Story = StoryObj

export const WorkspaceLayout: Story = {
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

// The Shoreline ComboboxItem type omits this Ariakit prop; it is forwarded at runtime.
// It keeps the clicked entry out of the draft.
const KEEP_DRAFT = { setValueOnClick: false }

const HISTORY = [
  'Qual o status dos pedidos de hoje?',
  'Resuma as vendas da semana',
]
const SUGGESTED = ['Quais produtos estão com estoque baixo?']

/** Leaf component: only it re-renders on each keystroke, not the composer shell. */
function HistoryAndSuggestionsInput() {
  const { text, setText } = useAIComposer()
  const { isStreaming } = useAIStatus()
  const { sendMessage } = useAIThread()
  const [requested, setRequested] = useState(false)
  const open = requested && !text.trim() && !isStreaming

  return (
    <ComboboxProvider
      open={open}
      setOpen={setRequested}
      value={text}
      setValue={setText}
    >
      <AIComposerInput asChild placeholder="Mensagem para Meu assistente…">
        <ComboboxInput asChild>
          <textarea />
        </ComboboxInput>
      </AIComposerInput>
      <ComboboxPopover>
        {[...HISTORY, ...SUGGESTED].map((entry) => (
          <ComboboxItem
            key={entry}
            value={entry}
            {...KEEP_DRAFT}
            onClick={() => sendMessage({ text: entry })}
          >
            {entry}
          </ComboboxItem>
        ))}
      </ComboboxPopover>
    </ComboboxProvider>
  )
}

/** History and suggestions panel built by the app, as in admin-platform PR #1013. */
export const HistoryAndSuggestions: Story = {
  render: () => (
    <AIComposer>
      <AIComposerField>
        <HistoryAndSuggestionsInput />
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
