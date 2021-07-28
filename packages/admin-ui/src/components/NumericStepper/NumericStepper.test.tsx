import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'

import { NumericStepper } from './index'

describe('NumericStepper tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <NumericStepper
          value={1}
          onChange={() => {}}
          label="numeric-stepper"
          data-testid="numeric-stepper"
          csx={{ bg: 'azure' }}
        />
      </ThemeProvider>
    )

    expect(getByTestId('numeric-stepper')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
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
          error
          onChange={() => {}}
          errorMessage="Minimum of 6"
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
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('change value externally', async () => {
    const { rerender } = render(
      <ThemeProvider>
        <NumericStepper
          value={1}
          onChange={() => {}}
          label="stepper number"
          data-testid="numeric-stepper"
        />
      </ThemeProvider>
    )

    const input = screen.getByTestId('numeric-stepper')

    expect(input).toHaveValue(1)

    rerender(
      <ThemeProvider>
        <NumericStepper
          value={10}
          onChange={() => {}}
          label="stepper number"
          data-testid="numeric-stepper"
        />
      </ThemeProvider>
    )

    expect(input).toHaveValue(10)
  })

  it('should not have any violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <NumericStepper
          value={1}
          onChange={() => {}}
          maxValue={3}
          minValue={-3}
          helperText="Helper Text"
          label="numeric-stepper"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
