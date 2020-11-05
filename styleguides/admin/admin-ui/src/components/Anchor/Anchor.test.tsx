import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Anchor } from './index'
import { ThemeProvider } from '../../system'

describe('Anchor tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Anchor href="/">Link 1</Anchor>
        <Anchor href="/">Link 2</Anchor>
        <Anchor href="/">Link 3</Anchor>
        <Anchor href="/">Link 4</Anchor>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Anchor href="/">Link 1</Anchor>
        <Anchor href="/">Link 2</Anchor>
        <Anchor href="/">Link 3</Anchor>
        <Anchor href="/">Link 4</Anchor>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
