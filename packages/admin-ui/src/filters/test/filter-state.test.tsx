import { waitFor } from '@testing-library/react'

import { act, renderHook } from '../../test-utils'

import { useFilterState } from '../index'

describe('filter-state', () => {
  it('updates on filter apply', () => {
    const { result } = renderHook(() => useFilterState())

    expect(result.current.appliedItem?.id).toEqual(undefined)

    act(() =>
      result.current.combobox.setSelectedItem({ id: 'test', label: 'test' })
    )
    // apply change
    act(() => result.current.onChange())

    expect(result.current.appliedItem?.id).toBe('test')

    act(() =>
      result.current.combobox.setSelectedItem({ id: 'test2', label: 'test' })
    )
    // apply change
    act(() => result.current.onChange())

    expect(result.current.appliedItem?.id).toBe('test2')
  })

  it('resets on clear', () => {
    const { result } = renderHook(() => useFilterState())

    act(() => result.current.menu.show())
    act(() => result.current.setAppliedItem({ id: 'test', label: 'test' }))

    expect(result.current.appliedItem?.id).toBe('test')
    expect(result.current.menu.mounted).toBe(true)

    act(() => result.current.onClear())

    expect(result.current.appliedItem).toBe(undefined)
    expect(result.current.menu.mounted).toBe(false)
  })

  it('resets selected options on menu close', () => {
    const { result } = renderHook(() => useFilterState())

    act(() => result.current.setAppliedItem({ id: 'test', label: 'test' }))
    act(() => result.current.menu.show())

    expect(result.current.appliedItem?.id).toBe('test')
    expect(result.current.menu.mounted).toBe(true)

    act(() =>
      result.current.combobox.setSelectedItem({ id: 'incorrect', label: '1' })
    )

    act(() => result.current.menu.hide())

    waitFor(() => expect(result.current.appliedItem?.id).toBe('test'))
  })
})
