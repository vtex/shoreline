import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Divider } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

describe('Heading tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Divider data-testid="divider" styleOverrides={{ bg: 'azure' }} />
      </ThemeProvider>
    )

    expect(getByTestId('divider')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Divider />
        <Divider orientation="vertical" />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Divider />
        <Divider orientation="vertical" />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
