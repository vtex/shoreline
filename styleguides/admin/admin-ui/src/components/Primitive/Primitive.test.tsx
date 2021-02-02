import React from 'react'
import { render } from '@testing-library/react'

import { Primitive } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Primitive tests', () => {
  it('should accept styles styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Primitive data-testid="primitive" styles={{ bg: 'coral' }}>
          primitive content
        </Primitive>
      </ThemeProvider>
    )

    expect(getByTestId('primitive')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should be polymorphic', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Primitive
          data-testid="primitive"
          element="a"
          href="https://github.com/"
        >
          link content
        </Primitive>
      </ThemeProvider>
    )

    expect(getByTestId('primitive')).toHaveProperty(
      'href',
      'https://github.com/'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Primitive>primitive content</Primitive>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot using element', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Primitive
          data-testid="primitive"
          element="a"
          href="https://github.com/"
        >
          link content
        </Primitive>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
