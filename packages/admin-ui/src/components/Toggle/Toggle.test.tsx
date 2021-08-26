import React from 'react'
import { render, axe } from '../../test-utils'

import type { ToggleStateReturn } from './index'
import { Toggle, useToggleState } from './index'

function ToggleState({
  children,
}: {
  children: (state: ToggleStateReturn) => JSX.Element
}) {
  const state = useToggleState()

  return children(state)
}

describe('Toggle tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ToggleState>
        {(state) => (
          <Toggle
            state={state}
            data-testid="toggle"
            value="toggle"
            aria-label="toggle"
            csx={{ bg: 'azure' }}
          />
        )}
      </ToggleState>
    )

    expect(getByTestId('toggle')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <>
        <ToggleState>
          {(state) => (
            <Toggle
              state={state}
              value="toggle 1"
              aria-label="toggle 1"
              size="regular"
            />
          )}
        </ToggleState>
        <ToggleState>
          {(state) => (
            <Toggle
              state={state}
              value="toggle 2"
              aria-label="toggle 2"
              size="small"
            />
          )}
        </ToggleState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ToggleState>
        {(state) => (
          <Toggle
            state={state}
            value="toggle"
            aria-label="toggle"
            size="regular"
          />
        )}
      </ToggleState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
