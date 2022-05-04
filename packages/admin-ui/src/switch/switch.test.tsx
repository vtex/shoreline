import React from 'react'
import { render, axe } from '../test-utils'

import type { SwitchStateReturn } from './index'
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
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <SwitchState>
        {(state) => (
          <Switch
            state={state}
            data-testid="switch"
            value="switch"
            aria-label="switch"
            csx={{ bg: 'azure' }}
          />
        )}
      </SwitchState>
    )

    expect(getByTestId('switch')).toHaveStyleRule('background', 'azure')
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <SwitchState>
        {(state) => <Switch state={state} value="toggle" aria-label="toggle" />}
      </SwitchState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
