import { renderHook, act } from '../../../test-utils'
import { useSelectionTreeState } from '../index'

const items = [
  { id: 1, name: 'name-1' },
  { id: 2, name: 'name-2' },
  { id: 3, name: 'name-3' },
  { id: 4, name: 'name-4' },
]

describe('useSelectionTreeState', () => {
  it('should select the correct item', () => {
    const { result } = renderHook(() =>
      useSelectionTreeState({
        items,
      })
    )

    expect(result.current.selectedItems).toEqual([])

    act(() => {
      result.current.items.setValue([2])
    })

    expect(result.current.selectedItems).toEqual([items[1]])
  })

  it('should change the root to indeterminate by selecting an item', () => {
    const { result } = renderHook(() =>
      useSelectionTreeState({
        items,
      })
    )

    expect(result.current.root.value).toBe(false)

    act(() => {
      result.current.items.setValue([1])
    })

    expect(result.current.root.value).toEqual('indeterminate')
  })

  it('should change the root to indeterminate by unselecting an item', () => {
    const { result } = renderHook(() =>
      useSelectionTreeState({
        items,
        isInitiallySelected: () => true,
      })
    )

    expect(result.current.root.value).toBe(true)
    expect(result.current.selectedItems).toEqual(items)

    act(() => {
      result.current.items.setValue([1, 2, 3])
    })

    expect(result.current.selectedItems).toEqual([items[0], items[1], items[2]])
    expect(result.current.root.value).toEqual('indeterminate')
  })

  it('should select all items by selecting the root', () => {
    const { result } = renderHook(() =>
      useSelectionTreeState({
        items,
      })
    )

    expect(result.current.root.value).toBe(false)
    expect(result.current.selectedItems).toEqual([])

    act(() => {
      result.current.root.setValue(true)
    })

    expect(result.current.root.value).toEqual(true)
    expect(result.current.selectedItems).toEqual(items)
  })
})
