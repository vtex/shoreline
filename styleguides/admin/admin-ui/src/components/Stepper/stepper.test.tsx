import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Stepper } from './index'
import { ThemeProvider } from '../../system'

describe('Stepper tests', () => {
  it('should not have any violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Stepper value={1} />
        <Stepper variant="focus" value={1} />
        <Stepper variant="hover" value={1} />
        <Stepper variant="danger" value={1} />
        <Stepper value={1} helperText="Helper Text" />
        <Stepper value={9} disable={true} />
        <Stepper value={1} minValue={1} />
        <Stepper value={0} variant="danger" errorMessage="Minimum of 6" />
        <Stepper
          value={0}
          minValue={0}
          maxValue={50}
          unitMultiplier={5}
          onChange={(value: number) => {
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
        <Stepper value={1}></Stepper>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
