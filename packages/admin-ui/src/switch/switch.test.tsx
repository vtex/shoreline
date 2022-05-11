import React from 'react'
import { render, axe } from '../test-utils'

import type { SwitchStateReturn } from './types'
import { Switch, useSwitchState } from './index'

const label = 'Label'
const helpText = 'Help text'
const errorText = 'Error text'

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
            id="switch"
            state={state}
            data-testid="switch"
            value="switch"
            aria-label="switch"
            csx={{ bg: 'azure' }}
            label={label}
          />
        )}
      </SwitchState>
    )

    expect(getByTestId('switch')).toHaveStyleRule('background', 'azure')
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <SwitchState>
        {(state) => (
          <Switch
            id="switch"
            state={state}
            value="toggle"
            aria-label="toggle"
            label={label}
          />
        )}
      </SwitchState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  describe('all variants should match snapshot', () => {
    it('label only', () => {
      const { asFragment } = render(
        <SwitchState>
          {(state) => (
            <Switch
              id="switch"
              state={state}
              value="toggle"
              aria-label="toggle"
              label={label}
            />
          )}
        </SwitchState>
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('with error text', () => {
      const { asFragment } = render(
        <SwitchState>
          {(state) => (
            <Switch
              id="switch"
              state={state}
              aria-label="label3"
              value="switch3"
              label={label}
              errorText={errorText}
              error
            />
          )}
        </SwitchState>
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('with help text', () => {
      const { asFragment } = render(
        <SwitchState>
          {(state) => (
            <Switch
              id="switch"
              state={state}
              aria-label="label3"
              value="switch3"
              label={label}
              helpText={helpText}
            />
          )}
        </SwitchState>
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('with help and error texts', () => {
      const { asFragment } = render(
        <SwitchState>
          {(state) => (
            <Switch
              id="switch"
              state={state}
              aria-label="label2"
              label={label}
              checked
              helpText={helpText}
              errorText={errorText}
              error
            />
          )}
        </SwitchState>
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('disabled', () => {
      const { asFragment } = render(
        <SwitchState>
          {(state) => (
            <Switch
              id="switch"
              state={state}
              aria-label="label2"
              label={label}
              disabled
            />
          )}
        </SwitchState>
      )

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
