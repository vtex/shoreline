import {
  checkDisabled,
  getState,
  setMax,
  usePaginationState,
} from '../hooks/usePaginationState'
import { renderHook, act } from '@testing-library/react-hooks'

describe('usePaginationState tests', () => {
  it('checkDisabled', () => {
    expect(checkDisabled([-1, 0], 0)).toStrictEqual({
      prevDisabled: true,
      nextDisabled: true,
    })

    expect(checkDisabled([0, 10], 5)).toStrictEqual({
      prevDisabled: true,
      nextDisabled: true,
    })

    expect(checkDisabled([0, 10], 50)).toStrictEqual({
      prevDisabled: true,
      nextDisabled: false,
    })

    expect(checkDisabled([11, 20], 50)).toStrictEqual({
      prevDisabled: false,
      nextDisabled: false,
    })

    expect(checkDisabled([41, 50], 50)).toStrictEqual({
      prevDisabled: false,
      nextDisabled: true,
    })
  })

  it('setMax', () => {
    expect(setMax(0, 0)).toBe(0)
    expect(setMax(10, 0)).toBe(0)
    expect(setMax(10, 50)).toBe(10)
    expect(setMax(50, 45)).toBe(45)
  })

  it('getState', () => {
    expect(getState(1, 10, 0)).toStrictEqual({
      currentPage: 1,
      range: [0, 0],
      total: 0,
      prevDisabled: true,
      nextDisabled: true,
    })

    expect(getState(1, 10, 45)).toStrictEqual({
      currentPage: 1,
      range: [1, 10],
      total: 45,
      prevDisabled: true,
      nextDisabled: false,
    })

    expect(getState(3, 10, 45)).toStrictEqual({
      currentPage: 3,
      range: [21, 30],
      total: 45,
      prevDisabled: false,
      nextDisabled: false,
    })

    expect(getState(5, 10, 45)).toStrictEqual({
      currentPage: 5,
      range: [41, 45],
      total: 45,
      prevDisabled: false,
      nextDisabled: true,
    })

    expect(getState(8, 10, 45)).toStrictEqual({
      currentPage: 8,
      range: [45, 45],
      total: 45,
      prevDisabled: false,
      nextDisabled: true,
    })
  })

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

  it('paginate navigate', async () => {
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
      result.current.paginate({ type: 'navigate', page: 4 })
    })

    waitFor(() => expect(result.current.currentPage).toEqual(4))
    expect(result.current.range[0]).toEqual(31)
    expect(result.current.range[1]).toEqual(40)
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
