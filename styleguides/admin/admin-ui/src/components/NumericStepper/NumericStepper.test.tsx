import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { NumericStepper } from './index'
import { ThemeProvider } from '../../system'

describe('NumericStepper tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <NumericStepper
          value={1}
          onChange={() => {}}
          label="numeric-stepper"
          data-testid="numeric-stepper"
          styleOverrides={{ bg: 'azure' }}
        />
      </ThemeProvider>
    )

    expect(getByTestId('numeric-stepper')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', async () => {
    const { container } = render(
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
          unitMultiplier={5}
          onChange={(event) => {
            console.warn(event.value)
          }}
          label="numeric-stepper-4"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have any violations', () => {
    const { asFragment } = render(
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

    expect(asFragment()).toMatchSnapshot()
  })
})
