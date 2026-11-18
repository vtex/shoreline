import type { Meta, StoryObj } from '@storybook/react'
import { Flex, Text } from '@vtex/shoreline'

import '@vtex/shoreline-ai/css'

import type { AIStreamDebugRun } from '../types'
import {
  AIStreamDebugPanel,
  AIStreamDebugRunView,
} from '../ai-stream-debug-panel'
import { DebugStoryDecorator } from './decorators'

const meta: Meta<typeof AIStreamDebugRunView> = {
  title: 'shoreline-ai/stream-debug',
  component: AIStreamDebugRunView,
}

export default meta

type Story = StoryObj<typeof AIStreamDebugRunView>

const BASE = {
  threadId: 'thread-1',
  userMessageId: 'user-1',
  startedAt: '2026-01-01T10:00:00.000Z',
}

const COMPLETED: AIStreamDebugRun = {
  ...BASE,
  runId: 'run-completed',
  endedAt: '2026-01-01T10:00:02.500Z',
  status: 'ready',
  steps: [
    {
      index: 1,
      at: '2026-01-01T10:00:00.120Z',
      status: 'streaming',
      snapshot: {
        parts: [{ type: 'reasoning', text: 'Reading', status: 'streaming' }],
        status: 'streaming',
        debug: { event: 'reasoning', seq: 1 },
      },
    },
    {
      index: 2,
      at: '2026-01-01T10:00:01.000Z',
      status: 'streaming',
      snapshot: {
        parts: [
          { type: 'reasoning', text: 'Reading the order', status: 'complete' },
          { type: 'text', text: 'Hello' },
        ],
        status: 'streaming',
      },
    },
    {
      index: 3,
      at: '2026-01-01T10:00:02.400Z',
      status: 'ready',
      snapshot: {
        parts: [
          { type: 'reasoning', text: 'Reading the order', status: 'complete' },
          { type: 'text', text: 'Hello there' },
        ],
        status: 'ready',
      },
    },
  ],
}

const WITH_UNKNOWN_SHAPE: AIStreamDebugRun = {
  ...BASE,
  runId: 'run-unknown',
  endedAt: '2026-01-01T10:00:03.000Z',
  status: 'ready',
  steps: [
    {
      index: 1,
      at: '2026-01-01T10:00:01.000Z',
      status: 'streaming',
      snapshot: {
        parts: [
          {
            type: 'tool',
            name: 'search_orders',
            args: { status: 'invoiced' },
            output: { total: 3 },
            status: 'complete',
          },
          { type: 'a-future-part', payload: { anything: true } },
        ],
        status: 'streaming',
      },
    },
  ],
}

const FAILED: AIStreamDebugRun = {
  ...BASE,
  runId: 'run-failed',
  endedAt: '2026-01-01T10:00:00.300Z',
  status: 'error',
  error: 'The server closed the connection.',
  steps: [],
}

const RUNNING: AIStreamDebugRun = {
  ...BASE,
  runId: 'run-running',
  status: 'streaming',
  steps: [
    {
      index: 1,
      at: '2026-01-01T10:00:00.200Z',
      status: 'streaming',
      snapshot: { parts: [{ type: 'text', text: 'Hel' }], status: 'streaming' },
    },
  ],
}

function Variant(props: { label: string; run: AIStreamDebugRun }) {
  return (
    <Flex direction="column" gap="$space-2">
      <Text variant="emphasis">{props.label}</Text>
      <AIStreamDebugRunView run={props.run} />
    </Flex>
  )
}

export const RunStates: Story = {
  render: () => (
    <Flex direction="column" gap="$space-6" style={{ maxWidth: 640 }}>
      <Variant label="Completed" run={COMPLETED} />
      <Variant label="Any part shape" run={WITH_UNKNOWN_SHAPE} />
      <Variant label="Failed" run={FAILED} />
      <Variant label="Running" run={RUNNING} />
    </Flex>
  ),
}

export const PanelStates: Story = {
  render: () => (
    <Flex direction="column" gap="$space-6">
      <DebugStoryDecorator debugStream={false}>
        <AIStreamDebugPanel title="Debug off" />
      </DebugStoryDecorator>
      <DebugStoryDecorator>
        <AIStreamDebugPanel title="No runs yet" />
      </DebugStoryDecorator>
    </Flex>
  ),
}
