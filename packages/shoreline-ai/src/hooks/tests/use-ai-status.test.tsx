import {
  act,
  describe,
  expect,
  it,
  renderHook,
  waitFor,
} from '@vtex/shoreline-test-utils'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

import { MockRuntimeProvider } from '../../test-utils'
import type { RuntimeSnapshot, StreamTransport } from '../../runtime/types'
import type { AIMessageInput, AIThreadError } from '../../types/public'
import { useAIStatus } from '../use-ai-status'
import { useAIThread } from '../use-ai-thread'

function deferred<T = void>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((res) => {
    resolve = res
  })

  return { promise, resolve }
}

const FAILING_TRANSPORT: StreamTransport = {
  // biome-ignore lint/correctness/useYield: the transport fails before any snapshot
  async *run() {
    throw new Error('boom')
  },
}

function setup(
  transport: StreamTransport,
  onRunError?: (error: AIThreadError) => void
) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MockRuntimeProvider transport={transport} onRunError={onRunError}>
      {children}
    </MockRuntimeProvider>
  )

  return renderHook(() => ({ status: useAIStatus(), thread: useAIThread() }), {
    wrapper,
  })
}

function send(result: {
  current: { thread: { sendMessage: (i: AIMessageInput) => void } }
}) {
  act(() => {
    result.current.thread.sendMessage({ text: 'hello' })
  })
}

describe('useAIStatus', () => {
  it('goes idle, submitted, streaming, ready in order', async () => {
    const toStream = deferred()
    const toFinish = deferred()
    const snapshot = (text: string): RuntimeSnapshot => ({
      parts: [{ type: 'text', text }],
      status: 'streaming',
    })
    const transport: StreamTransport = {
      async *run() {
        await toStream.promise
        yield snapshot('Hi')
        await toFinish.promise

        return { parts: [{ type: 'text', text: 'Hi there' }], status: 'ready' }
      },
    }
    const { result } = setup(transport)

    expect(result.current.status).toMatchObject({
      status: 'idle',
      isLoading: false,
      isStreaming: false,
      error: null,
    })

    send(result)

    await waitFor(() => expect(result.current.status.status).toBe('submitted'))
    expect(result.current.status.isLoading).toBe(true)
    expect(result.current.status.isStreaming).toBe(false)

    await act(async () => {
      toStream.resolve()
    })
    await waitFor(() => expect(result.current.status.status).toBe('streaming'))
    expect(result.current.status.isLoading).toBe(true)
    expect(result.current.status.isStreaming).toBe(true)

    await act(async () => {
      toFinish.resolve()
    })
    await waitFor(() => expect(result.current.status.status).toBe('ready'))
    expect(result.current.status.isLoading).toBe(false)
    expect(result.current.status.isStreaming).toBe(false)
  })

  it('reports error with the message and keeps the user message when the transport throws', async () => {
    const onRunError = vi.fn()
    const { result } = setup(FAILING_TRANSPORT, onRunError)

    send(result)

    await waitFor(() => expect(result.current.status.status).toBe('error'))
    expect(result.current.status.error).toEqual({
      type: 'run',
      message: 'boom',
    })
    expect(result.current.status.isLoading).toBe(false)
    expect(onRunError).toHaveBeenCalledTimes(1)
    expect(onRunError).toHaveBeenCalledWith({ type: 'run', message: 'boom' })
    expect(result.current.thread.messages[0]).toMatchObject({ role: 'user' })
  })

  it('does not break the run when onRunError throws', async () => {
    const onRunError = vi.fn(() => {
      throw new Error('user callback failed')
    })
    const { result } = setup(FAILING_TRANSPORT, onRunError)

    send(result)

    await waitFor(() => expect(result.current.status.status).toBe('error'))
    expect(onRunError).toHaveBeenCalledTimes(1)
  })

  it('clears the error when the next message is sent', async () => {
    let calls = 0
    const gate = deferred()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: the transport fails or ends without snapshots
      async *run() {
        calls += 1
        if (calls === 1) throw new Error('boom')
        await gate.promise

        return { parts: [{ type: 'text', text: 'ok' }], status: 'ready' }
      },
    }
    const { result } = setup(transport)

    send(result)
    await waitFor(() => expect(result.current.status.status).toBe('error'))

    send(result)
    await waitFor(() => expect(result.current.status.status).toBe('submitted'))
    expect(result.current.status.error).toBeNull()

    await act(async () => {
      gate.resolve()
    })
    await waitFor(() => expect(result.current.status.status).toBe('ready'))
  })

  it('clears the error when the thread is switched', async () => {
    const { result } = setup(FAILING_TRANSPORT)

    send(result)
    await waitFor(() => expect(result.current.status.status).toBe('error'))

    act(() => {
      result.current.thread.switchThread('other-thread')
    })

    expect(result.current.status.error).toBeNull()
    expect(result.current.status.status).toBe('idle')
  })

  it('clears the error when a thread is created', async () => {
    const { result } = setup(FAILING_TRANSPORT)

    send(result)
    await waitFor(() => expect(result.current.status.status).toBe('error'))

    act(() => {
      result.current.thread.createThread()
    })

    expect(result.current.status.error).toBeNull()
  })

  it('is not error after the user cancels', async () => {
    const onRunError = vi.fn()
    const transport: StreamTransport = {
      async *run(input) {
        await new Promise<void>((resolve) =>
          input.abortSignal.addEventListener('abort', () => resolve())
        )

        return { parts: [], status: 'ready' }
      },
    }
    const { result } = setup(transport, onRunError)

    send(result)
    await waitFor(() => expect(result.current.status.status).toBe('submitted'))

    act(() => {
      result.current.thread.stopGeneration()
    })

    await waitFor(() => expect(result.current.status.isLoading).toBe(false))
    expect(result.current.status.status).not.toBe('error')
    expect(result.current.status.error).toBeNull()
    expect(onRunError).not.toHaveBeenCalled()
  })
})
