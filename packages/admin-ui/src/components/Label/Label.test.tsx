import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Label } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Label tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Label data-testid="label" csx={{ color: 'azure' }}>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </ThemeProvider>
    )

    expect(getByTestId('label')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
        <Label>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
        <Label>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
