import type {
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'
import { describe, expect, it, vi } from 'vitest'

import type { AIMessagePart } from '../../types/public'
import { createChatModelAdapterFromTransport } from '../create-chat-model-adapter'
import { createRunObserverHandle, type RunObserver } from '../run-observer'
import type { RuntimeSnapshot, StreamTransport } from '../types'

function textParts(text: string): AIMessagePart[] {
  return [{ type: 'text', text }]
}

function createOptions(signal: AbortSignal): ChatModelRunOptions {
  return {
    messages: [
      {
        id: 'user-1',
        role: 'user',
        content: [{ type: 'text', text: 'hi' }],
        attachments: [],
        createdAt: new Date('2026-01-01T00:00:00Z'),
        metadata: { custom: {} },
      },
    ],
    abortSignal: signal,
    unstable_assistantMessageId: 'asst-1',
    runConfig: {},
    context: {},
  } as unknown as ChatModelRunOptions
}

function createObserver() {
  const observer: RunObserver = {
    onRunStart: vi.fn(),
    onSnapshot: vi.fn(),
    onRunEnd: vi.fn(),
  }
  const handle = createRunObserverHandle()

  handle.current = observer

  return { observer, handle }
}

async function collect(
  gen: AsyncGenerator<ChatModelRunResult, void>
): Promise<ChatModelRunResult[]> {
  const results: ChatModelRunResult[] = []

  for await (const item of gen) results.push(item)

  return results
}

function run(
  transport: StreamTransport,
  handle?: ReturnType<typeof createRunObserverHandle>,
  signal: AbortSignal = new AbortController().signal
) {
  const adapter = createChatModelAdapterFromTransport({ transport }, handle)

  return adapter.run(createOptions(signal)) as AsyncGenerator<
    ChatModelRunResult,
    void
  >
}

describe('createChatModelAdapterFromTransport', () => {
  it('ends in error and keeps the error text when the transport throws', async () => {
    const { observer, handle } = createObserver()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: throws before yielding
      async *run() {
        throw new Error('boom')
      },
    }

    const results = await collect(run(transport, handle))
    const last = results[results.length - 1]

    expect(last.status).toEqual({ type: 'incomplete', reason: 'error' })
    expect(last.content).toEqual([{ type: 'text', text: 'boom' }])
    expect(observer.onRunStart).toHaveBeenCalledWith(
      expect.objectContaining({ runId: 'asst-1', userMessageId: 'user-1' })
    )
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({
        status: 'error',
        error: 'boom',
        cancelled: false,
      })
    )
  })

  it('ends in error when the transport returns status error with errorMessage and no parts', async () => {
    const { observer, handle } = createObserver()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: returns right away
      async *run() {
        return { parts: [], status: 'error', errorMessage: 'bad gateway' }
      },
    }

    const results = await collect(run(transport, handle))
    const last = results[results.length - 1]

    expect(last.status).toEqual({ type: 'incomplete', reason: 'error' })
    expect(last.content).toEqual([{ type: 'text', text: 'bad gateway' }])
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ status: 'error', cancelled: false })
    )
  })

  it('stops pulling from the transport after abort and calls return on the generator', async () => {
    const { observer, handle } = createObserver()
    const controller = new AbortController()
    let finished = false
    const transport: StreamTransport = {
      async *run() {
        try {
          yield { parts: textParts('a'), status: 'streaming' }
          yield { parts: textParts('ab'), status: 'streaming' }
          yield { parts: textParts('abc'), status: 'streaming' }

          return { parts: textParts('abc'), status: 'ready' }
        } finally {
          finished = true
        }
      },
    }
    const gen = run(transport, handle, controller.signal)
    const results: ChatModelRunResult[] = []

    for await (const item of gen) {
      results.push(item)
      controller.abort()
    }

    expect(results).toHaveLength(1)
    expect(finished).toBe(true)
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ cancelled: true, status: 'ready' })
    )
  })

  it('stops even when the transport ignores the abort signal', async () => {
    const { observer, handle } = createObserver()
    const controller = new AbortController()
    let pulled = 0
    const transport: StreamTransport = {
      async *run() {
        while (true) {
          pulled += 1
          yield { parts: textParts('x'.repeat(pulled)), status: 'streaming' }
        }
      },
    }
    const results: ChatModelRunResult[] = []

    for await (const item of run(transport, handle, controller.signal)) {
      results.push(item)
      if (results.length === 2) controller.abort()
    }

    expect(results).toHaveLength(2)
    expect(pulled).toBeLessThanOrEqual(3)
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ cancelled: true })
    )
  })

  it('reports every transport snapshot to the observer but yields no duplicate to the UI', async () => {
    const { observer, handle } = createObserver()
    const transport: StreamTransport = {
      async *run() {
        yield { parts: textParts('same'), status: 'streaming' }
        yield { parts: textParts('same'), status: 'streaming' }

        return { parts: textParts('same'), status: 'ready' }
      },
    }

    const results = await collect(run(transport, handle))

    expect(results).toHaveLength(1)
    expect(observer.onSnapshot).toHaveBeenCalledTimes(3)
  })

  it('passes the debug payload through to the observer', async () => {
    const { observer, handle } = createObserver()
    const snapshot: RuntimeSnapshot = {
      parts: textParts('hi'),
      status: 'streaming',
      debug: { step: 1 },
    }
    const transport: StreamTransport = {
      async *run() {
        yield snapshot

        return { parts: textParts('hi'), status: 'ready' }
      },
    }

    await collect(run(transport, handle))

    expect(observer.onSnapshot).toHaveBeenCalledWith('asst-1', snapshot)
  })

  it('skips observer calls when no observer is attached', async () => {
    const handle = createRunObserverHandle()
    const transport: StreamTransport = {
      async *run() {
        yield { parts: textParts('o'), status: 'streaming' }

        return { parts: textParts('ok'), status: 'ready' }
      },
    }

    const results = await collect(run(transport, handle))

    expect(results).toHaveLength(2)
  })
})
