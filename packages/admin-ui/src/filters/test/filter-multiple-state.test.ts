import { waitFor } from '@testing-library/react'

import { act, renderHook } from '../../test-utils'

import { useFilterMultipleState } from '../index'

describe('filter-multiple-state', () => {
  it('updates on filter apply', () => {
    const { result } = renderHook(() => useFilterMultipleState())

    expect(result.current.appliedItems).toStrictEqual([])

    act(() => result.current.combobox.select({ id: 'test', label: 'test' }))
    act(() => result.current.combobox.select({ id: 'test2', label: 'test2' }))

    // apply change
    act(() => result.current.onChange())

    expect(
      result.current.appliedItems.find((i) => i.id === 'test')
    ).toBeTruthy()
    expect(
      result.current.appliedItems.find((i) => i.id === 'test2')
    ).toBeTruthy()

    // toggles selection
    act(() => result.current.combobox.onChange({ id: 'test2', label: 'test2' }))
    // apply change
    act(() => result.current.onChange())

    expect(
      result.current.appliedItems.find((i) => i.id === 'test')
    ).toBeTruthy()
    expect(
      result.current.appliedItems.find((i) => i.id === 'test2')
    ).toBeFalsy()
  })

  it('resets on clear', () => {
    const { result } = renderHook(() => useFilterMultipleState())

    act(() => result.current.menu.show())
    act(() => result.current.setAppliedItems([{ id: 'test', label: 'test' }]))

    expect(result.current.appliedItems).not.toStrictEqual([])
    expect(result.current.menu.mounted).toBe(true)

    act(() => result.current.onClear())

    expect(result.current.appliedItems).toStrictEqual([])
    expect(result.current.menu.mounted).toBe(false)
  })

  it('resets selected options on menu close', () => {
    const { result } = renderHook(() => useFilterMultipleState())

    act(() => result.current.setAppliedItems([{ id: 'test', label: 'test' }]))
    act(() => result.current.menu.show())

    const values = result.current.appliedItems

    expect(result.current.menu.mounted).toBe(true)

    act(() => result.current.combobox.select({ id: 'incorrect', label: '1' }))
    // toggles selection
    act(() => result.current.combobox.onChange({ id: 'test', label: 'test' }))

    act(() => result.current.menu.hide())

    waitFor(() => expect(result.current.appliedItems).toMatchObject(values))
  })
})
