import { useMemo, type ReactNode } from 'react'
import {
  act,
  describe,
  expect,
  it,
  renderHook,
  waitFor,
} from '@vtex/shoreline-test-utils'

import { AIProvider } from '../../../components/provider/ai-provider'
import { useAIThread } from '../../../hooks/use-ai-thread'
import { createMockStreamTransport } from '../../../test-utils'
import type { AIMessage } from '../../../types/public'
import { createRuntimeBuilder } from '../../builder'
import { useRuntime } from '../../use-runtime'

function Wrapper({ children }: { children: ReactNode }) {
  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .transport(createMockStreamTransport({ delayMs: 0 }))
        .build(),
    []
  )
  const runtime = useRuntime(built)

  return <AIProvider runtime={runtime}>{children}</AIProvider>
}

const history: AIMessage[] = [
  {
    id: 'u1',
    role: 'user',
    createdAt: '2026-01-01T00:00:00.000Z',
    parts: [
      { type: 'text', text: 'look' },
      {
        type: 'resource',
        uri: 'https://cdn/report.pdf',
        name: 'report.pdf',
        mimeType: 'application/pdf',
        size: 2048,
      },
    ],
  },
  {
    id: 'a1',
    role: 'assistant',
    createdAt: '2026-01-01T00:00:01.000Z',
    parts: [
      {
        type: 'tool',
        name: 'search',
        args: { q: 'x' },
        status: 'running',
        metadata: { toolCallId: 'c1', extra: 1 },
      },
    ],
  },
]

describe('thread history', () => {
  it('keeps metadata, status and file size once history is in the thread', async () => {
    const { result } = renderHook(() => useAIThread(), { wrapper: Wrapper })

    act(() => result.current.loadMessages(history))

    await waitFor(() => expect(result.current.messages).toHaveLength(2))
    expect(result.current.messages.map((m) => m.parts)).toEqual([
      history[0].parts,
      history[1].parts,
    ])
  })

  it('does not duplicate a message when history is loaded and then a run adds one', async () => {
    const { result } = renderHook(() => useAIThread(), { wrapper: Wrapper })

    act(() => result.current.loadMessages(history))
    await waitFor(() => expect(result.current.messages).toHaveLength(2))

    act(() => result.current.sendMessage({ text: 'next' }))

    await waitFor(() => expect(result.current.messages).toHaveLength(4))
    await waitFor(() => {
      const last = result.current.messages.at(-1)

      expect(last?.parts.some((p) => p.type === 'text')).toBe(true)
    })

    const ids = result.current.messages.map((m) => m.id)

    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.filter((id) => id === 'u1')).toHaveLength(1)
    expect(ids.filter((id) => id === 'a1')).toHaveLength(1)
  })
})
