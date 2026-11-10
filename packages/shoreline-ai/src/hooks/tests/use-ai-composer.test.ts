import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { afterEach, vi } from 'vitest'

import {
  createRuntimeChannel,
  createRuntimeCore,
} from '../../runtime/runtime-core'
import { useAIComposer } from '../use-ai-composer'

const setText = vi.fn()
const send = vi.fn()
const reset = vi.fn()

let canSend = true

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({
    composer: {
      setText,
      send,
      reset,
    },
  }),
  useAuiState: (selector: (state: unknown) => unknown) =>
    selector({
      composer: {
        text: 'Hello',
        canSend,
        attachments: [
          {
            id: 'a1',
            type: 'file',
            name: 'doc.pdf',
            status: { type: 'running', reason: 'uploading', progress: 0.5 },
          },
        ],
      },
    }),
}))

vi.mock('../../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    runtime: createRuntimeCore({} as never, createRuntimeChannel()),
    threadId: null,
    isOpeningThread: false,
    error: null,
  }),
}))

describe('useAIComposer', () => {
  afterEach(() => {
    canSend = true
    vi.clearAllMocks()
  })

  it('exposes draft state mapped from composer runtime', () => {
    const { result } = renderHook(() => useAIComposer())

    expect(result.current.text).toBe('Hello')
    expect(result.current.disabled).toBe(false)
    expect(result.current.attachments).toEqual([
      {
        id: 'a1',
        type: 'file',
        name: 'doc.pdf',
        status: 'uploading',
        progress: 0.5,
      },
    ])
  })

  it('maps canSend false to disabled true', () => {
    canSend = false

    const { result } = renderHook(() => useAIComposer())

    expect(result.current.disabled).toBe(true)
  })

  it('calls composer runtime actions', () => {
    const { result } = renderHook(() => useAIComposer())

    result.current.setText('Draft')
    result.current.send()
    result.current.reset()

    expect(setText).toHaveBeenCalledWith('Draft')
    expect(send).toHaveBeenCalled()
    expect(reset).toHaveBeenCalled()
  })
})
