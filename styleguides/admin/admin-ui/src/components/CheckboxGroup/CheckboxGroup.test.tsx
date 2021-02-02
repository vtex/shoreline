import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { CheckboxGroup } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import { Label } from '../Label'

describe('CheckboxGroup tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CheckboxGroup data-testid="group" styleOverrides={{ bg: 'azure' }}>
          <input type="checkbox" readOnly />
        </CheckboxGroup>
      </ThemeProvider>
    )

    expect(getByTestId('group')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CheckboxGroup>
          <input type="checkbox" readOnly />
        </CheckboxGroup>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with label', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CheckboxGroup label="label">
          <input type="checkbox" readOnly />
        </CheckboxGroup>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <CheckboxGroup>
          <Label>
            <input type="checkbox" value="a" readOnly /> A
          </Label>
          <Label>
            <input type="checkbox" value="b" readOnly /> B
          </Label>
        </CheckboxGroup>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
