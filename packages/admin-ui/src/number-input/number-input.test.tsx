import React from 'react'

import { render, jestMatchMedia } from '../test-utils'

import type { NumberInputProps, NumberInputValue } from './index'
import { NumberInput } from './index'

const ControlledNumberInput = (props: NumberInputProps) => {
  const [value, setValue] = React.useState<NumberInputValue>(8)
  const { min = Infinity, max = -Infinity } = props

  return (
    <NumberInput
      id="number-input"
      value={value}
      onChange={(newValue: NumberInputValue) => setValue(newValue)}
      error={value > max || value < min}
      {...props}
    />
  )
}

describe('Number Input', () => {
  beforeEach(jestMatchMedia)

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ControlledNumberInput
        label="Label"
        min={-5}
        max={5}
        helpText="Help Text"
        errorText="Error text"
        error
        disabled
        optional
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should load controlled value', () => {
    const { getByTestId } = render(
      <ControlledNumberInput data-testid="number-input" />
    )

    const numberInput = getByTestId('number-input')

    expect(numberInput).toHaveDisplayValue('8')
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

    const { getByText } = render(
      <ControlledNumberInput
        data-testid="number-input"
        label="Label"
        min={min}
        max={max}
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
