import React from 'react'
import { render, screen, axe } from '../../test-utils'

import { NumericStepper } from './index'

describe('NumericStepper tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <NumericStepper
        value={1}
        onChange={() => {}}
        label="numeric-stepper"
        data-testid="numeric-stepper"
        csx={{ bg: 'azure' }}
      />
    )

    expect(getByTestId('numeric-stepper')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <NumericStepper value={1} onChange={() => {}} label="stepper number" />
        <NumericStepper
          value={1}
          onChange={() => {}}
          helperText="Helper Text"
          label="numeric-stepper-1"
        />
        <NumericStepper
          value={9}
          onChange={() => {}}
          disabled
          label="numeric-stepper-2"
        />
        <NumericStepper
          value={0}
          tone="critical"
          onChange={() => {}}
          criticalText="Minimum of 6"
          label="numeric-stepper-3"
        />
        <NumericStepper
          value={0}
          minValue={0}
          maxValue={50}
          step={5}
          onChange={(event) => {
            console.warn(event.value)
          }}
          label="numeric-stepper-4"
        />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('change value externally', async () => {
    const { rerender } = render(
      <NumericStepper
        value={1}
        onChange={() => {}}
        label="stepper number"
        data-testid="numeric-stepper"
      />
    )

    const input = screen.getByTestId('numeric-stepper')

    expect(input).toHaveValue(1)

    rerender(
      <NumericStepper
        value={10}
        onChange={() => {}}
        label="stepper number"
        data-testid="numeric-stepper"
      />
    )

    expect(input).toHaveValue(10)
  })

  it('should not have any violations', async () => {
    const { container } = render(
      <NumericStepper
        value={1}
        onChange={() => {}}
        maxValue={3}
        minValue={-3}
        helperText="Helper Text"
        label="numeric-stepper"
      />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
