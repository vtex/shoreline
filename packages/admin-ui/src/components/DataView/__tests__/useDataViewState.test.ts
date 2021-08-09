import { renderHook, act } from '../../../test-utils'
import { useDataViewState } from '../state'

describe('useDataViewState', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() =>
      useDataViewState({
        loading: true,
        empty: null,
        notFound: null,
        error: null,
      })
    )

    expect(result.current.status).toBe('loading')
    expect(result.current.statusObject).toEqual({
      loading: true,
      empty: null,
      notFound: null,
      error: null,
    })
    expect(typeof result.current.setStatus).toBe('function')
  })

  it('should be able to dispatch a loading state', () => {
    const { result } = renderHook(() => useDataViewState())

    // initially ready
    expect(result.current.status).toBe('ready')

    // distatch loading
    act(() => result.current.setStatus({ type: 'loading' }))
    expect(result.current.status).toBe('loading')
  })

  it('should be able to dispatch the error state', () => {
    const { result } = renderHook(() => useDataViewState())

    // initially ready
    expect(result.current.status).toBe('ready')

    // distatch error
    act(() => result.current.setStatus({ type: 'error', message: 'Error msg' }))
    expect(result.current.status).toBe('error')
  })

  it('should be able to dispatch the not-found state', () => {
    const { result } = renderHook(() => useDataViewState())

    // initially ready
    expect(result.current.status).toBe('ready')

    // distatch not-found
    act(() =>
      result.current.setStatus({
        type: 'not-found',
        message: 'msg',
        suggestion: 'not found suggestion',
      })
    )
    expect(result.current.status).toBe('not-found')
  })

  it('should be able to dispatch the empty state', () => {
    const { result } = renderHook(() => useDataViewState())

    // initially ready
    expect(result.current.status).toBe('ready')

    // distatch empty
    act(() =>
      result.current.setStatus({
        type: 'empty',
        message: 'msg',
      })
    )
    expect(result.current.status).toBe('empty')
  })

  it('should be able to dispatch a ready state', () => {
    const { result } = renderHook(() => useDataViewState())

    // initially ready
    expect(result.current.status).toBe('ready')

    // dispatch loading
    act(() => result.current.setStatus({ type: 'loading' }))
    expect(result.current.status).toBe('loading')

    // back to ready
    act(() => result.current.setStatus({ type: 'ready' }))
    expect(result.current.status).toBe('ready')
  })
})
