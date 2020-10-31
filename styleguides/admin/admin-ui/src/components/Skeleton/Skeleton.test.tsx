import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Skeleton } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

describe('Skeleton tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Skeleton data-testid="skeleton" styles={{ bg: 'blue' }} />
      </ThemeProvider>
    )

    expect(getByTestId('skeleton')).toHaveStyleRule('background-color', 'blue')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Skeleton />
        <Skeleton shape="circle" />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Skeleton />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
