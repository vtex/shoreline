import { describe, expect, it } from 'vitest'

import type { AIMessagePart } from '../../types/public'
import { defaultMessageGroupBy } from '../default-parts'
import type { GroupByContext } from '../types'

const emptyRegistry: GroupByContext = {
  toolRegistry: new Map(),
}

describe('defaultMessageGroupBy', () => {
  it('groups reasoning and unregistered tools into group-cot', () => {
    const reasoning: AIMessagePart = {
      type: 'reasoning',
      text: 'Thinking',
      status: 'complete',
    }
    const tool: AIMessagePart = {
      type: 'tool',
      name: 'search',
      args: {},
      status: 'complete',
    }
    const text: AIMessagePart = { type: 'text', text: 'Answer' }

    expect(defaultMessageGroupBy(reasoning, emptyRegistry)).toEqual([
      'group-cot',
    ])
    expect(defaultMessageGroupBy(tool, emptyRegistry)).toEqual(['group-cot'])
    expect(defaultMessageGroupBy(text, emptyRegistry)).toBeNull()
  })

  it('keeps registered tools at message level', () => {
    const ctx: GroupByContext = {
      toolRegistry: new Map([
        [
          'hitl-approve',
          {
            mode: 'widget',
            render: () => null,
            defaultOpen: false,
          },
        ],
      ]),
    }

    const tool: AIMessagePart = {
      type: 'tool',
      name: 'hitl-approve',
      args: {},
      status: 'running',
    }

    expect(defaultMessageGroupBy(tool, ctx)).toBeNull()
  })
})
