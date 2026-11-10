import type {
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'
import { describe, expect, it, vi } from 'vitest'

import type { AIMessagePart } from '../../types/public'
import { createChatModelAdapterFromTransport } from '../create-chat-model-adapter'
import type { RunObserver } from '../run-observer'
import { createRuntimeChannel, type RuntimeChannel } from '../runtime-core'
import type { RuntimeSnapshot, StreamTransport } from '../types'

function textParts(text: string): AIMessagePart[] {
  return [{ type: 'text', text }]
}

function createOptions(
  signal: AbortSignal,
  assistantMessageId: string | null = 'asst-1'
): ChatModelRunOptions {
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
    unstable_assistantMessageId: assistantMessageId ?? undefined,
    runConfig: {},
    context: {},
  } as unknown as ChatModelRunOptions
}

/** A channel whose provider puts every run in the thread `conv-1`. */
function createChannel(): RuntimeChannel {
  const channel = createRuntimeChannel()

  channel.threadIdResolver.current = () => 'conv-1'

  return channel
}

function createObserver() {
  const observer: RunObserver = {
    onRunStart: vi.fn(),
    onSnapshot: vi.fn(),
    onRunEnd: vi.fn(),
  }
  const channel = createChannel()

  channel.observers.add(observer)

  return { observer, channel }
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
  channel: RuntimeChannel = createChannel(),
  signal: AbortSignal = new AbortController().signal
) {
  const adapter = createChatModelAdapterFromTransport({ transport }, channel)

  return adapter.run(createOptions(signal)) as AsyncGenerator<
    ChatModelRunResult,
    void
  >
}

describe('createChatModelAdapterFromTransport', () => {
  it('ends in error and keeps the error text when the transport throws', async () => {
    const { observer, channel } = createObserver()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: throws before yielding
      async *run() {
        throw new Error('boom')
      },
    }

    const results = await collect(run(transport, channel))
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
    const { observer, channel } = createObserver()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: returns right away
      async *run() {
        return { parts: [], status: 'error', errorMessage: 'bad gateway' }
      },
    }

    const results = await collect(run(transport, channel))
    const last = results[results.length - 1]

    expect(last.status).toEqual({ type: 'incomplete', reason: 'error' })
    expect(last.content).toEqual([{ type: 'text', text: 'bad gateway' }])
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ status: 'error', cancelled: false })
    )
  })

  it('stops pulling from the transport after abort and calls return on the generator', async () => {
    const { observer, channel } = createObserver()
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
    const gen = run(transport, channel, controller.signal)
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
    const { observer, channel } = createObserver()
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

    for await (const item of run(transport, channel, controller.signal)) {
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

  it('ends right away as cancelled when a stuck transport ignores the abort', async () => {
    const { observer, channel } = createObserver()
    const controller = new AbortController()
    const transport: StreamTransport = {
      async *run() {
        await new Promise(() => {})

        return { parts: [], status: 'ready' }
      },
    }
    const results: ChatModelRunResult[] = []
    const done = (async () => {
      for await (const item of run(transport, channel, controller.signal)) {
        results.push(item)
      }
    })()

    await Promise.resolve()
    controller.abort()
    await done

    expect(results).toHaveLength(0)
    expect(observer.onRunEnd).toHaveBeenCalledTimes(1)
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ cancelled: true, status: 'ready' })
    )
  })

  it('reports cancelled, not error, when the transport throws after the abort', async () => {
    const { observer, channel } = createObserver()
    const controller = new AbortController()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: throws before yielding
      async *run() {
        controller.abort()
        throw new Error('late failure')
      },
    }

    const results = await collect(run(transport, channel, controller.signal))

    expect(results).toHaveLength(0)
    expect(observer.onRunEnd).toHaveBeenCalledTimes(1)
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ cancelled: true, status: 'ready' })
    )
    expect(observer.onRunEnd).not.toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ status: 'error' })
    )
  })

  it('uses a different run id for each run without an assistant message id', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))

    try {
      const { observer, channel } = createObserver()
      const transport: StreamTransport = {
        // biome-ignore lint/correctness/useYield: returns right away
        async *run() {
          return { parts: textParts('ok'), status: 'ready' }
        },
      }
      const adapter = createChatModelAdapterFromTransport(
        { transport },
        channel
      )
      const signal = new AbortController().signal

      await collect(
        adapter.run(createOptions(signal, null)) as AsyncGenerator<
          ChatModelRunResult,
          void
        >
      )
      await collect(
        adapter.run(createOptions(signal, null)) as AsyncGenerator<
          ChatModelRunResult,
          void
        >
      )

      const runIds = vi
        .mocked(observer.onRunStart)
        .mock.calls.map(([start]) => start.runId)

      expect(runIds).toHaveLength(2)
      expect(runIds[0]).not.toBe(runIds[1])
    } finally {
      vi.useRealTimers()
    }
  })

  it('reports every transport snapshot to the observer but yields the same parts once', async () => {
    const { observer, channel } = createObserver()
    const parts = textParts('same')
    const transport: StreamTransport = {
      async *run() {
        yield { parts, status: 'streaming' }
        yield { parts, status: 'streaming' }

        return { parts, status: 'ready' }
      },
    }

    const results = await collect(run(transport, channel))

    expect(results).toHaveLength(1)
    expect(observer.onSnapshot).toHaveBeenCalledTimes(3)
  })

  it('compares parts by reference, so an equal new array is yielded again', async () => {
    const transport: StreamTransport = {
      async *run() {
        yield { parts: textParts('same'), status: 'streaming' }
        yield { parts: textParts('same'), status: 'streaming' }

        return { parts: textParts('same'), status: 'ready' }
      },
    }
    const stringify = vi.spyOn(JSON, 'stringify')

    try {
      const results = await collect(run(transport))

      expect(results).toHaveLength(3)
      expect(stringify).not.toHaveBeenCalled()
    } finally {
      stringify.mockRestore()
    }
  })

  it('keeps the parts and fails the message when the final snapshot repeats them with status error', async () => {
    const { observer, channel } = createObserver()
    const parts = textParts('partial')
    const transport: StreamTransport = {
      async *run() {
        yield { parts, status: 'streaming' }

        return { parts, status: 'error', errorMessage: 'cut off' }
      },
    }

    const results = await collect(run(transport, channel))
    const last = results[results.length - 1]

    expect(results).toHaveLength(2)
    expect(last.status).toEqual({ type: 'incomplete', reason: 'error' })
    expect(last.content).toEqual([{ type: 'text', text: 'partial' }])
    expect(observer.onRunEnd).toHaveBeenCalledWith(
      'asst-1',
      expect.objectContaining({ status: 'error', error: 'cut off' })
    )
  })

  it('passes the debug payload through to the observer', async () => {
    const { observer, channel } = createObserver()
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

    await collect(run(transport, channel))

    expect(observer.onSnapshot).toHaveBeenCalledWith('asst-1', snapshot)
  })

  it('skips observer calls when no observer is attached', async () => {
    const channel = createChannel()
    const transport: StreamTransport = {
      async *run() {
        yield { parts: textParts('o'), status: 'streaming' }

        return { parts: textParts('ok'), status: 'ready' }
      },
    }

    const results = await collect(run(transport, channel))

    expect(results).toHaveLength(2)
  })

  it('sends the thread id of the provider to the transport', async () => {
    const { observer, channel } = createObserver()
    const threadIds: string[] = []
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: returns right away
      async *run(input) {
        threadIds.push(input.threadId)

        return { parts: textParts('ok'), status: 'ready' }
      },
    }

    await collect(run(transport, channel))

    expect(threadIds).toEqual(['conv-1'])
    expect(observer.onRunStart).toHaveBeenCalledWith(
      expect.objectContaining({ threadId: 'conv-1' })
    )
  })

  it('fails the run when no provider uses the runtime', async () => {
    const run = vi.fn()
    const adapter = createChatModelAdapterFromTransport(
      { transport: { run } },
      createRuntimeChannel()
    )
    const results = adapter.run(
      createOptions(new AbortController().signal)
    ) as AsyncGenerator<ChatModelRunResult, void>
    let message = ''

    try {
      await collect(results)
    } catch (error) {
      message = (error as Error).message
    }

    expect(message).toMatch(/inside an AIProvider/)
    expect(run).not.toHaveBeenCalled()
  })
})
