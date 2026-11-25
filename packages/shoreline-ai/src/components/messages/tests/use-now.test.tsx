import {
  act,
  afterEach,
  beforeEach,
  expect,
  renderHook,
  test,
  vi,
} from '@vtex/shoreline-test-utils'

import { useNow } from '../use-now'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

test('two consumers share one interval and it stops with the last unmount', () => {
  const spy = vi.spyOn(globalThis, 'setInterval')
  const a = renderHook(() => useNow())
  const b = renderHook(() => useNow())
  expect(spy).toHaveBeenCalledTimes(1)
  act(() => {
    vi.advanceTimersByTime(60_000)
  })
  expect(a.result.current).toBe(b.result.current)
  a.unmount()
  b.unmount()
  expect(vi.getTimerCount()).toBe(0)
})
