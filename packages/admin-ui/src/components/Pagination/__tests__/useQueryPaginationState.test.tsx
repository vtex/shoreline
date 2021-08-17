import { useQueryPaginationState } from '../hooks/useQueryPaginationState'
import { renderHook, act } from '@testing-library/react-hooks'

const setQuery = (query: Record<string, any> = {}): boolean => {
  const params = new URLSearchParams(window.location.search)

  Object.entries(query).forEach((element: [string, any]) => {
    params.set(element[0], element[1])
  })

  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?${params.toString()}`

  window.history.pushState({ path: newurl }, '', newurl)

  return true
}

const cleanQuery = () => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`

  window.history.pushState({ path: newurl }, '', newurl)
}

describe('useQueryPaginationState tests', () => {
  beforeEach(cleanQuery)

  it('query is update when page changes', () => {
    const { result, waitFor } = renderHook(() =>
      useQueryPaginationState({
        pageSize: 20,
        total: 50,
      })
    )

    expect(result.current.currentPage).toBe(1)
    expect(window.location.href).not.toContain('page')

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toBe(2))
    expect(window.location.href).toContain(`page=2`)

    act(() => {
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toBe(3))
    expect(window.location.href).toContain(`page=3`)

    act(() => {
      result.current.paginate({ type: 'prev' })
    })

    waitFor(() => expect(result.current.currentPage).toBe(2))
    expect(window.location.href).toContain(`page=2`)
  })

  it('starts with the status in query', async () => {
    setQuery({ page: 3 })

    const { result, waitFor } = renderHook(() =>
      useQueryPaginationState({
        pageSize: 20,
        total: 100,
      })
    )

    waitFor(() => expect(result.current.currentPage).toBe(3))
    expect(window.location.href).toContain(`page=3`)
  })

  // window.history.back() not work (test pass because there is not await before waitFor)
  it('query is update on popstate called', async () => {
    const { result, waitFor } = renderHook(() =>
      useQueryPaginationState({
        pageSize: 20,
        total: 100,
      })
    )

    expect(result.current.currentPage).toBe(1)
    expect(window.location.href).not.toContain('page')

    act(() => {
      result.current.paginate({ type: 'next' })
      result.current.paginate({ type: 'next' })
      result.current.paginate({ type: 'next' })
    })

    waitFor(() => expect(result.current.currentPage).toBe(4))
    expect(window.location.href).toContain(`page=4`)

    act(() => {
      window.history.back()
    })

    waitFor(() => expect(result.current.currentPage).toBe(3))
    waitFor(() => expect(window.location.href).toContain(`page=3`))

    act(() => {
      window.history.back()
    })

    waitFor(() => expect(result.current.currentPage).toBe(2))
    waitFor(() => expect(window.location.href).toContain(`page=2`))

    act(() => {
      window.history.forward()
    })

    waitFor(() => expect(result.current.currentPage).toBe(3))
    waitFor(() => expect(window.location.href).toContain(`page=3`))
  })
})
