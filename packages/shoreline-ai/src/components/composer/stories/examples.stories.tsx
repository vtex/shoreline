import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline-ai/css'

import {
  ComboboxInput,
  ComboboxProvider,
  IconCounterClockwise,
  IconSparkle,
} from '@vtex/shoreline'
import { type RefObject, useRef, useState } from 'react'

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
import { StoryPanel, type StoryPanelSection } from './panel'

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

const SECTIONS: StoryPanelSection[] = [
  {
    title: 'Últimos prompts',
    icon: IconCounterClockwise,
    entries: [
      'Qual o status dos pedidos de hoje?',
      'Resuma as vendas da semana',
    ],
  },
  {
    title: 'Sugestões',
    icon: IconSparkle,
    entries: ['Quais produtos estão com estoque baixo?'],
  },
]

/** Leaf component: only it re-renders on each keystroke, not the composer shell. */
function HistoryAndSuggestionsInput(props: {
  fieldRef: RefObject<HTMLDivElement>
}) {
  const { fieldRef } = props
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
      <StoryPanel
        fieldRef={fieldRef}
        sections={SECTIONS}
        onPick={(entry) => sendMessage({ text: entry })}
      />
    </ComboboxProvider>
  )
}

/** History and suggestions panel built by the app, as in admin-platform PR #1013. */
export const HistoryAndSuggestions: Story = {
  render: () => <HistoryAndSuggestionsComposer />,
}

function HistoryAndSuggestionsComposer() {
  const fieldRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ paddingTop: 280 }}>
      <AIComposer>
        <AIComposerField ref={fieldRef}>
          <HistoryAndSuggestionsInput fieldRef={fieldRef} />
          <AIComposerFooter>
            <AIComposerAddAttachment />
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </div>
  )
}
