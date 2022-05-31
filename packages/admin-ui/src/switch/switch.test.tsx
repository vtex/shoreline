import React from 'react'
import { render, axe } from '../test-utils'

import type { SwitchStateReturn } from './types'
import { Switch, useSwitchState } from './index'

function SwitchState({
  children,
}: {
  children: (state: SwitchStateReturn) => JSX.Element
}) {
  const state = useSwitchState()

  return children(state)
}

describe('Switch tests', () => {
  it('should not have a11y violations', async () => {
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

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
