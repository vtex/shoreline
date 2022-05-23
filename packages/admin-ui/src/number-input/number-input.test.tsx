import React from 'react'

import { render, jestMatchMedia } from '../test-utils'

import { NumberInput } from './index'

// const StatefulCheckbox = withState(Checkbox, () => {
//   const state = useCheckboxState({ initialValue: false })

//   return { ...state, id: 'checkbox-test' }
// })

describe('Number Input', () => {
  beforeEach(jestMatchMedia)

  it('should match snapshot', () => {
    const { asFragment } = render(
      <NumberInput
        id="number-input"
        label="Label"
        min={-5}
        max={5}
        value="6"
        helpText="Help Text"
        errorText="Error text"
        error
        disabled
        optional
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should load with a default value', () => {
    const { getByTestId } = render(
      <NumberInput
        id="number-input"
        data-testid="number-input"
        label="Label"
        value="5"
      />
    )

    const numberInput = getByTestId('number-input')

    expect(numberInput).toHaveDisplayValue('5')
  })

  it('should show invalid number error', () => {
    const min = -5
    const max = 5
    const value = 6

    const { getByText } = render(
      <NumberInput
        id="number-input"
        data-testid="number-input"
        label="Label"
        min={min}
        max={max}
        value={value}
        error={value < min || value > max}
        errorText="Invalid number input"
      />
    )

    const errorTextElement = getByText('Invalid number input')

    expect(errorTextElement).toBeVisible()
  })

  it('should show help text', () => {
    const { getByText } = render(
      <NumberInput
        id="number-input"
        data-testid="number-input"
        label="Label"
        helpText="Set its value"
      />
    )

    const helpTextElement = getByText('Set its value')

    expect(helpTextElement).toBeVisible()
  })
})
