import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import type { CheckboxStateReturn } from './index'
import { Checkbox, useCheckboxState } from './index'

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
              csx={{ bg: 'azure' }}
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
