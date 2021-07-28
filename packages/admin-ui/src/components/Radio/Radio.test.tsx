import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { Radio, useRadioState, RadioStateReturn } from './index'
import { ThemeProvider } from '@vtex/admin-core'

function RadioState({
  children,
}: {
  children: (state: RadioStateReturn) => JSX.Element
}) {
  const state = useRadioState({ baseId: 'id' })

  return children(state)
}

describe('Radio tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RadioState>
          {(state) => (
            <Radio
              state={state}
              data-testid="radio"
              value="radio"
              aria-label="radio"
              csx={{ bg: 'azure' }}
            />
          )}
        </RadioState>
      </ThemeProvider>
    )

    expect(getByTestId('radio')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <RadioState>
          {(state) => (
            <Radio
              state={state}
              value="radio"
              aria-label="radio"
              size="regular"
            />
          )}
        </RadioState>
        <RadioState>
          {(state) => (
            <Radio
              state={state}
              value="radio"
              aria-label="radio"
              size="small"
            />
          )}
        </RadioState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
