import { renderHook, act } from '@testing-library/react-hooks'
import { useDebouncedState } from '../useDebouncedState'

describe('useDebouncedState', () => {
  it('should use a debounced state', () => {
    const { result } = renderHook(() =>
      useDebouncedState({
        initialState: 0,
        timeoutMs: 250,
      })
    )

    expect(result.current[0]).toBe(0)
    expect(typeof result.current[1]).toBe('function')
  })

  it('should update the state', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebouncedState({
        initialState: 0,
        timeoutMs: 250,
      })
    )

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](1)
    })

    await waitForNextUpdate()

    expect(result.current[0]).toBe(1)
  })

  it('should be able to produce a state', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebouncedState({
        initialState: 0,
        timeoutMs: 250,
        produce: (s) => s * 2,
      })
    )

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](5)
    })

    await waitForNextUpdate()

    expect(result.current[0]).toBe(10)
  })
})
