import type { Meta, StoryObj } from '@storybook/react'

import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

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
