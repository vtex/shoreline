import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Button } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

describe('Button tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Button data-testid="button" styleOverrides={{ bg: 'black' }}>
          Black Button
        </Button>
      </ThemeProvider>
    )

    expect(getByTestId('button')).toHaveStyleRule('background-color', 'black')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Button>Button</Button>
        <Button variant="filled">Button</Button>
        <Button variant="subtle">Button</Button>
        <Button variant="text">Button</Button>
        <Button size="small">Button</Button>
        <Button palette="danger">Button</Button>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Button>Button</Button>
        <Button variant="filled">Button</Button>
        <Button variant="subtle">Button</Button>
        <Button variant="text">Button</Button>
        <Button size="small">Button</Button>
        <Button palette="danger">Button</Button>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
