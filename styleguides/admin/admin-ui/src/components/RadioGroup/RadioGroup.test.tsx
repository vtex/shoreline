import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { RadioGroup } from './index'
import { Radio, useRadioState, RadioStateReturn } from '../Radio'
import { ThemeProvider } from '@vtex/admin-core'

function RadioState({
  children,
}: {
  children: (state: RadioStateReturn) => JSX.Element
}) {
  const state = useRadioState({ baseId: 'id' })

  return children(state)
}

describe('RadioGroup tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RadioState>
          {(state) => (
            <RadioGroup
              data-testid="radio-group"
              aria-label="fruits-group"
              id="radio-group-id"
              state={state}
              csx={{ bg: 'azure' }}
            >
              <Radio state={state} value="Apple" />
              <Radio state={state} value="Watermelon" />
              <Radio state={state} value="Orange" />
            </RadioGroup>
          )}
        </RadioState>
      </ThemeProvider>
    )

    expect(getByTestId('radio-group')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot with diferent orientations', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <RadioState>
          {(state) => (
            <RadioGroup
              data-testid="radio-group"
              aria-label="fruits-group"
              id="radio-group-id"
              state={state}
              orientation="horizontal"
            >
              <Radio state={state} value="Apple" />
              <Radio state={state} value="Watermelon" />
              <Radio state={state} value="Orange" />
            </RadioGroup>
          )}
        </RadioState>
        <RadioState>
          {(state) => (
            <RadioGroup
              data-testid="radio-group"
              aria-label="fruits-group"
              id="radio-group-id"
              state={state}
              orientation="vertical"
            >
              <Radio state={state} value="Apple" />
              <Radio state={state} value="Watermelon" />
              <Radio state={state} value="Orange" />
            </RadioGroup>
          )}
        </RadioState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
