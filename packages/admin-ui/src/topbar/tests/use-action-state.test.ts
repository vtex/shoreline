import { useActionState } from '../actions'
import { renderHook, act } from '@testing-library/react-hooks'

const DEFAULT_TITLE = 'More options'

describe('useActionState tests', () => {
  it('should change the title and the active item to the new item', async () => {
    const { result, waitFor } = renderHook(() =>
      useActionState({
        defaultTitle: DEFAULT_TITLE,
      })
    )

    expect(result.current.activeItem).toStrictEqual('')
    expect(result.current.title).toStrictEqual(DEFAULT_TITLE)

    act(() => {
      result.current.show()
      result.current.handleAction('new-id', 'new title')
    })

    waitFor(() => expect(result.current.activeItem).toStrictEqual('new-id'))
    expect(result.current.title).toStrictEqual('new title')
  })

  it('should reset the active item and set the title to the default one', async () => {
    const { result, waitFor } = renderHook(() =>
      useActionState({
        defaultTitle: DEFAULT_TITLE,
      })
    )

    expect(result.current.activeItem).toStrictEqual('')
    expect(result.current.title).toStrictEqual(DEFAULT_TITLE)

    act(() => {
      result.current.handleAction('new-id', 'new title', 'href')
    })

    waitFor(() => expect(result.current.activeItem).toStrictEqual(''))
    expect(result.current.title).toStrictEqual(DEFAULT_TITLE)
    expect(result.current.open).toEqual(false)
  })
})
