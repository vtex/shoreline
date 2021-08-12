import { renderHook, act } from '@testing-library/react-hooks'
import { useDebouncedCache } from '../useDebouncedCache'

describe('useDebouncedState', () => {
  it('should use a debounced state', () => {
    const { result } = renderHook(() =>
      useDebouncedCache({
        initialState: 0,
        timeoutMs: 250,
      })
    )

    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)
    expect(typeof result.current[2]).toBe('function')
  })

  it('should update the state', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebouncedCache({
        initialState: 0,
        timeoutMs: 250,
      })
    )

    expect(result.current[0]).toBe(0)
    expect(result.current[1]).toBe(0)

    act(() => {
      result.current[2](1)
    })

    expect(result.current[0]).toBe(1)

    await waitForNextUpdate()

    expect(result.current[1]).toBe(1)
  })

  it('should be able to produce a state', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebouncedCache({
        initialState: 0,
        timeoutMs: 250,
        produce: (s) => s * 2,
      })
    )

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[2](5)
    })

    expect(result.current[0]).toBe(10)

    await waitForNextUpdate()

    expect(result.current[1]).toBe(10)
  })
})
