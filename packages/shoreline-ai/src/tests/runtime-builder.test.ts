import { describe, expect, it } from 'vitest'

import { createRuntimeBuilder } from '../runtime/builder'
import type {
  RuntimeRunInput,
  RuntimeSnapshot,
  StreamTransport,
} from '../runtime/types'
import { mapAIMessagePartsToContentParts } from '../runtime/bridge/map-to-assistant-ui'

function mockTransport(snapshots: RuntimeSnapshot[]): StreamTransport {
  return {
    async *run(_input: RuntimeRunInput) {
      for (const snapshot of snapshots) {
        yield snapshot
      }

      return snapshots[snapshots.length - 1] ?? { parts: [] }
    },
  }
}

describe('createRuntimeBuilder', () => {
  it('requires transport before build', () => {
    expect(() => createRuntimeBuilder().build()).toThrow(/transport/)
  })

  it('builds runtime with transport plugin', () => {
    const built = createRuntimeBuilder()
      .transport(
        mockTransport([
          { parts: [{ type: 'text', text: 'hello' }], status: 'streaming' },
          { parts: [{ type: 'text', text: 'hello world' }], status: 'ready' },
        ])
      )
      .build()

    expect(built.transport).toBeDefined()
  })
})

describe('mapAIMessagePartsToContentParts', () => {
  it('maps text and tool parts for Assistant-UI', () => {
    const mapped = mapAIMessagePartsToContentParts([
      { type: 'text', text: 'Hi' },
      {
        type: 'tool',
        name: 'search',
        args: { q: 'x' },
        status: 'complete',
        metadata: { toolCallId: 'tc-1' },
      },
    ])

    expect(mapped[0]).toEqual({ type: 'text', text: 'Hi' })
    expect(mapped[1]).toMatchObject({
      type: 'tool-call',
      toolCallId: 'tc-1',
      toolName: 'search',
    })
  })
})
