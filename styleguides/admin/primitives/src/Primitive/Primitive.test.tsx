import React from 'react'
import { render } from '../test-utils'

import { Primitive } from './index'

describe('Primitive tests', () => {
  it('should accept styles styles', () => {
    const { getByTestId } = render(
      <Primitive data-testid="primitive" csx={{ bg: 'coral' }}>
        primitive content
      </Primitive>
    )

    expect(getByTestId('primitive')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should be polymorphic', () => {
    const { getByTestId } = render(
      <Primitive data-testid="primitive" element="a" href="https://github.com/">
        link content
      </Primitive>
    )

    expect(getByTestId('primitive')).toHaveProperty(
      'href',
      'https://github.com/'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Primitive>primitive content</Primitive>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot using element', () => {
    const { asFragment } = render(
      <Primitive data-testid="primitive" element="a" href="https://github.com/">
        link content
      </Primitive>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
