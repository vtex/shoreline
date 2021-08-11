import { usePaginationState } from '../usePaginationState'
import { renderHook, act } from '@testing-library/react-hooks'

describe('usePersistedState tests', () => {
  it('paginate next', async () => {
    const { result, waitFor } = renderHook(() =>
      usePaginationState({
        pageSize: 10,
        total: 100,
      })
    )

    expect(result.current.currentPage).toEqual(1)
    expect(result.current.range[0]).toEqual(1)
    expect(result.current.range[1]).toEqual(10)

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(2))
    expect(result.current.range[0]).toEqual(11)
    expect(result.current.range[1]).toEqual(20)
  })

  it('paginate prev', async () => {
    const { result, waitFor } = renderHook(() =>
      usePaginationState({
        pageSize: 10,
        total: 100,
        initialPage: 4,
      })
    )

    expect(result.current.currentPage).toEqual(4)
    expect(result.current.range[0]).toEqual(31)
    expect(result.current.range[1]).toEqual(40)

    act(() => {
      result.current.paginate({ type: 'prev' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(3))
    expect(result.current.range[0]).toEqual(21)
    expect(result.current.range[1]).toEqual(30)
  })

  it('paginate reset', async () => {
    const { result, waitFor } = renderHook(() =>
      usePaginationState({
        pageSize: 10,
        total: 100,
        initialPage: 4,
      })
    )

    expect(result.current.currentPage).toEqual(4)
    expect(result.current.range[0]).toEqual(31)
    expect(result.current.range[1]).toEqual(40)

    act(() => {
      result.current.paginate({ type: 'reset' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(1))
    expect(result.current.range[0]).toEqual(1)
    expect(result.current.range[1]).toEqual(10)
  })

  it('pagination limits', async () => {
    const { result, waitFor } = renderHook(() =>
      usePaginationState({
        pageSize: 10,
        total: 25,
      })
    )

    expect(result.current.currentPage).toEqual(1)
    expect(result.current.range[0]).toEqual(1)
    expect(result.current.prevDisabled).toEqual(true)
    expect(result.current.nextDisabled).toEqual(false)

    act(() => {
      result.current.paginate({ type: 'prev' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(1))
    expect(result.current.range[0]).toEqual(1)
    expect(result.current.prevDisabled).toEqual(true)
    expect(result.current.nextDisabled).toEqual(false)

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(2))
    expect(result.current.prevDisabled).toEqual(false)
    expect(result.current.nextDisabled).toEqual(false)

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(3))
    expect(result.current.range[1]).toEqual(25)
    expect(result.current.prevDisabled).toEqual(false)
    expect(result.current.nextDisabled).toEqual(true)

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(3))
    expect(result.current.range[1]).toEqual(25)
    expect(result.current.prevDisabled).toEqual(false)
    expect(result.current.nextDisabled).toEqual(true)
  })

  it('paginate setTotatl', async () => {
    const { result, waitFor } = renderHook(() =>
      usePaginationState({
        pageSize: 10,
      })
    )

    expect(result.current.total).toEqual(10)
    expect(result.current.prevDisabled).toEqual(true)
    expect(result.current.nextDisabled).toEqual(true)

    act(() => {
      result.current.paginate({ type: 'setTotal', total: 105 })
    })

    waitFor(() => expect(result.current.total).toEqual(105))
    expect(result.current.prevDisabled).toEqual(true)
    expect(result.current.nextDisabled).toEqual(false)
  })
})
