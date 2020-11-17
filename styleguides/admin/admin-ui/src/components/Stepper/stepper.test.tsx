import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Stepper } from './index'
import { ThemeProvider } from '../../system'

describe('Stepper tests', () => {
  it('should not have any violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Stepper value={1} label="stepper number" />
        <Stepper value={1} label="stepper number" />
        <Stepper value={1} helperText="Helper Text" label="stepper number" />
        <Stepper value={9} disable label="stepper number" />
        <Stepper value={1} minValue={1} label="stepper number" />
        <Stepper
          value={0}
          error
          errorMessage="Minimum of 6"
          label="stepper number"
        />
        <Stepper
          value={0}
          minValue={0}
          maxValue={50}
          unitMultiplier={5}
          label="stepper number"
        />
        <Stepper
          label="stepper number"
          value={0}
          minValue={0}
          maxValue={50}
          unitMultiplier={5}
          onChange={(value: string) => {
            alert(value)
          }}
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Stepper value={1} label="stepper number"></Stepper>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
