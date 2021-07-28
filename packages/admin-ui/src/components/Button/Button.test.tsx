import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'

import { Button } from './index'

describe('Button tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Button data-testid="button" csx={{ bg: 'coral' }}>
          Black Button
        </Button>
      </ThemeProvider>
    )

    expect(getByTestId('button')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button size="small">Button</Button>
        <Button variant="danger">Button</Button>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button size="small">Button</Button>
        <Button variant="danger">Button</Button>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
