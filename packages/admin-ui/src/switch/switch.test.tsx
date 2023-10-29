import React from 'react'
import { render } from '../test-utils'

import { Switch, useSwitchState } from './index'

function SwitchState({ children }: { children: (state: any) => JSX.Element }) {
  const state = useSwitchState()

  return children(state)
}

describe('Switch tests', () => {
  it('renders', async () => {
    const { container } = render(
      <SwitchState>
        {(state) => (
          <Switch
            id="switch"
            state={state}
            value="toggle"
            aria-label="toggle"
            label="Label"
          />
        )}
      </SwitchState>
    )

    expect(container).toBeInTheDocument()
  })
})
