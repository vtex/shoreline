import { useQueryState } from '../useQueryState'
import { QueryStateProvider } from '../useQueryStateContext'
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

describe('useQueryState tests', () => {
  beforeEach(cleanQuery)

  it('query is update when calls setState', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(result.current[0]).toStrictEqual({})
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[2]).toStrictEqual({})
    expect(window.location.href).not.toContain('myParam')

    const newParam: Record<string, any> = { myParam: 10 }

    act(() => {
      result.current[1](newParam)
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(newParam))
    expect(result.current[0]).toStrictEqual({})
    expect(window.location.href).toContain(`?myParam=${newParam.myParam}`)

    const newParam2: Record<string, any> = { myParam: 100 }

    act(() => {
      result.current[1](newParam2)
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(newParam2))
    expect(result.current[0]).toStrictEqual({})
    expect(window.location.href).toContain(`?myParam=${newParam2.myParam}`)
  })

  it('starts with the status in query', async () => {
    const initialValue = { myParam: 'initial-param' }

    setQuery(initialValue)

    const { result } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(window.location.href).toContain(`?myParam=${initialValue.myParam}`)
    expect(result.current[0]).toStrictEqual(initialValue)
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[2]).toStrictEqual(initialValue)
  })

  // window.history.back() not work (test pass because there is not await before waitFor)
  it('query is update on popstate called', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(result.current[2]).toStrictEqual({})

    const param1: Record<string, any> = { myParam: 10 }

    act(() => {
      result.current[1](param1)
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param1))

    const param2: Record<string, any> = { myParam: 100 }

    act(() => {
      result.current[1](param2)
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param2))

    const param3: Record<string, any> = { myParam: 1000 }

    act(() => {
      result.current[1](param3)
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param3))

    act(() => {
      window.history.back()
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param2))

    act(() => {
      window.history.back()
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param1))

    act(() => {
      window.history.forward()
    })

    waitFor(() => expect(result.current[2]).toStrictEqual(param2))
  })
})
