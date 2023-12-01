import {
  render,
  waitFor,
  expect,
  describe,
  it,
  userEvent,
  vi,
} from '@vtex/shoreline-test-utils'
import * as React from 'react'
import { Store } from '../store'
import { useStore } from '../use-store'
import { useState } from 'react'

const user = userEvent.setup()

describe('useStore', () => {
  it('allows us to select state using a selector', async () => {
    const store = new Store({
      select: 0,
      ignored: 1,
    })

    function Comp() {
      const storeVal = useStore(store, (state) => state.select)

      return <p>Store: {storeVal}</p>
    }

    const { getByText } = render(<Comp />)

    expect(getByText('Store: 0')).toBeInTheDocument()
  })

  it('only triggers a re-render when selector state is updated', async () => {
    const store = new Store({
      select: 0,
      ignored: 1,
    })

    function Comp() {
      const storeVal = useStore(store, (state) => state.select)
      const [fn] = useState(vi.fn)

      fn()

      return (
        <div>
          <p>Number rendered: {fn.mock.calls.length}</p>
          <p>Store: {storeVal}</p>
          <button
            onClick={() =>
              store.setState((v) => ({
                ...v,
                select: 10,
              }))
            }
          >
            Update select
          </button>
          <button
            onClick={() =>
              store.setState((v) => ({
                ...v,
                ignored: 10,
              }))
            }
          >
            Update ignored
          </button>
        </div>
      )
    }

    const { getByText } = render(<Comp />)

    expect(getByText('Store: 0')).toBeInTheDocument()
    expect(getByText('Number rendered: 1')).toBeInTheDocument()

    await user.click(getByText('Update select'))

    await waitFor(() => expect(getByText('Store: 10')).toBeInTheDocument())
    expect(getByText('Number rendered: 2')).toBeInTheDocument()

    await user.click(getByText('Update ignored'))
    expect(getByText('Number rendered: 2')).toBeInTheDocument()
  })
})
