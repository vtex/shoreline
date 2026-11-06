import { describe, expect, it } from 'vitest'

import type { AIMessage } from '../../types/public'
import type { RuntimeSnapshot } from '../../runtime/types'
import { createMockStreamTransport } from '../mock-stream-transport'

const userMessage: AIMessage = {
  id: 'user-1',
  role: 'user',
  parts: [{ type: 'text', text: 'hi' }],
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('createMockStreamTransport', () => {
  it('emits reasoning before text and ends ready', async () => {
    const transport = createMockStreamTransport({ delayMs: 0 })
    const generator = transport.run({
      messages: [userMessage],
      trigger: { type: 'message', message: userMessage },
      abortSignal: new AbortController().signal,
      runResponseId: 'run-1',
    })

    const startedAt = Date.now()
    const snapshots: RuntimeSnapshot[] = []
    let result = await generator.next()

    while (!result.done) {
      snapshots.push(result.value)
      result = await generator.next()
    }

    expect(Date.now() - startedAt).toBeLessThan(300)
    expect(snapshots[0].status).toBe('streaming')
    expect(snapshots[0].parts.map((part) => part.type)).toEqual(['reasoning'])
    expect(
      snapshots.some(
        (snapshot) =>
          snapshot.parts.map((part) => part.type).join() === 'reasoning,text'
      )
    ).toBe(true)

    expect(result.value.status).toBe('ready')
    expect(result.value.parts[1]).toEqual({
      type: 'text',
      text: 'You said: "hi". This is a default VTEX-style assistant reply from the Storybook mock transport.',
    })
  })
})
