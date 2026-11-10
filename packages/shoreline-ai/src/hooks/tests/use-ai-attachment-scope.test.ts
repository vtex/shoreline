import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIAttachment } from '../use-ai-attachment'

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({ attachment: { source: {} } }),
  useAuiState: () => {
    throw new Error('unrelated failure')
  },
}))

describe('useAIAttachment scope check', () => {
  it('lets an unrelated error through instead of the scope message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useAIAttachment())).toThrow(
      'unrelated failure'
    )
  })
})
