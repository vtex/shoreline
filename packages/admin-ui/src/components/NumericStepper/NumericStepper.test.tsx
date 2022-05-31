import React from 'react'
import { render, screen, axe } from '../../test-utils'

import { NumericStepper } from './index'

describe('NumericStepper tests', () => {
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
