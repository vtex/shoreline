import {
  act,
  describe,
  expect,
  it,
  renderHook,
  waitFor,
} from '@vtex/shoreline-test-utils'
import type { ReactNode } from 'react'

import { useAIStatus } from '../hooks/use-ai-status'
import { useAIThread } from '../hooks/use-ai-thread'
import type { RuntimeRunInput, StreamTransport } from '../runtime/types'
import { MockRuntimeProvider } from '../test-utils'
import type { AIMessage } from '../types/public'

function textOf(message: AIMessage): string {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
}

/**
 * Answers `ok`, fails by throwing, fails with a final error snapshot, waits
 * until it is cancelled and then answers `ok` again, in this order.
 */
function createTransport(inputs: RuntimeRunInput[]): StreamTransport {
  return {
    async *run(input) {
      inputs.push(input)

      switch (inputs.length) {
        case 2:
          throw new Error('boom')
        case 3:
          return { parts: [], status: 'error', errorMessage: 'bad gateway' }
        case 4:
          yield {
            parts: [{ type: 'text', text: 'partial' }],
            status: 'streaming',
          }
          await new Promise<void>((resolve) => {
            input.abortSignal.addEventListener('abort', () => resolve())
          })

          return { parts: [], status: 'ready' }
        default:
          return { parts: [{ type: 'text', text: 'ok' }], status: 'ready' }
      }
    },
  }
}

function setup(transport: StreamTransport) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MockRuntimeProvider transport={transport}>{children}</MockRuntimeProvider>
  )

  return renderHook(() => ({ status: useAIStatus(), thread: useAIThread() }), {
    wrapper,
  })
}

describe('history sent to the transport after a failed run', () => {
  it('leaves out failed assistant messages but keeps their text in the thread', async () => {
    const inputs: RuntimeRunInput[] = []
    const { result } = setup(createTransport(inputs))

    const send = async (text: string, status: string) => {
      const runs = inputs.length + 1

      act(() => {
        result.current.thread.sendMessage({ text })
      })
      await waitFor(() => expect(inputs).toHaveLength(runs))
      await waitFor(() => {
        expect(result.current.status.status).toBe(status)
        expect(result.current.thread.messages).toHaveLength(runs * 2)
      })
    }

    await send('one', 'ready')
    await send('two', 'error')
    await send('three', 'error')

    act(() => {
      result.current.thread.sendMessage({ text: 'four' })
    })
    await waitFor(() => expect(result.current.status.status).toBe('streaming'))
    act(() => {
      result.current.thread.stopGeneration()
    })
    await waitFor(() => expect(result.current.status.status).toBe('ready'))

    await send('five', 'ready')

    expect(inputs).toHaveLength(5)

    const history = inputs[4].messages.map(
      (message) => `${message.role}:${textOf(message)}`
    )

    expect(history).toEqual([
      'user:one',
      'assistant:ok',
      'user:two',
      'user:three',
      'user:four',
      'assistant:partial',
      'user:five',
    ])

    const shown = result.current.thread.messages.map(
      (message) => `${message.role}:${textOf(message)}`
    )

    expect(shown).toContain('assistant:boom')
    expect(shown).toContain('assistant:bad gateway')
  })
})
