import React from 'react'
import { render } from '@testing-library/react'

import { Checkbox, useCheckboxState, CheckboxStateReturn } from './index'
import { ThemeProvider } from '@vtex/admin-core'

function CheckboxState({
  children,
}: {
  children: (state: CheckboxStateReturn) => JSX.Element
}) {
  const state = useCheckboxState()

  return children(state)
}

describe('Checkbox tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CheckboxState>
          {(state) => (
            <Checkbox
              state={state}
              data-testid="checkbox"
              value="checkbox"
              aria-label="checkbox"
              styleOverrides={{ bg: 'azure' }}
            />
          )}
        </CheckboxState>
      </ThemeProvider>
    )

    expect(getByTestId('checkbox')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CheckboxState>
          {(state) => (
            <Checkbox
              state={state}
              data-testid="checkbox"
              value="checkbox"
              aria-label="checkbox"
              size="regular"
            />
          )}
        </CheckboxState>
        <CheckboxState>
          {(state) => (
            <Checkbox
              state={state}
              data-testid="checkbox"
              value="checkbox"
              aria-label="checkbox"
              size="small"
            />
          )}
        </CheckboxState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
