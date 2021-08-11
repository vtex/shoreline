// import React, { useMemo } from 'react'
// import { screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import { useQueryState } from '../useQueryState'
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

describe('usePersistedState tests', () => {
  it('query is update when calls setState', async () => {
    const { result, waitFor } = renderHook(() =>
      useQueryState({
        keys: ['myParam'],
      })
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

    const { result } = renderHook(() =>
      useQueryState({
        keys: ['myParam'],
      })
    )

    expect(window.location.href).toContain(`?myParam=${initialValue.myParam}`)
    expect(result.current[0]).toStrictEqual(initialValue)
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[2]).toStrictEqual(initialValue)
  })
})
