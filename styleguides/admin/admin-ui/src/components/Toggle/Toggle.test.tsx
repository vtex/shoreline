import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Toggle, useToggleState, ToggleStateReturn } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

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
      <ThemeProvider>
        <ToggleState>
          {(state) => (
            <Toggle
              state={state}
              data-testid="toggle"
              value="toggle"
              aria-label="toggle"
              styleOverrides={{ bg: 'azure' }}
            />
          )}
        </ToggleState>
      </ThemeProvider>
    )

    expect(getByTestId('toggle')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
