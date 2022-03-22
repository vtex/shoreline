import { useQueryState } from '../useQueryState'
import { QueryStateProvider } from '../useQueryStateContext'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  cleanQueryParam,
  getCurrentQuery,
  jestWindowMock,
  setQueryParam,
} from '../test-utils'

jestWindowMock()

describe('useQueryState tests', () => {
  beforeEach(cleanQueryParam)

  it('query is update when calls setState', async () => {
    const { result } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(result.current[0]).toStrictEqual({})
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[2]).toStrictEqual({})
    expect(getCurrentQuery()).not.toContain('myParam')

    const newParam: Record<string, any> = { myParam: '10' }

    act(() => {
      result.current[1](newParam)
    })

    expect(result.current[2]).toStrictEqual(newParam)
    expect(result.current[0]).toStrictEqual({})
    expect(getCurrentQuery()).toStrictEqual(newParam)

    const newParam2: Record<string, any> = { myParam: '100' }

    act(() => {
      result.current[1](newParam2)
    })

    expect(result.current[2]).toStrictEqual(newParam2)
    expect(result.current[0]).toStrictEqual({})
    expect(getCurrentQuery()).toStrictEqual(newParam2)
  })

  it('starts with the status in query', async () => {
    const initialValue = { myParam: 'initial-param' }

    setQueryParam(initialValue)
    expect(getCurrentQuery()).toStrictEqual(initialValue)

    const { result } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(result.current[0]).toStrictEqual(initialValue)
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[2]).toStrictEqual(initialValue)
  })

  it('query is update on popstate called', async () => {
    const { result } = renderHook(
      () =>
        useQueryState({
          keys: ['myParam'],
        }),
      { wrapper: QueryStateProvider }
    )

    expect(result.current[2]).toStrictEqual({})

    const param1: Record<string, any> = { myParam: '10' }

    act(() => {
      result.current[1](param1)
    })
    expect(result.current[2]).toStrictEqual(param1)

    const param2: Record<string, any> = { myParam: '100' }

    act(() => {
      result.current[1](param2)
    })
    expect(result.current[2]).toStrictEqual(param2)

    const param3: Record<string, any> = { myParam: '1000' }

    act(() => {
      result.current[1](param3)
    })
    expect(result.current[2]).toStrictEqual(param3)

    act(() => {
      window.history.back()
    })

    expect(getCurrentQuery()).toStrictEqual(param2)
    expect(result.current[2]).toStrictEqual(param2)

    act(() => {
      window.history.back()
    })

    expect(result.current[2]).toStrictEqual(param1)

    act(() => {
      window.history.forward()
    })

    expect(result.current[2]).toStrictEqual(param2)

    const param4: Record<string, any> = { myParam: '1' }

    act(() => {
      result.current[1](param4)
    })
    expect(getCurrentQuery()).toStrictEqual(param4)
    expect(result.current[2]).toStrictEqual(param4)
  })
})
