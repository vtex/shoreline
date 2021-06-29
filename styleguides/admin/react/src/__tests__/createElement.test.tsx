import React from 'react'

import { createElement } from '../index'
import { render } from './setup'

describe('createElement', () => {
  it('should create a callable element', () => {
    const Div = createElement('div')
    const { getByText } = render(<Div>Testing</Div>)

    expect(getByText('Testing')).toBeInTheDocument()
  })

  it('should create an element that accept data-attributes', () => {
    const Div = createElement('div')
    const { getByTestId } = render(<Div data-testid="test">Testing</Div>)

    expect(getByTestId('test')).toBeInTheDocument()
    expect(getByTestId('test')).toHaveTextContent('Testing')
  })

  it('should create an element that accepts styles', () => {
    const Div = createElement('div')
    const { getByTestId } = render(
      <Div
        data-testid="test"
        csx={{
          bg: '#000',
          color: '#fff',
        }}
      >
        Testing
      </Div>
    )

    expect(getByTestId('test')).toHaveStyleRule('background-color', '#000')
    expect(getByTestId('test')).toHaveStyleRule('color', '#fff')
  })

  it('should create polymorphic elements', () => {
    const Box = createElement('div')

    const { getByRole } = render(
      <Box
        as="button"
        csx={{
          bg: '#000',
          color: '#fff',
        }}
      >
        Testing
      </Box>
    )

    const result = getByRole('button')

    expect(result).toHaveStyleRule('background-color', '#000')
    expect(result).toHaveStyleRule('color', '#fff')
  })
})
