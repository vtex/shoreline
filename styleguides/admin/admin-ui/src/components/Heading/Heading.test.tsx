import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Heading } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Heading tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Heading data-testid="heading" csx={{ color: 'azure' }}>
          Heading 1
        </Heading>
      </ThemeProvider>
    )

    expect(getByTestId('heading')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Heading>Heading 1</Heading>
        <Heading element="h2">Heading 2</Heading>
        <Heading element="h3">Heading 3</Heading>
        <Heading element="h4">Heading 4</Heading>
        <Heading element="h5">Heading 5</Heading>
        <Heading element="h6">Heading 6</Heading>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Heading>Heading 1</Heading>
        <Heading element="h2">Heading 2</Heading>
        <Heading element="h3">Heading 3</Heading>
        <Heading element="h4">Heading 4</Heading>
        <Heading element="h5">Heading 5</Heading>
        <Heading element="h6">Heading 6</Heading>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
