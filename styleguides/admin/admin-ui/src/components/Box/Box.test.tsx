import React from 'react'
import { render } from '@testing-library/react'

import { Box } from './index'
import { ThemeProvider } from '../../system'

describe('Card tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Box data-testid="box" styles={{ bg: 'coral' }}>
          box content
        </Box>
      </ThemeProvider>
    )

    expect(getByTestId('box')).toHaveStyleRule('background-color', 'coral')
  })

  it('should be polymorphic', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Box data-testid="box" element="a" href="https://github.com/">
          link content
        </Box>
      </ThemeProvider>
    )

    expect(getByTestId('box')).toHaveProperty('href', 'https://github.com/')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Box>box content</Box>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot using element', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Box data-testid="box" element="a" href="https://github.com/">
          link content
        </Box>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
