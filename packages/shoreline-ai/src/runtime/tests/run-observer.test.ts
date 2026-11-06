import { describe, expect, it } from 'vitest'

import type { AIRuntime } from '../../types/runtime'
import {
  bindRunObserverHandle,
  createRunObserverHandle,
  getRunObserverHandle,
} from '../run-observer'

describe('run observer handle', () => {
  it('returns the handle bound to the same runtime object', () => {
    const runtime = {} as AIRuntime
    const other = {} as AIRuntime
    const handle = createRunObserverHandle()

    bindRunObserverHandle(runtime, handle)

    expect(handle.current).toBeNull()
    expect(getRunObserverHandle(runtime)).toBe(handle)
    expect(getRunObserverHandle(other)).toBeUndefined()
  })
})
